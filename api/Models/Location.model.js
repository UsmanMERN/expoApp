const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    address: {
        type: String,
    },
});


module.exports = mongoose.model("history", historySchema);
