import { IBikeModel } from "./model";

export interface IBikeService {
  findAll(): Promise<IBikeModel[]>;

  findOne(code: string): Promise<IBikeModel>;

  insert(userModel: IBikeModel): Promise<IBikeModel>;

  remove(id: string): Promise<IBikeModel>;
}
