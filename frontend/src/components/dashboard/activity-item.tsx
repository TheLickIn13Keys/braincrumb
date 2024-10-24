interface ActivityItemProps {
    title: string
    description: string
    time: string
    image: string
  }
  
  export function ActivityItem({ title, description, time, image }: ActivityItemProps) {
    return (
      <li className="flex items-start space-x-4">
        <img src={image} alt="" className="w-12 h-12 rounded-full" />
        <div>
          <h5 className="font-bold">{title}</h5>
          <p className="text-sm text-gray-500">{description}</p>
          <p className="text-xs text-gray-400">{time}</p>
        </div>
      </li>
    )
  }