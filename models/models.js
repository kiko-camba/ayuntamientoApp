import mongoose from "mongoose";

const newSupplier = new mongoose.Schema({
    cif:{
        type: String,
        require: true
    },
    name:{
        type: String,
        require: true
    },
    activity:{
        type: String,
        require: true
    },
    address:{
        type: String,
        require: true
    },
    location:{
        type: String,
        require: true
    },
    postalCode:{
        type: String,
        require: true
    },
    telephone:{
        type: String,
        require: true
    }
},
{
    versionKey: false,
    collection: 'suppliers'
}
);
module.exports = mongoose.model('suppliers', newSupplier)