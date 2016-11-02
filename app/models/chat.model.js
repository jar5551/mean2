/**
 * Created by jarek on 02/11/2016.
 */
import mongoose from 'mongoose';

let chatSchema = new mongoose.Schema({
  message: { type: String },
  author: { type: String }
});

export default mongoose.model('Message', chatSchema);