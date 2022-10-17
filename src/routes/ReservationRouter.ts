import { Router } from "express";
import { ReservationComponent } from "../components";

const router: Router = Router();

router.get("/", ReservationComponent.findAll);

router.post("/", ReservationComponent.create);

router.delete("/:id", ReservationComponent.remove);

export default router;
