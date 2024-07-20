import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";


const yourUsername = "OjBingo";
const yourPassword = "12345";
const yourAPIKey = "27c11db3-1352-4261-9a41-b7dbc8bd26fb";
const yourBearerToken = "8efe99c2-1ad3-4398-89c6-225df7d5d668";


app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try{
    const result = await axios.get(API_URL + "/random");
    res.render("index.ejs", {content:JSON.stringify(result.data) });
  } catch(error){
    res.status(404).send(error.message);
  }
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", async (req, res) => {
  try{
    const result = await axios.get(API_URL + "/all?page=2", {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    res.render("index.ejs", {content:JSON.stringify(result.data)});
  } catch(error) {
    res.status(404).send(error.message); 
  }
});

app.get("/apiKey", async (req, res) => {
  try{
    const result = await axios.get(API_URL + "/filter", {
      params:{
        score: 5,
        apiKey: yourAPIKey, 
      },
    });
    res.render("index.ejs", {content:JSON.stringify(result.data)}); 
  } catch(error){
    res.status(401).send(error.message);
  }
});

const config = {
  headers: {Authorization: `Bearer ${yourBearerToken}`},
};

app.get("/bearerToken", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/secrets/2", config);
    res.render("index.ejs", {content:JSON.stringify(result.data)});
  } catch(error){
    res.status(401).send(error.message); 
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
