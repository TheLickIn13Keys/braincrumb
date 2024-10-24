import { Card, CardContent } from "@/src/components/ui/card"

interface RecommendationCardProps {
  title: string
  description: string
  image: string
}

export function RecommendationCard({ title, description, image }: RecommendationCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <img src={image} alt={title} className="w-full h-24 object-cover rounded-md mb-2" />
        <h4 className="font-bold text-sm mb-1">{title}</h4>
        <p className="text-xs text-gray-500">{description}</p>
      </CardContent>
    </Card>
  )
}