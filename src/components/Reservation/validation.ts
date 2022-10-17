import * as Joi from "joi";
import Validation from "../validation";
import { IReservationModel } from "./model";

class ReservationValidation extends Validation {
  constructor() {
    super();
  }

  createReservation(params: IReservationModel): Joi.ValidationResult {
    const schema: Joi.Schema = Joi.object().keys({
      bike_id: this.customJoi.objectId().required(),
      user_id: this.customJoi.objectId().required(),
      start_date: Joi.string().required(),
      end_date: Joi.string().required(),
    });

    return schema.validate(params);
  }

  getReservation(body: { id: string }): Joi.ValidationResult {
    const schema: Joi.Schema = Joi.object().keys({
      id: this.customJoi.objectId().required(),
    });

    return schema.validate(body);
  }

  removeReservation(body: { id: string }): Joi.ValidationResult {
    const schema: Joi.Schema = Joi.object().keys({
      id: this.customJoi.objectId().required(),
    });

    return schema.validate(body);
  }
}

export default new ReservationValidation();
