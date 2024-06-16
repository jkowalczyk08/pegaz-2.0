import { isAfterDeadline } from "@/lib/utils"
import { Page } from "@prisma/client"

interface DeadlineProps {
  pageType: string,
  deadline: string | null
}

export default function Deadline({ pageType, deadline }: DeadlineProps ) {
  const isTask = pageType === 'Task'
  
  if (!isTask || deadline == null) {
    return <></>
  }

  return (
    <p className={`font-normal ${isAfterDeadline(deadline) ? 'text-red-500 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}>
      {`deadline: ${deadline}`}
    </p>
  )
}