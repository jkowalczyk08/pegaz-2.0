import { useFormStatus } from "react-dom"

export default function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      className="w-28 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline text-center"
      type="submit"
      disabled={pending}
    >
      {pending ? 'Creating...' : 'Create'}
    </button>
  )
}