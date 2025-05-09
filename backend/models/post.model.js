import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  profile_pic: { type: String, required: true },
  post: { type: Array, required: true },
  description: { type: String, required: true },
  username: { type: String, required: true },
  userid: { type: String, required: true },
  likes:[{type:String}]
});

export default mongoose.model.Posts || mongoose.model("Posts", postSchema);


