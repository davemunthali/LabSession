const products = require('./datasource');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const PORT = 3000;
const app = express();
const db = new sqlite3.Database('./database.db',(error)=>{
    if(error)
        console.log("Failed ot open database "+error.message);
    else
        console.log("Connected to sqlite database");
})
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get("/jan_data", (req, res)=>{
    db.all("SELECT * FROM jan_climate_data_blantyre",[],(error, rows)=>{
        if(error)
            return res.json({"error": error.message})
        else{
            return res.json(rows);
        }
    });
});
app.get("/monthly_data", (req, res)=>{
    db.all("SELECT * FROM monthly_climate_data_blantyre",[],(error, rows)=>{
        if(error)
            return res.json({"error": error.message})
        else{
            return res.json(rows);
        }
    });
});
app.get("/region_data", (req, res)=>{
    db.all("SELECT * FROM regional_population_malawi",[],(error, rows)=>{
        if(error)
            return res.json({"error": error.message})
        else{
            return res.json(rows);
        }
    });
});
app.listen(PORT, ()=>{
    console.log(`server started listening on port ${PORT}`);
});