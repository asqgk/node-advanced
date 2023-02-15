export type httpResponse = {
  statusCode: number
  data: any
}

export const badRequest = (error: Error): httpResponse => ({
  statusCode: 400,
  data: error
})
