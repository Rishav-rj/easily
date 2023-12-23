import express from "express";
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";

export const app = express();

app.use(expressEjsLayouts)
app.set('view engine', 'ejs')
app.set('views', path.resolve("src", "views"));

app.get('/', (req, res)=>{
    res.render("home");
})
app.get('/jobs', (req, res)=>{
    res.render("jobs");
})

