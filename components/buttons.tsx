'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export function SignInButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <>...</>;
  }
  if (status === 'authenticated') {
    return (
      <div>
        <Image
          src={session.user?.image ?? '/mememan.webp'}
          width={32}
          height={32}
          alt="Your Name"
        />
      </div>
    )
  }

  return <button onClick={() => signIn()} className='font-medium px-3 py-1 rounded-2xl hover:text-rose-800'>Sign in</button>
}

export function SignOutButton() {
  return <button onClick={() => {
    signOut({ callbackUrl: '/'})
  }} className='font-medium px-3 py-1 rounded-2xl hover:text-rose-800'>Sign out</button>
}

import { useFormStatus } from "react-dom"

interface SubmitProps {
  action: string;
  pendingAction: string;
}

export function SubmitButton( { action, pendingAction }: SubmitProps) {
  const { pending } = useFormStatus()
  return (
    <button
      className="w-28 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline text-center"
      type="submit"
      disabled={pending}
    >
      {pending ? `${pendingAction}...` : `${action}`}
    </button>
  )
}