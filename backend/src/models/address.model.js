import mongoose from "mongoose";
import { ADDRESS_TYPE_LIST } from "../constants/Address.js";

const addressSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    houseNumberName: {
        type: String,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    mobileNumber2: {
        type: String,
    },
    addressLine1: {
        type: String,
        required: true,
    },
    addressLine2: {
        type: String,
    },
    ward: {
        type: Number,
        required: true,
    },
    townCity: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    province: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
    },
    addressType: {
        type: String,
        required: true,
        enum: [...ADDRESS_TYPE_LIST],
    },
});

const addressModel = mongoose.model("Address", addressSchema);

export default addressModel;
