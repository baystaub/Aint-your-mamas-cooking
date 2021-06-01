const { Gallery } = require('../models');
const Cuisine = require('../models/Cuisine');

const cuisinedata = [
  {
    title: 'American',
    image:"https://media-cdn.tripadvisor.com/media/photo-s/13/5d/e7/8c/getlstd-property-photo.jpg"
  },
  {
    title: 'Asian',
    image: "https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/media/images/asia-food-thesomegirl/10536284-1-eng-GB/asia-food-thesomegirl_wrbm_large.jpg"
  },
  {
    title: 'Latin',
  image: "https://cdn.vox-cdn.com/thumbor/wdyWEHcFb88uZzUUnWEee4g9lGA=/0x0:1024x683/1200x900/filters:focal(431x261:593x423)/cdn.vox-cdn.com/uploads/chorus_image/image/54807847/Borracha_overhead.11.jpg"
  },
  {
    title: 'Middle Eastern',
    image: "https://www.organicfacts.net/wp-content/uploads/middleeasterncuisine.jpg"
  },
  {
    title: 'Italian',
    image:"https://www.onhisowntrip.com/wp-content/uploads/2020/08/RACQ-1000x540.jpg"
  },
  {
    title: 'Vegetarian',
    image:"https://cdn.standardmedia.co.ke/images/saturday/afwhofonstc41fo0q65ce9a36522cb0.webp"
  }
  ];

const seedCuisineDatabase = () => Cuisine.bulkCreate(cuisinedata);

module.exports = seedCuisineDatabase;
