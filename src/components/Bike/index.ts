import { NextFunction, Request, Response } from "express";
import BikeService from "./service";
import { HttpError } from "../../config/error";
import { IBikeModel } from "./model";

export async function create(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const bike: IBikeModel = await BikeService.insert(req.body);
    res.status(201).json(bike);
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
    const bikes: IBikeModel[] = await BikeService.findAll();
    res.status(200).json(bikes);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

export async function findOne(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const bike: IBikeModel = await BikeService.findOne(req.params.id);
    res.status(200).json(bike);
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
    const bike: IBikeModel = await BikeService.remove(req.params.id);
    res.status(200).json(bike);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
