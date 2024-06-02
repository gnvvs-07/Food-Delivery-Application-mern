import mongoose from "mongoose";

// order schema
const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  address:{
    type:Object,
    required:true
  },
  status:{
    type:String,
    default:"food processing"
  },
  date:{
    type:Date,
    default:Date.now().toLocaleString(),
  },
  payment:{
    type:Boolean,
    default:false
  },
});

const orderModel = mongoose.models.order || mongoose.model("order",orderSchema);

export default orderModel;