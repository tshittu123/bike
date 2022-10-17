import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import { Document, Schema } from "mongoose";
import { NextFunction } from "express";
import * as connections from "../../config/connection/connection";

export interface IBikeModel extends Document {
  bikemodel: string;
  color: string;
  location: string;
  rating: {
    one: number;
    two: number;
    three: number;
    four: number;
    five: number;
  };
  available: boolean;
}

const BikeSchema: Schema = new Schema(
  {
    model: String,
    color: String,
    location: String,
    rating: {
      one: Number,
      two: Number,
      three: Number,
      four: Number,
      five: Number,
    },
    available: Boolean,
  },
  {
    collection: "bikemodel",
    versionKey: false,
  }
);

export default connections.db.model<IBikeModel>("BikeModel", BikeSchema);
