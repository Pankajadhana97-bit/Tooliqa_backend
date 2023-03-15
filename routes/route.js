const express = require("express");
const router = express.Router();

const Holidays = require('date-holidays')
const hd = new Holidays()



// default route
router.get('/', (req, res) => {
    
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    hd.init('US');
    let response = hd.getHolidays(parseInt(year))
    
    response = response.map(item => ({
        date: `${year}-${month}-${day}`,
        reason : item.name
    }))
    
    response = response.filter(item => parseInt(item.date.substring(5,7)) === month)
    res.json(response)
})

// suppoted countries
router.get('/countryoptions', (req, res) => {
    let countries = hd.getCountries();
    
    console.log(countries)
    res.json(countries);
})


// listing holidays on demand
router.post('/listholidays', (req, res) => {
    console.log(req.body)
    hd.init(req.body.country);
    let response = hd.getHolidays(parseInt(req.body.year))
    
    response = response.map(item => ({
        date: item.date.split(" ")[0],
        reason : item.name
    }))
    
    response = response.filter(item => parseInt(item.date.substring(5,7)) === parseInt(req.body.month))
    res.json(response)
})

module.exports = router;
