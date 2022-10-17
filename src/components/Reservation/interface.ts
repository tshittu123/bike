import { IReservationModel, IReservationModelExpaned } from "./model";

export interface IReservationService {
  findAll(): Promise<IReservationModelExpaned[]>;

  insert(userModel: IReservationModel): Promise<IReservationModel>;

  remove(id: string): Promise<IReservationModel>;
}
