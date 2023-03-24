import { TokenValidator } from '@/domain/contracts/crypto'

type Setup = (crypto: TokenValidator) => Authorize
export type Authorize = (params: { token: string }) => Promise<string>

export const setupAuthorize: Setup = (crypto) => async params => {
  return crypto.validateToken(params)
}
