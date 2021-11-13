var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

const axios = require("axios");
const express = require("express");
const path = require("path"),
  app = express(),
  PORT = 8080,
  publicPath = path.join(__dirname, "..", "public");
publicHtmlPath = path.join(__dirname, "..", "templates/views");

const utilis = require("./utilies");

// --- serve static html\css\js\image files
app.use(express.static(publicPath));
app.use(express.json());

app.get("/", (req, res) => {
  // --- serve index.html from views directory (templates in this case)
  res.sendFile(path.join(publicHtmlPath, "index.html"));
});

app.get("/index", (req, res) => {
  // --- serve help.html from views directory
  res.sendFile(path.join(publicHtmlPath, "index.html"));
});

app.get("/mac", (req, res) => {
  // --- serve mac.html from views directory
  res.sendFile(path.join(publicHtmlPath, "mac.html"));
});

app.get("/extension", (req, res) => {
  // --- serve ipod.html from views directory
  res.sendFile(path.join(publicHtmlPath, "extension.html"));
});

app.get("/iphons", (req, res) => {
  // --- serve iphons.html from views directory
  res.sendFile(path.join(publicHtmlPath, "iphons.html"));
});

app.get("/ipad", (req, res) => {
  // --- sere ipad.html from views directory
  res.sendFile(path.join(publicHtmlPath, "ipad.html"));
});

app.get("/ipod", (req, res) => {
  // --- serve ipod.html from views directory
  res.sendFile(path.join(publicHtmlPath, "ipod.html"));
});

app.get("/cart", (req, res) => {
  // --- serve cart.html from views directory
  res.sendFile(path.join(publicHtmlPath, "cart.html"));
});

app.get("/store", (req, res) => {
  // --- serve store.html from views directory
  res.sendFile(path.join(publicHtmlPath, "store.html"));
});

app.get("/contact", (req, res) => {
  // --- serve contact.html from views directory
  res.sendFile(path.join(publicHtmlPath, "contact.html"));
});

app.get("/newProduct", (req, res) => {
  // --- serve newProduct.html from views directory
  res.sendFile(path.join(publicHtmlPath, "newProduct.html"));
});

app.get("/messages", (req, res) => {
  // --- serve messages.html from views directory
  res.sendFile(path.join(publicHtmlPath, "messages.html"));
});

app.post("/menyProducts", (req, res) => {
  const { collectionName, data } = req.body;
  res.status(201).send("ok");
  utilis.addMenyProducts();
});

app.post("/insretProduct", (req, res) => {
  utilis.addOneProduct(req, res);
});

app.post("/insertContact", (req, res) => {
  utilis.addOneContact(req, res);
});

app.post("/insertNewCart", (req, res) => {
  utilis.addNewCart(req, res);
});


app.get("/getCart/:id", (req, res) => {
  utilis.getCart(req, res);
});

app.patch("/addToCart/:id", (req, res) => {
  utilis.updateCart(req, res); 
});
app.patch("/deleteFromCart/:id", (req, res) => {
  utilis.deleteFromCart(req, res);
});


app.get("/getProducts", (req, res) => {
  utilis.getProducts(req, res);
});

app.get("/getSpecificProducts", (req, res) => {
  utilis.getSpecificProducts(req, res);
});

app.get("/getProducts/:category", (req, res) => {
  utilis.getProductsByCategory(req, res);
});


app.delete("/deleteFromProducts/:id", (req, res) => {
  utilis.deleteProduct(req, res);
});

app.patch("/updateProduct/:id", (req, res) => {
  utilis.updateProduct(req, res);
});

app.get("/getContants", (req, res) => {
  utilis.getContent(req, res);
});

app.get("*", (req, res) => {
  res
    .status(404)
    .send(
      `<h1 style="color:blue;text-align:center;"> page not exist!!! check ${req.url} again</h1>`
    );
});

app.listen(PORT, () => {
  console.log(`server listens on port : ${PORT}`);
});
