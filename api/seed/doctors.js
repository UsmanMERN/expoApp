// seedDoctors.js
const mongoose = require('mongoose');
const Doctor = require('./doctorModel');
const User = require('./userModel'); // Assuming you have a User model

const doctorsData = async () => {
    // Fetch user IDs from User collection (assuming you have users in your DB)
    //   const users = await User.find({});
    //   const userId = users[0]._id; // For simplicity, using the first user found

    return [
        {
            userId: "",
            name: "Dr. John Doe",
            categories: ["Cardiologist", "Internal Medicine"],
            location: "New York",
            experience: "10 years",
            education: "MD, Cardiology",
            languages: ["English", "Spanish"],
            bio: "Dr. John Doe is an experienced cardiologist with a passion for helping patients improve their heart health. He has a strong educational background and is fluent in multiple languages.",
            rating: 4.9,
            reviews: 150,
            photo: "https://plus.unsplash.com/premium_photo-1681996484614-6afde0d53071?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "id": "2",
            "name": "Dr. Jane Smith",
            "categories": ["Dermatologist", "Allergist"],
            "location": "Los Angeles",
            "experience": "8 years",
            "education": "MD, Dermatology",
            "languages": ["English", "French"],
            "bio": "Dr. Jane Smith specializes in dermatology and allergology. She is known for her compassionate care and expertise in treating skin conditions and allergies.",
            "rating": 4.8,
            "reviews": 120,
            "photo": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "id": "3",
            "name": "Dr. David Johnson",
            "categories": ["Pediatrician"],
            "location": "Chicago",
            "experience": "12 years",
            "education": "MD, Pediatrics",
            "languages": ["English"],
            "bio": "Dr. David Johnson is a dedicated pediatrician with over a decade of experience. He provides comprehensive care for children from infancy to adolescence.",
            "rating": 4.7,
            "reviews": 100,
            "photo": "https://images.unsplash.com/photo-1612349316228-5942a9b489c2?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "id": "4",
            "name": "Dr. Lisa Brown",
            "categories": ["Orthopedic Surgeon"],
            "location": "San Francisco",
            "experience": "15 years",
            "education": "MD, Orthopedic Surgery",
            "languages": ["English", "Spanish"],
            "bio": "Dr. Lisa Brown is a skilled orthopedic surgeon specializing in joint and bone-related surgeries. She is committed to helping patients regain mobility and strength.",
            "rating": 4.9,
            "reviews": 140,
            "photo": "https://images.unsplash.com/photo-1484863137850-59afcfe05386?auto=format&fit=crop&q=80&w=2071&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }, {
            "id": "5",
            "name": "Dr. Maria Garcia",
            "categories": ["Gynecologist", "Obstetrician"],
            "location": "Miami",
            "experience": "9 years",
            "education": "MD, Obstetrics and Gynecology",
            "languages": ["English", "Spanish"],
            "bio": "Dr. Maria Garcia provides comprehensive women's health services with a focus on gynecological and obstetric care. She is dedicated to ensuring the well-being of her patients.",
            "rating": 4.7,
            "reviews": 110,
            "photo": "https://cdn.pixabay.com/photo/2017/01/29/21/16/nurse-2019420_1280.jpg"
        },
        {
            "id": "5",
            "name": "Dr. Maria Garcia",
            "categories": ["Gynecologist", "Obstetrician"],
            "location": "Miami",
            "experience": "9 years",
            "education": "MD, Obstetrics and Gynecology",
            "languages": ["English", "Spanish"],
            "bio": "Dr. Maria Garcia provides comprehensive women's health services with a focus on gynecological and obstetric care. She is dedicated to ensuring the well-being of her patients.",
            "rating": 4.7,
            "reviews": 110,
            "photo": "https://cdn.pixabay.com/photo/2017/01/29/21/16/nurse-2019420_1280.jpg"
        },
        {
            "id": "7",
            "name": "Dr. Sarah Adams",
            "categories": ["Ophthalmologist"],
            "location": "Los Angeles",
            "experience": "14 years",
            "education": "MD, Ophthalmology",
            "languages": ["English", "Spanish"],
            "bio": "Dr. Sarah Adams is an ophthalmologist with expertise in eye care and surgeries. She is dedicated to preserving and improving patients' vision.",
            "rating": 4.9,
            "reviews": 160,
            "photo": "https://cdn.pixabay.com/photo/2017/03/14/03/20/woman-2141808_1280.jpg"
        }

    ];
};

const seedDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://saimmanzoor:Password@cluster0.fqkar90.mongodb.net', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // await Doctor.deleteMany({}); // Clear existing data

        const data = await doctorsData();
        await Doctor.insertMany(data);

        console.log('Data successfully seeded!');
        mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
};

seedDB();
