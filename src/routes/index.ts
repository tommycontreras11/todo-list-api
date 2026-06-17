import { Router } from "express"
import rootRoutes from "./root/index.js"

const router = Router()

router.use("/", rootRoutes)

export default router