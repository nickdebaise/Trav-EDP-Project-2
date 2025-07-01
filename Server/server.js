import express from 'express'
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from "cors"

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static('./public'))
app.get("/api/planets", async (req, res) => {
    try {

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("planets");
        const planets = await collection.find({}).toArray();
        res.json(planets);

    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send("Error fetching planets");
    }
})

app.get("/api/characters", async (req, res) => {
    try {

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("characters");
        const characters = await collection.find({}).toArray();
        res.json(characters);

    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send("Error fetching characters");
    }
})

app.get("/api/films", async (req, res) => {
    try {

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("films");
        const films = await collection.find({}).toArray();
        res.json(films);

    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send("Error fetching films");
    }
})

app.get("/api/characters/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("characters");
        const characters = await collection.findOne({ id: parseInt(id) })
        res.json(characters);

    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send("Error fetching characters");
    }
})

app.get("/api/films/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("films");
        const films = await collection.findOne({ id: parseInt(id) })
        res.json(films);

    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send("Error fetching films");
    }
})

app.get("/api/planets/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("planets");
        const planets = await collection.findOne({ id: parseInt(id) })
        res.json(planets);

    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send("Error fetching planets");
    }
})

app.get("/api/films/:id/characters", async (req, res) => {
    try {
        const { id } = req.params;

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("films_characters");
        const characters = await collection.find({ film_id: parseInt(id) }).sort({ "character_id": 1 }).toArray()
        const ids = characters.map(character => character.character_id)
        const charcollection = db.collection("characters");
        const filmcharacters = await charcollection.find({ id: { "$in": ids } }).sort({ "id": 1 }).toArray()
        console.log(characters)

        res.json(filmcharacters);

    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send("Error fetching film characters");
    }
})

app.get("/api/films/:id/planets", async (req, res) => {
    try {
        const { id } = req.params;

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("films_planets");
        const planets = await collection.find({ film_id: parseInt(id) }).sort({ "planet_id": 1 }).toArray()
        const ids = planets.map(planet => planet.planet_id)
        const plancollection = db.collection("planets");
        const filmplanets = await plancollection.find({ id: { "$in": ids } }).sort({ "id": 1 }).toArray()


        res.json(filmplanets);

    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send("Error fetching film planets");
    }
})


app.get("/api/characters/:id/films", async (req, res) => {
    try {
        const { id } = req.params;

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("films_characters");
        const charfilm = await collection.find({ character_id: parseInt(id) }).sort({ "film_id": 1 }).toArray()
        const ids = charfilm.map(films => films.film_id)
        const filmcollection = db.collection("films");
        const characterfilms = await filmcollection.find({ id: { "$in": ids } }).sort({ "id": 1 }).toArray()
        console.log(charfilm)


        res.json(characterfilms);

    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send("Error fetching film planets");
    }
})


app.get("/api/planet/:id/films", async (req, res) => {
    try {
        const { id } = req.params;

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection("films_planets");
        const planetFilm = await collection.find({ planet_id: parseInt(id) }).sort({ "film_id": 1 }).toArray()
        const ids = planetFilm.map(films => films.film_id)
        const filmcollection = db.collection("films");
        const planetMovie = await filmcollection.find({ id: { "$in": ids } }).sort({ "id": 1 }).toArray()
        console.log(planetFilm)


        res.json(planetMovie);

    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send("Error fetching film planets");
    }
})


app.get("/api/planet/:id/characters", async (req, res) => {
    try {
        const { id } = req.params;

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const charCollect = db.collection("characters");
        const charHomeworld = await charCollect.find({ homeworld: parseInt(id) }).sort({ "id": 1 }).toArray()


        res.json(charHomeworld);

    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send("Error fetching film planets");
    }
})

app.listen(3001, () => {
    console.log("Server is running!")
})