import * as Joi from "joi";
import Validation from "../validation";
import { IBikeModel } from "./model";

class BikeValidation extends Validation {
  constructor() {
    super();
  }

  createBike(params: IBikeModel): Joi.ValidationResult {
    const schema: Joi.Schema = Joi.object().keys({
      bikemodel: Joi.string().required(),
      color: Joi.string().required(),
      location: Joi.string().required(),
    });

    return schema.validate(params);
  }

  getBike(body: { id: string }): Joi.ValidationResult {
    const schema: Joi.Schema = Joi.object().keys({
      id: this.customJoi.objectId().required(),
    });

    return schema.validate(body);
  }

  removeBike(body: { id: string }): Joi.ValidationResult {
    const schema: Joi.Schema = Joi.object().keys({
      id: this.customJoi.objectId().required(),
    });

    return schema.validate(body);
  }
}

export default new BikeValidation();
