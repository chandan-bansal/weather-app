const axios = require("axios");
const express = require("express");
const cors = require("cors");
const client = require("./client");
require("dotenv").config();

const app = express();
app.use(cors());
app.get("/", async (req, res) => {
    try{
        const cacheValue = await client.get(`weather:city:${process.env.DEFAULT_CITY}`);
        if(cacheValue) return res.send(JSON.parse(cacheValue));
        const result = await fetch(
            `http://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${process.env.DEFAULT_CITY}&days=${process.env.DEFAULT_DAYS}`
          );
        const data = await result.json();
        await client.set(`weather:city:${process.env.DEFAULT_CITY}`, JSON.stringify(data))
        await client.expire(`weather:city:${process.env.DEFAULT_CITY}`, 60)
        res.send(data);
    }catch(err){
        res.status(500).send(err.message)
    }
  
});

app.get("/search/:searchString", async (req,res) =>{
    try{
        let {searchString} = req.params;
        const cacheValue = await client.get(`weather:search:${searchString}`);
        if(cacheValue) return res.send(JSON.parse(cacheValue));
        const result = await fetch(
            `http://api.weatherapi.com/v1/search.json?key=${process.env.API_KEY}&q=${searchString}`
          );
        const data = await result.json();
        await client.set(`weather:search:${searchString}`, JSON.stringify(data))
        await client.expire(`weather:search:${searchString}`, 20)
          res.send(data);
    }catch(err){
        res.status(500).send(err.message)
    }
})

app.get("/weatherForecast/:city/:days", async (req, res) =>{
    try{
        let {city, days} = req.params;
        const cacheValue = await client.get(`weather:city:${city}`);
        if(cacheValue) return res.send(JSON.parse(cacheValue));
        const result = await fetch(
            `http://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${city}&days=${days}`
          );
          const data = await result.json();
          await client.set(`weather:city:${city}`, JSON.stringify(data))
          await client.expire(`weather:city:${city}`, 60)
          res.send(data);
    }catch(err){
        res.status(500).send(err.message)
    }
})
app.listen(process.env.LISTEN_PORT, () => {
  console.log(`Server running on http://localhost:${process.env.LISTEN_PORT}`);
});
