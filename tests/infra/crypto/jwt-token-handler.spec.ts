import { JwtTokenHandler } from '@/infra/crypto'

import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

describe('JwtTokenHandler', () => {
  let sut: JwtTokenHandler
  let fakeJwt: jest.Mocked<typeof jwt>
  let secret: string

  beforeAll(() => {
    fakeJwt = jwt as jest.Mocked<typeof jwt>
    secret = 'any_secret'
  })

  beforeEach(() => {
    sut = new JwtTokenHandler(secret)
  })

  describe('generateToken', () => {
    let key: string
    let token: string
    let expirationInMs: number

    beforeAll(() => {
      key = 'any_key'
      expirationInMs = 1000
      token = 'any_token'
      fakeJwt.sign.mockImplementation(() => token)
    })

    it('should call sign with correct params', async () => {
      await sut.generateToken({ key, expirationInMs })

      expect(fakeJwt.sign).toHaveBeenCalledWith({ key }, secret, { expiresIn: 1 })
    })

    it('should return a token', async () => {
      const generatedToken = await sut.generateToken({ key, expirationInMs })

      expect(generatedToken).toBe(token)
    })

    it('should rethrow if sign throws', async () => {
      fakeJwt.sign.mockImplementationOnce(() => { throw new Error('token_error') })

      const promise = sut.generateToken({ key, expirationInMs })

      await expect(promise).rejects.toThrow(new Error('token_error'))
    })
  })
})
