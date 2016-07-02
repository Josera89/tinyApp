"use strict";
var express = require("express");
var methodOverride = require('method-override')
const bodyParser = require("body-parser");

var app = express();

app.set("view engine", "ejs");
var PORT = process.env.PORT || 8080;


app.use(bodyParser.urlencoded());
app.use(methodOverride('_method'))


var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});


//Test
app.get("/hello", (req, res) => {
  res.end("<html><body>Hello <b>CHUY</b></body></html>\n");
});

app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/", (req, res) => {
  res.redirect("/urls");
});

app.post("/urls", (req, res) => {
  console.log(req.body); // debug statement to see POST parameters
  // TODO: add to urlDatabase
  var longURL = req.body.longURL;
  var shortURL = generateRandomString()
  urlDatabase[shortURL] = longURL;
  res.redirect(`/urls/${shortURL}`);
});

app.get("/urls/:id", (req, res) => {
  let templateVars = { shortURL: req.params.id, urlDatabase: urlDatabase };
  res.render("urls_show", templateVars);
});

app.get("/u/:id", (req, res) => {
  var longURL = urlDatabase[req.params.id];
  res.redirect(longURL);
});

app.delete("/urls/:id", function (req, res) {
  delete urlDatabase[shortURL];
  res.send("URL DELETED!!!");
});

function generateRandomString() {
  return ""+Math.random()
}