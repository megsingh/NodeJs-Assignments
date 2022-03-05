const express = require('express');
const faker = require('faker');
const bodyParser = require('body-parser')
const app = express(); // create a new express application

app.set("views","./views")
app.set("views engine","ejs")
// during runtime template engine replaces the variables in templte file to actual values and transforms the template file to html file and sends it to client
// to render the template files create views directory which stores all the template files
// 2nd line decides which engine to use. engine name is given as 2nd argument.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"));
var users = [];

for(let i = 0; i<10;i++){
    users.push({
        name:faker.name.findName(),
        email: faker.internet.email()
    })
}
// console.log(users);
app.get("/",(req,res)=>{ // create a route using the HTTP GET request to the url/path specified
    res.render("index.ejs",{users})
})

app.get("/form",(req,res)=>{
    res.render("form.ejs")
})

app.post("/user/add",(req,res)=>{
    console.log("i am in add");
    console.log(req.body);
    users.push({
        name: req.body.name,
        email: req.body.email
    })
    res.redirect("/")
})

app.listen(3000,()=>{  // bind the connections on this port and listen to it
    console.log(`example app listening on port ${3000}`);
})