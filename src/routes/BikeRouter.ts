import { Router } from "express";
import { BikeComponent } from "../components";

const router: Router = Router();

router.get("/", BikeComponent.findAll);

router.post("/", BikeComponent.create);

router.get("/:id", BikeComponent.findOne);

router.delete("/:id", BikeComponent.remove);

export default router;
