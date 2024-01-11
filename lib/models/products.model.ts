import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
  currency: { type: String, required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
  currenPrice: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  priceHistory: [
    {
      price: { type: Number, required: true },
      date:{type:Date,default:Date.now}
    },
  ],
  lowestPrice:{type:Number},
  highestPrice:{type:Number},
  averagePrice:{type:Number},
  discountPrice:{type:Number},
  description:{type:String},
  category:{type:String},
  reviewsCount:{type:Number},
  isOutofStock:{type:Boolean},
  users:[
    {
        email:{type:String,required:true},
    }
  ],default:[],
},{timestamps:true});

const Product = mongoose.models.Product || mongoose.model('Product',ProductSchema)

export default Product;