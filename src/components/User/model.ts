import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import { Document, Schema } from "mongoose";
import { NextFunction } from "express";
import * as connections from "../../config/connection/connection";

export interface IUserModel extends Document {
  email: string;
  password: string;
  kind: "MANAGER" | "USER";
  name: string;
  comparePassword?: (password: string) => Promise<boolean>;
  gravatar?: (size: number) => string;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    password: String,
    kind: String,
    name: String,
  },
  {
    collection: "usermodel",
    versionKey: false,
  }
).pre("save", async function (next: NextFunction): Promise<void> {
  const user = this as IUserModel;

  if (!user.isModified("password")) {
    return next();
  }

  try {
    const salt: string = await bcrypt.genSalt(10);
    const hash: string = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    let user = this as IUserModel;
    const match: boolean = await bcrypt.compare(
      candidatePassword,
      user.password
    );
    return match;
  } catch (error) {
    return error;
  }
};

UserSchema.methods.gravatar = function (size: number): string {
  let user = this as IUserModel;
  if (!size) {
    size = 200;
  }
  if (!user.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5: string = crypto.createHash("md5").update(user.email).digest("hex");
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

export default connections.db.model<IUserModel>("UserModel", UserSchema);
