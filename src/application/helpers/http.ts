import { ForbiddenError, ServerError, UnauthorizedError } from '@/application/errors'

export type httpResponse<T = any> = {
  statusCode: number
  data: T
}

export const ok = <T = any> (data: T): httpResponse<T> => ({
  statusCode: 200,
  data
})

export const badRequest = (error: Error): httpResponse<Error> => ({
  statusCode: 400,
  data: error
})

export const unauthorized = (): httpResponse<Error> => ({
  statusCode: 401,
  data: new UnauthorizedError()
})

export const forbidden = (): httpResponse<Error> => ({
  statusCode: 403,
  data: new ForbiddenError()
})

export const serverError = (error: unknown): httpResponse<Error> => ({
  statusCode: 500,
  data: new ServerError(error instanceof Error ? error : undefined)
})
