import Link from 'next/link'
import Image from 'next/image'

export default function NavMenu() {
  return (
    <nav className='py-0 px-10 border-b border-gray-300 sticky top-0'>
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
          <Link href={'/'} className='hover:text-gray-500'>
            Home
          </Link>
          <Link href={'/courses'} className='hover:text-gray-500'>
            Courses
          </Link>
          <Link href={'/about'} className='hover:text-gray-500'>
            About
          </Link>
        </div>
        <div className='flex items-center'>
          UserSection
        </div>
      </div>
    </nav>
  )
}