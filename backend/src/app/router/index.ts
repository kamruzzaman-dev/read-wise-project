import express from 'express'
import { AuthRouter } from '../modules/auth/auth.router'
const router = express.Router()

const moduleRoutes = [{ path: '/auth', router: AuthRouter }]

moduleRoutes.forEach(route => router.use(route.path, route.router))

export default router
