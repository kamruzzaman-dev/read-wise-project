import express from 'express'
import { AuthRouter } from '../modules/auth/auth.router'
import { UserRouter } from '../modules/user/user.router'
import { BookRouter } from '../modules/book/book.router'
import { WishlistRouter } from '../modules/wishlist/wishList.router'
import { readSoonRouter } from '../modules/readSoon/readSoon.router'
const router = express.Router()

const moduleRoutes = [
  { path: '/auth', router: AuthRouter },
  { path: '/users', router: UserRouter },
  { path: '/books', router: BookRouter },
  { path: '/wishlist', router: WishlistRouter },
  { path: '/readSoon', router: readSoonRouter },
]

moduleRoutes.forEach(route => router.use(route.path, route.router))

export default router
