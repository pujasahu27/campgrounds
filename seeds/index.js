const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');



mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];



const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '647a0904e4b7fac8d1e8f242',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },



            images: [
                // {
                //  url: 'https://res.cloudinary.com/dgg7mioem/image/upload/v1685911942/YelpCamp/zxf00sutecnspu1wqpvc.jpg',
                // filename: 'YelpCamp/zxf00sutecnspu1wqpvc',

                // },
                // {
                //   url: 'https://res.cloudinary.com/dgg7mioem/image/upload/v1685911942/YelpCamp/t91mkjzxj5z1entnfxfu.jpg',
                // filename: 'YelpCamp/t91mkjzxj5z1entnfxfu',

                //  }
                {
                    url: 'https://res.cloudinary.com/dgg7mioem/image/upload/v1685978158/YelpCamp/li18ykde6sqo6qxyesj4.jpg',
                    filename: 'YelpCamp/li18ykde6sqo6qxyesj4',

                },
                {
                    url: 'https://res.cloudinary.com/dgg7mioem/image/upload/v1685978158/YelpCamp/etay0r59ysblhcenngcz.jpg',
                    filename: 'YelpCamp/etay0r59ysblhcenngcz',

                }
            ]

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

