import { isAfterDeadline } from "@/lib/utils"
import { Page } from "@prisma/client"

interface DeadlineProps {
  page: Page
}

export default function Deadline({ page }: DeadlineProps ) {
  const isTask = page.type === 'Task'
  
  if (!isTask || page.deadline == null) {
    return <></>
  }

  return (
    <p className={`font-normal ${isAfterDeadline(page.deadline) ? 'text-red-500 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}>
      {`deadline: ${page.deadline}`}
    </p>
  )
}