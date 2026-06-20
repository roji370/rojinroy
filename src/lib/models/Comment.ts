import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IComment extends Document {
  username: string;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment: Model<IComment> =
  mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema);

export default Comment;
