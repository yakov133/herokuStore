const axios = require("axios");
var mongodb = require("mongodb");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const MongoClient = mongodb.MongoClient;
const url = process.env.MONGODB_URL || "mongodb://localhost:27017/appleStore";


const dbName = "ecommers";
let ObjectId = mongodb.ObjectId;
const Data = require("../public/js/Data").data;

function addMenyProducts(collectionName, req, res) {
  
  MongoClient.connect(url, function (err, db) {
    if (err) {
      res.status(404).send("Error");
      throw err;
    }
    var dbo = db.db(dbName);
    myobj = Data; 
    dbo.collection("products").insertMany(myobj, function (err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount);
      res.status(201).send("ok");
      db.close();
    });
  });
}

function addColection(collectionName) {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log("in addColection Error");
      throw err;
    }
    var dbo = db.db(dbName);
    dbo.createCollection(collectionName, function (err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  });
}

function addOneProduct(req, res) {
  const data = req.body;
  MongoClient.connect(url, function (err, db) {
    if (err) {
      res.status(404).end();
      throw err;
    }
    var dbo = db.db(dbName);
    var myobj = data;
    dbo.collection("products").insertOne(myobj, function (err, result) {
      if (err) throw err;
      res.status(201).send(result);
      console.log("1 document inserted");
      db.close();
    });
  });
}

function addOneContact(req, res) {
  const data = req.body;
  MongoClient.connect(url, function (err, db) {
    if (err) {
      res.status(404).end();
      throw err;
    }
    var dbo = db.db(dbName);
    var myobj = data;
    dbo.collection("contact").insertOne(myobj, function (err, result) {
      if (err) throw err;
      res.status(201).send(result);
      console.log("1 document inserted");
      db.close();
    });
  });
}

function addNewCart(req, res) {
  const data = req.body;
  MongoClient.connect(url, function (err, db) {
    if (err) {
      res.status(404).end();
      throw err;
    }
    var dbo = db.db(dbName);
    var myobj = data;
    dbo.collection("carts").insertOne(myobj, function (err, result) {
      if (err) throw err;
      res.status(201).send(result);
      console.log("1 document inserted");
      db.close();
    });
  });
}

function updateCart(req, res) {
  const newObj = { id: req.body.producId };
  newObj.key = uuidv4();

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    var myquery = { _id: ObjectId(req.params.id) };
    var newvalues = { $push: { proudcts: newObj } };
    dbo
      .collection("carts")
      .updateOne(myquery, newvalues, function (err, result) {
        if (err) {
          throw err;
        }
        console.log(result);
        res.status(201).send(result);
        console.log("1 document updated");
        db.close();
      });
  });
}

function deleteFromCart(req, res) {
  const myquery = req.body;
  
  MongoClient.connect(url, function (error, db) {
    if (error) {
      throw error;
    }
    const dbo = db.db(dbName);
    
    dbo.collection("carts").updateOne(
      { },
      { $pull: { proudcts: myquery } },
    )
    res.end();
  });
  
}

function getCart(req, res) {
  var myquery = { _id: ObjectId(req.params.id) };
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    dbo.collection("carts").findOne(myquery, function (err, result) {
      if (err) throw err;
      res.status(200).json(result);
      db.close();
    });
  });
}

function getProducts(req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    dbo
      .collection("products")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
        db.close();
      });
  });
}
function getProductsByCategory(req, res) {
  const category = { category: req.params.category };

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(dbName);
    dbo
      .collection("products")
      .find(category)
      .toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
        db.close();
      });
  });
}

function deleteProduct(req, res) {
  
  var myquery = { _id: ObjectId(req.params.id) };
  
  MongoClient.connect(url, function (err, db) {
    if (err) {
      throw err;
    }
    const dbo = db.db(dbName);
    dbo.collection("products").deleteOne(myquery, (err, result) => {
      if (err) {
        throw err;
      }
      if(result.deletedCount){
        res.status(200).send(result);
      }else{
        res.status(404).send(result);
      }
      db.close();
    });
  });
  
}

function updateProduct(req, res) {
  var myquery = { _id: ObjectId(req.params.id) };
  const obj = req.body;
  MongoClient.connect(url, function (err, db) {
    if (err) {
      throw err;
    }
    const dbo = db.db(dbName);
    dbo
      .collection("products")
      .updateOne(myquery, { $set: obj }, (err, result) => {
        if (err) {
          throw err;
        }
        res.send(result);
        db.close();
      });
  });
}

function getContent(req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) {
      throw err;
    }
    const dbo = db.db(dbName);
    dbo
      .collection("contact")
      .find({})
      .toArray((err, result) => {
        if (err) {
          throw err;
        }
        res.send(result);
        db.close();
      });
  });
}
function getSpecificProducts(req, res) {
  let arr = [];

  const clientCart = [];
  for (const iterator of req.query.arr) {
    clientCart.push(JSON.parse(iterator));
  }
  MongoClient.connect(url, function (err, db) {
    if (err) {
      throw err;
    }
    const dbo = db.db(dbName);

    dbo
      .collection("products")
      .find({})
      .toArray((err, result) => {
        if (err) {
          throw err;
        }
        for (
          let prouductIterator = 0;
          prouductIterator < result.length;
          prouductIterator++
        ) {
          for (
            let clientIterator = 0;
            clientIterator < clientCart.length;
            clientIterator++
          ) {
            if (
              clientCart[clientIterator].id ==
              result[prouductIterator]._id.toString()
            ) {
              let uniqueObj = result[prouductIterator];
              let key = clientCart[clientIterator].key;
              let newobj = { ...uniqueObj, key };
              arr.push(newobj);
            }
          }
        }
        res.send(arr);
        db.close();
      });
  });
}

module.exports = {
  getSpecificProducts,
  getContent,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getProducts,
  getCart,
  deleteFromCart,
  updateCart,
  addNewCart,
  addOneContact,
  addOneProduct,
  addMenyProducts,
  addColection,
};
