import React from 'react'
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsLinkedin
} from 'react-icons/bs'
import { data } from '../../constants'
import shortid from 'shortid'

const Footer = () => {
  const getLinkedIcon = (title) => {
    switch (title) {
      case 'Instagram':
        return <BsInstagram />;
      case 'Twitter':
        return <BsTwitter />;
      case 'LinkedIn':
        return <BsLinkedin />;
      default:
        return <BsFacebook />;
    }
  };

  const followLink = (link) => {
    // console.log(link);
    window.location.href = link;
  };

  return (
    <div className='flex flex-col justify-center items-center 
    bg-gradient-to-b from-accent-dark-600 to-black'>
      <p className='w-full p-8 text-white text-2xl text-center italic'>
        {data.contactUs.headline}
      </p>
      <span className="h-1 w-3/4 bg-accent-light-100 lg:w-1/2"></span>
      <div className='flex flex-col justify-evenly p-4 md:flex-row'>
        <div className='text-white text-lg p-8 text-center md:text-left'>
          <p>{data.contactUs.name_long}</p>
          <p>{data.contactUs.addr}</p>
          <p>{data.contactUs.city}, {data.contactUs.state_short}, {data.contactUs.postal_code}</p>
        </div>
        <div className='text-white text-lg p-8 text-center md:text-left'>
          <p>Phone: {data.contactUs.phone_1}</p>
          <p>Email: {data.contactUs.email_1}</p>
          {(data.contactUs.social_media) &&
            <div>
              {data.contactUs.social_media.map((media) => (
                <button
                  className='pt-2 pr-4'
                  key={shortid.generate()}
                  aria-label={media.title}
                  onClick={() => followLink(`${media.link}`)}>
                  {getLinkedIcon(media.title)}
                </button>
              ))}
            </div>
          }
        </div>
      </div>
      <div className='w-full bg-black text-center text-white p-4'>
        <p>2024 {data.contactUs.name_long}. All Rights Reserved</p>
      </div>
    </div>
  )
}

export default Footer