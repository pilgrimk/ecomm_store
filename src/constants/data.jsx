const navlinks = [
  {
    link_title: 'Products',
    link_to: '/products'
  },
  {
    link_title: 'Contact Us',
    link_to: '/contact-us'
  }
];

const contactUs = {
  title: 'Contact Us',
  headline: '',
  name_long: 'E-Comm Store',
  name_short: 'E-Comm',
  addr: '',
  city: 'West Jordan',
  state_long: 'Utah',
  state_short: 'UT',
  postal_code: '84000',
  country: 'USA',
  phone_1: '801-604-7718',
  phone_2: '',
  email_1: 'Faux@ecommstore.com',
  email_2: '',
  title_wh: 'Working Hours',
  days_1: 'Monday-Friday:',
  hours_1: '08:00 am - 05:00 pm',
  social_media: [
    {
      title: 'Facebook',
      link: 'https://www.facebook.com/faux.bellon'
    },
  ]
};

// const states = (['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 
//   'District of Columbia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 
//   'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 
//   'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 
//   'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 
//   'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'])  



const contactUsPage = {
  title: 'Contact Us',
  subtitle: 'Call for a free quote!',
  description: [
    `Contact ${contactUs.name_long} ipsum dolor sit, amet consectetur adipisicing elit. Quod consequatur consectetur mollitia voluptatibus vitae sit, illo doloribus quibusdam maiores id. Numquam impedit voluptatem itaque excepturi aspernatur. Fuga quod deleniti consectetur in quibusdam excepturi vel, rerum, repudiandae commodi voluptatem itaque velit? Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque fugit autem magnam, natus eum ratione placeat quibusdam porro neque ea.`,
    `Lorem ${contactUs.name_long} ipsum dolor sit amet, consectetur adipisicing elit. Omnis facilis, optio necessitatibus tempore sequi, beatae minus, aut non laborum accusantium fugit autem consectetur dolor nobis eaque illum nesciunt excepturi voluptate iste! Obcaecati, magnam laboriosam voluptatibus dolores corrupti, eum ea soluta hic fugiat rerum incidunt. Velit dolorum consequatur mollitia sed? Inventore facere rerum, eligendi alias eum optio maxime quam labore soluta nobis pariatur, laborum officia magni laboriosam reprehenderit nulla dolor quidem?`,
  ],
  imgUrl: '',
  alt: 'alt-1',
};

const data = {
  navlinks,
  contactUs,
  contactUsPage
};

export default data;