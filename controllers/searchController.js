const path = require('path');
const https = require('https');
const APIKeys = require('../config/config')
let temp = "";
let icon = "";
let description = "";
let main = "";
let city = "";
let location = '';

const getNewSearch = (req,res)=>{
    const CityName = req.body.cityname;
    location = CityName;
    res.redirect('/search');
};

const handleSearch = (req,res)=> {
    console.log(location);
    const appID = APIKeys.appID;    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${appID}&units=metric` 
    https.get(url , (response) => {
        //the response will send back the acquires data of the location
        console.log(response.statusCode);
        if(response.statusCode == 200){
            response.on("data",(data) => {
                const weatherData = JSON.parse(data);
                temp = weatherData.main.temp;
                parseInt(temp);
                icon = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
                description = weatherData.weather[0].description;
                main = weatherData.weather[0].main;
                city = weatherData.name;
            });
            res.render('index',{
                Temp : temp,
                Icon : icon,
                Des : description,
                Main : main,
                City : city
            });
        }
        else{
            res.sendFile(path.join(__dirname,'..','views','404.html'));
        }
    });
};


module.exports = {getNewSearch,handleSearch}