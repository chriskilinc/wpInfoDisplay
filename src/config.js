
module.exports = {
  wpApiUrl: "http://smartgallery.chriskilinc.com/wp-json/wp/v2/posts?_embed",  //  Wordpress REST API url
  applicationName: "SmartGallery",   // Application name, this will also be the browser tab title
  settings: {
    cycleInSeconds: 7.5,  //  The amount of time an item will show before changing to the next in que
    totalCycles: 1,       //  Total Number of cycles the gallery will run before fetching the Api
    hasAside: false,
  },
  placeholder: {
    image: "./images/placeholderBg.png",   //  Placeholder Image for articles without an FeaturedImage attatched
  },
}
