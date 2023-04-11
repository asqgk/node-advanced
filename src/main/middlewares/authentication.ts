import { adaptExpressMiddleware } from '@/main/adapters'
import { makeAuthenticationMiddleware } from '../factories/middlewares'

export const auth = adaptExpressMiddleware(makeAuthenticationMiddleware())
