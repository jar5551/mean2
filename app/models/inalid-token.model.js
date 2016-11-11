/**
 * Created by jarek on 10/11/2016.
 */
import mongoose from 'mongoose';

let invalidTokenSchema = new mongoose.Schema({
  token: {type: String},
  expiresAt: {type: Date, default: Date.now, expires: 0},
});

export default mongoose.model('InvalidToken', invalidTokenSchema);