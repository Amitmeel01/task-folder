const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema=new Schema({
  Name:String,
  Age:Number,
  Gender:String,
  Mobile:Number,
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;