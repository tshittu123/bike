import { NextFunction, Request, Response } from "express";
import ReservationService from "./service";
import { HttpError } from "../../config/error";
import { IReservationModel, IReservationModelExpaned } from "./model";

export async function create(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const reservation: IReservationModel = await ReservationService.insert(
      req.body
    );
    res.status(201).json(reservation);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

export async function findAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const reservations: IReservationModelExpaned[] =
      await ReservationService.findAll();
    res.status(200).json(reservations);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

export async function remove(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const reservation: IReservationModel = await ReservationService.remove(
      req.params.id
    );
    res.status(200).json(reservation);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
