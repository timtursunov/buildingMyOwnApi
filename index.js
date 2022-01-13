// this is our server
// cheerio npm package to scrappe text from website

// defining the port
const PORT = 8000;
// initialize express
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const res = require('express/lib/response');
const { response } = require('express');

// getting express and calling it
const app = express();

// creating const articles
let articles = [];

// lets root using axios
app.get('/', (req,res) => {
    res.json('welcome to my funny api')
})

app.get('/news', (req,res) => {
    res.json('welcome to my kuku api')

    axios.get('https://www.theguardian.com/environment/climate-crisis')
        .then((response) => {
            // we got all hmtl
            const html = response.data;
            // we using cheerio to scan the whole html file
            
            const $ = cheerio.load(html)

            $('a:contains("climate")', html).each(function (){
                const title = $(this).text()
                const url = $(this).attr('href')
                articles.push({
                    title,
                    url
                })
                console.log('hello')
            })
            res.json(articles)

        }).catch((err) => console.log(err))
        
    
})





// putting it on the particular port
app.listen(PORT, ()=> {
    console.log(`server runnnign on PORT ${PORT}`)
})