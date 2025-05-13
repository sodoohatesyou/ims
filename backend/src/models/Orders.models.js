<<<<<<< HEAD
const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    consumer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Consumer",
      required: true,
    },
    items: {
      type: [
        {
          name: {
            type: String,
            trim: true,
          },
          price: {
            type: Number,
          },
          quantity: {
            // Add quantity field here
            type: Number,
            default: 1, // Set default quantity to 1
          },
        },
      ],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("Order", Schema);

module.exports = model;
=======
const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'user',
                required:true
            }   , 
            consumer:{
   type:mongoose.Schema.Types.ObjectId,
                ref:'Consumer',
                required:true
            }  ,
                    items:{
                        type:[
                            {
                                name:{
                                    type:String,
                                    trim:true
                                },
                                price:{
                                    type:Number
                                }
                            }
                        ]
                    } ,
    
            isActive:{
                type:Boolean,
                default:true
            }

},{timestamps:true})


const model = mongoose.model("Order",Schema)

module.exports = model
>>>>>>> 184fa8d6d6219d6d20aeec3a3e9315ebe45bcba8
