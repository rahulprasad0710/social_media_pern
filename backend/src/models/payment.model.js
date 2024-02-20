import mongoose from "mongoose";

const paymentDetailsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    requiredInformation: [
        {
            name: {
                type: String,
                required: true,
            },
            type: {
                type: String,
                required: true,
                enum: [
                    "text",
                    "number",
                    "date",
                    "email",
                    "tel",
                    "select",
                    "radio",
                    "checkbox",
                ],
            },
            options: [
                {
                    type: String,
                },
            ],
            isRequired: {
                type: Boolean,
                required: true,
            },
        },
    ],
});

const PaymentDetails = mongoose.model("PaymentDetails", paymentDetailsSchema);

export default PaymentDetails;
