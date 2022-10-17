import * as express from "express";
import * as http from "http";
import * as path from "path";
import * as jwtConfig from "../config/middleware/jwtAuth";
import AuthRouter from "./AuthRouter";
import UserRouter from "./UserRouter";
import BikeRouter from "./BikeRouter";
import ReservationRouter from "./ReservationRouter";

export function init(app: express.Application): void {
  const router: express.Router = express.Router();

  app.use("/users", jwtConfig.isAuthenticated, UserRouter);

  app.use("/bikes", jwtConfig.isAuthenticated, BikeRouter);

  app.use("/reservations", jwtConfig.isAuthenticated, ReservationRouter);

  app.use("/auth", AuthRouter);

  app.use((req, res) => {
    res.status(404).send(http.STATUS_CODES[404]);
  });

  app.use(router);
}
