import * as Joi from "joi";
import { Types } from "mongoose";
import ReservationModel, {
  IReservationModel,
  IReservationModelExpaned,
} from "./model";
import UserModel, { IUserModel } from "../User/model";
import BikeModel, { IBikeModel } from "../Bike/model";
import ReservationValidation from "./validation";
import { IReservationService } from "./interface";

const ReservationService: IReservationService = {
  async insert(body: IReservationModel): Promise<IReservationModel> {
    try {
      const validate: Joi.ValidationResult =
        ReservationValidation.createReservation(body);

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const reservation: IReservationModel = await ReservationModel.create(
        body
      );

      return reservation;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async findAll(): Promise<IReservationModelExpaned[]> {
    try {
      let reservations = await ReservationModel.find({});
      let news: IReservationModelExpaned[] = [];
      for (let i = 0; i < reservations.length; i++) {
        let user_details = await UserModel.findOne({
          _id: new Types.ObjectId(reservations[i].user_id),
        });
        let bike_details = await BikeModel.findOne({
          _id: new Types.ObjectId(reservations[i].bike_id),
        });
        news.push({ reservation: reservations[i], user_details, bike_details });
      }
      return news;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async remove(id: string): Promise<IReservationModel> {
    try {
      const validate: Joi.ValidationResult =
        ReservationValidation.removeReservation({
          id,
        });

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const reservation: IReservationModel =
        await ReservationModel.findOneAndRemove({
          _id: new Types.ObjectId(id),
        });

      return reservation;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default ReservationService;
