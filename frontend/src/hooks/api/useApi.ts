import { useState, useCallback } from 'react';
import { ApiError } from '@/src/types';
import { useToast } from '@/src/hooks/common/useToast';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
  showErrorToast?: boolean;
}

export function useApi<T>(options: UseApiOptions<T> = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const { toast } = useToast();

  const execute = useCallback(
    async (promise: Promise<T>) => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await promise;
        setData(result);
        options.onSuccess?.(result);
        return result;
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError);
        options.onError?.(apiError);
        
        if (options.showErrorToast) {
          toast({
            title: "Error",
            description: apiError.message,
            variant: "destructive",
          });
        }
        
        throw apiError;
      } finally {
        setLoading(false);
      }
    },
    [options, toast]
  );

  return { data, loading, error, execute };
}