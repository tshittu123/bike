import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import { Document, Schema } from "mongoose";
import { NextFunction } from "express";
import * as connections from "../../config/connection/connection";
import { IUserModel } from "../User/model";
import { IBikeModel } from "../Bike/model";

export interface IReservationModel extends Document {
  bike_id: string;
  user_id: string;
  start_date: string;
  end_date: string;

  user_details?: IUserModel;
  bike_details?: IBikeModel;
}

export interface IReservationModelExpaned {
  reservation: any;
  user_details?: IUserModel;
  bike_details?: IBikeModel;
}

const ReservationSchema: Schema = new Schema(
  {
    bike_id: String,
    user_id: String,
    start_date: String,
    end_date: String,
  },
  {
    collection: "reservationmodel",
    versionKey: false,
  }
);

export default connections.db.model<IReservationModel>(
  "ReservationModel",
  ReservationSchema
);
