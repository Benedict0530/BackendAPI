const express = require('express')
const Reader = require('@maxmind/geoip2-node').Reader
const app = express()
const port = 3000;

//set trusted proxy
app.set('trust proxy', true)

// create Routes for MaxMind IP Geolocation
app.get('/clientip', (request, response) => {
    
    Reader.open('./geolite2.mmdb').then( reader =>
        {
            const clientIP = request.ip;
            const ipCountry = reader.country(clientIP);
            response.send("{'Country':'${ipCountry}'")
        }
    )

})

app.listen(port, () =>{
    console.log('Running on port ${port}')
}) 