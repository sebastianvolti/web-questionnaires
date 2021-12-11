import { Router } from "express";
import authRoute from "./auth/auth.route";
import surveyRoute from "./survey/survey.route";
import answerRoute from "./answer/answer.route";

const router: Router = Router();

router.use("/", authRoute);
router.use("/", surveyRoute);
router.use("/", answerRoute);

export default router;
