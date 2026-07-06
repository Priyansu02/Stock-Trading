const { model } = require("mongoose");
const  {PaperTradingSchema} = require("../schemas/PaperTradingSchema");

const PaperTradingModel = model("PaperTrading", PaperTradingSchema);

module.exports = PaperTradingModel;