const { Schema } = require("mongoose");

const PaperTradingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    balance: {
        type: Number,
        default: 1000000,
    },

    investedAmount: {
        type: Number,
        default: 0,
    },

    currentValue: {
        type: Number,
        default: 0,
    },

    profitLoss: {
        type: Number,
        default: 0,
    },
});

module.exports = { PaperTradingSchema} ;
