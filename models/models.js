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
    telephoneNumber:{
        type: String,
        require: true
    }
},
{
    versionKey: false,
    timestamps: true,
    collection: 'suppliers'
}
);
export const suppliers = mongoose.model('suppliers', newSupplier)