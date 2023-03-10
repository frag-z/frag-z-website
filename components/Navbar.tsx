import Image, { StaticImageData } from 'next/image'
import React from 'react'
import windows from '../public/appIcons/windows.png'
import fragz from '../public/appIcons/fragz.png'
import Link from 'next/link'

interface TabProps {
    img: StaticImageData,
    title: string
}

const tabdata: TabProps[] = [
    {
        img: windows,
        title: 'Home'
    },
    {
        img: fragz,
        title: 'Store'
    },
    {
        img: fragz,
        title: 'Development'
    },
    {
        img: fragz,
        title: 'Wiki'
    },
]

const Navbar = () => {

  const Tab = ( { img, title }: TabProps ) => {
    return (
        <Link href={(title === 'Home') ? '/' : title.toLowerCase()} className='flex flex-row items-center min-w-fit px-1 py-4 h-full mr-3 border-2 border-b-black border-r-black overflow-hidden max-h-12 '>
            <Image className='w-6 h-6 mr-' src={img} alt='img'/>
            <h1 className='font-windows font-bold mx-1'>{title}</h1>
        </Link>
    )
  }

  return (
    <div className='navbar'>
        {/* Nav content */}
        <div className="navbar-inner">
            {
                tabdata.map((val,i) => (
                    <Tab key={i} img={val.img} title={val.title} />
                ))
            }
        </div>
    </div>
  )
}

export default Navbar