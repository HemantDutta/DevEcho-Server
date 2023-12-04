import express from 'express';
import {configDotenv} from "dotenv";
import {createClient} from '@supabase/supabase-js';
import cors from 'cors';

//Create Express App
const app = express();
const port = 5000;

//Configuration
app.use(cors());
app.use(express.json());
configDotenv();
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//Supabase Client
const supabase = createClient(process.env.SUPA_URL, process.env.SUPR_KEY);

//Request Handlers

//Default URL
app.get("/", (req, res) => {
    res.send(`<h1>DevEcho Server</h1>`);
});

//Fetch Posts
app.get("/fetch-posts", async (req, res) => {
    const {data, error} = await supabase
        .from("posts")
        .select();

    if (error) res.send("error");
    if (data[0]) res.send(data);
    else res.send("no_data");
});

//Server Listener
app.listen(port, () => {
    console.log("The server is listening on http://localhost:" + port);
});