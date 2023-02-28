import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'

describe('Facebook Api Integration Tests', () => {
  let axiosClient: AxiosHttpClient
  let sut: FacebookApi

  beforeEach(() => {
    axiosClient = new AxiosHttpClient()
    sut = new FacebookApi(
      axiosClient,
      env.facebookApi.clientId,
      env.facebookApi.clientSecret
    )
  })

  it('should return a Facebook User if token is valid', async () => {
    const fbUser = await sut.loadUser({ token: 'EAAHMSERD29gBANxVN1zPIkPhOF8AktJ63uFxBXHVyt7BtiyYRjDw8Ru8cIfgot8cVMmmInZCxzs3frSQs0Ug2lMfdTwxPUcLUHgoItTj7Bzimqsk2JcX8uXEHU8gZBnbznJXitZCA3qLCKnpwsA6XAa4LdMnM85V0vkG74tqZAfgJ6ln9iFGPaeMbCePzVjzu7tWm9NRev1ew0ZB0ag9jD3wizsF0ybnQTZBWtt72DTh5s7SZA80PH8' })

    expect(fbUser).toEqual({
      facebookId: '8972326722838779',
      email: 'chico.81@hotmail.com',
      name: 'Francisco Passos'
    })
  })

  it('should return undefined if token is invalid', async () => {
    const fbUser = await sut.loadUser({ token: 'invalid' })

    expect(fbUser).toBeUndefined()
  })
})
