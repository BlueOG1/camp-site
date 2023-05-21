const { cities, descriptors, places } = require("./seedsData.js");
const { Campground } = require("./models/campground.js");
const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost:27017/yelpcampdb";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DATABASE CONNECTION OPEN")
    })
    .catch((ERR) => {
        console.log("DATABASE CONNECTION FAILED")
        console.log(ERR)
    })

Campground.createCollection()
    .then((collection) => {
        console.log(collection.name, "created!")
    })

async function generator() {
    for (let i = 0; i < 100; i++) {
        const testCamp = new Campground(
            {
                name: `${descriptors[Math.floor(Math.random() * descriptors.length)]} ${places[[Math.floor(Math.random() * places.length)]]}`,
                price: Math.floor(Math.random() * 200),
                location: `${cities[[Math.floor(Math.random() * cities.length)]].lat}, ${cities[[Math.floor(Math.random() * cities.length)]].lng}`,
                photo: "https://img.freepik.com/premium-vector/camping-vintage-graphic-illustration-vector-art-tshirt-design_24519-2509.jpg?w=2000",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, nostrum esse error corporis vero quo, dolorem obcaecati et nobis amet omnis cum sequi eaque quaerat exercitationem animi, necessitatibus ipsum asperiores?"
            });
        await testCamp.save()
    }
    mongoose.connection.close(() => {
        console.log("DATABASE CONNECTION CLOSED");
    })
}

generator()