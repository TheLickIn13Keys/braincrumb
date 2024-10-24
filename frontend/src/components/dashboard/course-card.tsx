import { Card, CardContent } from "@/src/components/ui/card"
import { Progress } from "@/src/components/ui/progress"

interface CourseCardProps {
  title: string
  subtitle: string
  image: string
  progress: number
}

export function CourseCard({ title, subtitle, image, progress }: CourseCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <img src={image} alt={title} className="w-full h-32 object-cover rounded-md mb-4" />
        <h4 className="font-bold">{title}</h4>
        <p className="text-sm text-gray-500 mb-2">{subtitle}</p>
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-right mt-1">{progress}% complete</p>
      </CardContent>
    </Card>
  )
}