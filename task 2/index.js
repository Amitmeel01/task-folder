const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/mongo");
const path = require("path");

var methodOverride = require('method-override');




//middlewares

app.use(express.json());
app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");
app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname,'/public')));


main()
  .then(() => console.log("success"))
  .catch((err) => console.log(err));
//connect with mongo
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/task");
};


app.get("/",(req,res)=>{
  res.send("home page");
})


//
app.get("/home",async (req,res)=>{
  const alllist=await Listing.find({});
  res.render("home.ejs",{alllist});
});
// create
app.get("/new",(req,res)=>{
  res.render("create.ejs");
});

app.post("/create", async (req, res) => {
  const newListing = new Listing(req.body);
  try {
    await newListing.save();
    res.redirect("/home");
  } catch (error) {
    console.error("Error saving new listing:", error);
    res.status(500).send("Error saving new listing");
  }
});

//delete
app.delete("/home/:id", async (req,res)=>{
  let { id }=req.params;
  // console.log(id);
  await Listing.findByIdAndDelete(id);
  res.redirect("/home");
});


//edit

app.get("/home/:id/edit",async (req,res)=>{

  let {id}=req.params;

  const list=await Listing.findById(id);
  res.render("edit.ejs",{list});

});

app.put("/home/:id",async (req,res)=>{
  let {id}=req.params;
  await Listing.findByIdAndUpdate(id,{...req.body.list});
  res.redirect("/home");
});





app.listen(8080, () => {
  console.log("server start");
});
