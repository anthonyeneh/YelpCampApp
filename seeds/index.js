const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({

            // YOUR USER ID
            author: '626e7fd4b7b48f9ccf819677',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} - ${sample(places)}`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus doloremque necessitatibus veritatis laborum ad cum, nostrum incidunt officiis iure dolor inventore? Sapiente, fugit perferendis facere quod minus dolores quibusdam tempora.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/lordstark/image/upload/v1656102090/Yelpcamp/s39zw0x6zoiqt6srw8zk.jpg',
                    filename: 'Yelpcamp/s39zw0x6zoiqt6srw8zk'
                },
                {
                    url: 'https://res.cloudinary.com/lordstark/image/upload/v1657268752/Yelpcamp/mf383twiunhbc9igrptk.jpg',
                    filename: 'Yelpcamp/mf383twiunhbc9igrptk'
                }
            ]
        })
        await camp.save();
    }

}
seedDB().then(() => {
    mongoose.connection.close();
})