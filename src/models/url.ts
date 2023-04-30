import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const urlSchema = new mongoose.Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    clickCount: Number,
    saveSameCount:Number,
    date: { type: String, default: Date.now}
});

export default mongoose.models.Url ||  mongoose.model("Url", urlSchema)