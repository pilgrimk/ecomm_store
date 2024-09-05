import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { data, images } from '../../constants'
import { ShoppingCartIcon } from '../../components'
import shortid from 'shortid'

const Navbar = ({ totalItems }) => {
  const [click, setClick] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const toggleClick = () => setClick(!click);

  const handleClick = () => {
    setClick(false);
  }

  const popup =
    <div className='lg:hidden block absolute top-16 w-full
    z-50 left-0 right-0 bg-accent-light-600 transition'>
      <ul className='text-center text-xl p-20'>
        {data.navlinks.map((navlink) => (
          <Link
            to={navlink.link_to}
            key={shortid.generate()}>
            <li className='my-4 py-4 border-b 
            hover:text-black
            border-accent-light-800 
            hover:bg-accent-light-500 
            hover:rounded cursor-pointer font-serif'
              onClick={() => handleClick(`${navlink.link_to}`)}>
              {navlink.link_title}
            </li>
          </Link>
        ))}
      </ul>
    </div>

  useEffect(() => {
    function captureWindowWidth() {
      setWindowWidth(window.innerWidth)
      // console.log(window.innerHeight, window.innerWidth)
    }

    // Trigger this function on resize
    window.addEventListener('resize', captureWindowWidth)
    //  Cleanup for componentWillUnmount
    return () => window.removeEventListener('resize', captureWindowWidth)
  }, [])

  return (
    <nav className='sticky top-0 z-50 bg-gradient-to-r
    from-accent-dark-500 to-accent-light-500'>
      <div className='h-10vh flex justify-between text-white
      lg:py-5 py-4 px-20 border-accent-dark-800'>
        <div className='flex items-center flex-1'>
          <img className='h-12' src={images.logo} alt='logo' />
          <span className='text-xl md:text-3xl font-bold ml-4 md:ml-8 text-white font-sans'>
            {(windowWidth > 1000) ? `${data.contactUs.name_long} ` : `${data.contactUs.name_short}`}
          </span>
        </div>
        <div className='lg:flex md:flex lg:flex-1 justify-end font-normal hidden'>
          <div className='flex-10'>
            <ul className='flex gap-8 mr-16 text-[18px]'>
              {data.navlinks.map((navlink) => (
                <Link
                  to={navlink.link_to}
                  key={shortid.generate()}
                >
                  <li className='hover:text-black hover:border-b-2 
                  hover:border-accent-dark-600                  
                  transition cursor-pointer font-serif pt-2'
                    onClick={() => handleClick(`${navlink.link_to}`)}
                  >
                    {navlink.link_title}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
        <div>
          {click && popup}
        </div>
        <button className='block md:hidden transition mr-4' onClick={toggleClick}>
          {click ? <FaTimes /> : <GiHamburgerMenu />}
        </button>
        <ShoppingCartIcon totalItems={totalItems} />
      </div>
    </nav>
  )
}

export default Navbar