const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    date: {
        type: Date,
    },
    slot: {
        type: String,
    },
    status: {
        type: String,
    },
    notes: {
        type: String,
    },

});


module.exports = mongoose.model("history", historySchema);
