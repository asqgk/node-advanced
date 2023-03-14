import { adaptExpressRoute as adapt } from '@/infra/http'
import { makeFacebookLoginController } from '../factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/api/login/facebook', adapt(makeFacebookLoginController()))
}
