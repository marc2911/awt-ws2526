import { model, Schema } from "mongoose";

export const Permissions = ["read", "write", "delete", "admin"] as const;

const userSchema = new Schema(
  {
    username: {
      type: String,
      minlength: 2,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    permissions: {
      type: [String],
      enum: Permissions,
      default: [],
    },
  },
  {
    pluginTags: ["mongoose-beautiful-unique-validation"],
  },
);

export const User = model("User", userSchema);
