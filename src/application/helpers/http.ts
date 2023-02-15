import { UnauthorizedError } from '@/application/errors'

export type httpResponse = {
  statusCode: number
  data: any
}

export const badRequest = (error: Error): httpResponse => ({
  statusCode: 400,
  data: error
})

export const unauthorized = (): httpResponse => ({
  statusCode: 401,
  data: new UnauthorizedError()
})
