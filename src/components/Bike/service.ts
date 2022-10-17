import * as Joi from "joi";
import { Types } from "mongoose";
import BikeModel, { IBikeModel } from "./model";
import BikeValidation from "./validation";
import { IBikeService } from "./interface";

const BikeService: IBikeService = {
  async insert(body: IBikeModel): Promise<IBikeModel> {
    try {
      const validate: Joi.ValidationResult = BikeValidation.createBike(body);

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      let _bike = {
        ...body,
        rating: {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
        },
        available: true,
      };

      const bike: IBikeModel = await BikeModel.create(_bike);

      return bike;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async findAll(): Promise<IBikeModel[]> {
    try {
      return await BikeModel.find({});
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async findOne(id: string): Promise<IBikeModel> {
    try {
      const validate: Joi.ValidationResult = BikeValidation.getBike({
        id,
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      return await BikeModel.findOne({
        _id: new Types.ObjectId(id),
      });
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async remove(id: string): Promise<IBikeModel> {
    try {
      const validate: Joi.ValidationResult = BikeValidation.removeBike({
        id,
      });

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const user: IBikeModel = await BikeModel.findOneAndRemove({
        _id: new Types.ObjectId(id),
      });

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default BikeService;
