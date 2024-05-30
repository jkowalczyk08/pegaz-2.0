import Link from 'next/link'
import Image from 'next/image'
import { SignInButton, SignOutButton } from './buttons'
import AuthCheck from './AuthCheck'

export default function NavMenu() {
  return (
    <nav className='py-0 px-10 border-b border-gray-300 backdrop-blur-md sticky top-0'>
      <div className='container flex item-center justify-between'>
        <div>
          <Link href={'/'}>
            <Image
              src='/logo.png'
              width={100}
              height={100}
              alt='Pegaz Logo'
            />
          </Link>
        </div>
        <div className='flex space-x-8 items-center'>
          <Link href={'/'} className='font-medium px-3 py-1 rounded-2xl hover:text-rose-800'>
            Home
          </Link>
          <Link href={'/courses'} className='font-medium px-3 py-1 rounded-2xl hover:text-rose-800'>
            Courses
          </Link>
          <Link href={'/about'} className='font-medium px-3 py-1 rounded-2xl hover:text-rose-800'>
            About
          </Link>
        </div>
        <div className='flex items-center space-x-2'>
          <SignInButton></SignInButton>
          <AuthCheck>
            <SignOutButton/>
          </AuthCheck>
        </div>
      </div>
    </nav>
  )
}