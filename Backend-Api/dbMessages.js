import mongoose from "mongoose";

const whatsappSchema = mongoose.Schema({
    message: String, 
    name: String, 
    timestamp: String, 
    received: Boolean,
});

// For creating a Collection Name with their colllections.

export default mongoose.model("messageContent", whatsappSchema);