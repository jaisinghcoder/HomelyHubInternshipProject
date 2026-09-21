import slugify from "slugify";
import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    propertyName: {
        type: String,
        required: [true, "Please enter your property name"]
    },
    description: {
        type: String,
        required: [true, "Please add information about your property"]
    },
    extraInfo: {
        type: String,
        default: "checking on time. good services."
    },
    propertyType: {
        type: String,
        enum: ["House", "Flat", "Guest House", "HOtel"],
        default: "House"
    },
    roomType: {
        type: String,
        enum: ["AnyType", "Room", "Entire Room",],
        default: "AnyType"
    },
    maximumGuest: {
        type: Number,
        required: [true, "Please give the maximum no of Guest that can occupy"]
    },
    amenities:[
        {
            name: {
                type: String,
                required: true,
                enum: ["Wifi",
                     "TV", 
                     "AC", 
                     "Washing Machine", 
                     "Kitchen", 
                     "FreeParking", 
                     "Pool"
                    ]
            },
        icon: {
            type: String,
            required: true
        }
    }
    ],

    images:{
        type:[
            {
                public_id: {
                    type: String,
                },
                url: {
                    type: String,
                    required: true
                }
            }
        ],
        validate:{
            validator: function(arr){
                return arr.length >=6;
            },
            message: "The images must contain at least 6 images"
        }
    },
    price:{
        type: Number,
        required: [true, "Please enter the price per night value"],
        default: 500
    },
    address:{
        area: String,
        city: String,
        state: String,
        pincode:Number
    },
    //
    currentBookings: [
        {
            bookingId: {
                type: mongoose.Schema.ObjectId,
                ref: "Booking"
            },
            fromDate: {
                type: Date
            },
            toDate: {
                type: Date
            },
            userId: {
                type: mongoose.Schema.ObjectId,
                ref: "User"
            },
        }

    ],

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    slug: String,
    checkInTime: {type: String,default: "11:00"},
    checkOutTime: {type: String,default: "13:00"}
})

propertySchema.pre("save", function(next){
    this.slug = slugify(this.propertyName, {lower: true});
    next();
})

propertySchema.pre("save", function(next){
    this.address.city = this.address.city.toLowerCase().replaceAll("","")
    next();
})

// const Property = mongoose.model("Property", propertySchema);

const Property = mongoose.models.Property || mongoose.model("Property", propertySchema);
export {Property};