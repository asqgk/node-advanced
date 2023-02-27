import { badRequest, httpResponse, ok, serverError, unauthorized } from '@/application/helpers'
import { FacebookAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/models'
import { RequiredStringValidator, ValidationComposite } from '../validation'

type httpRequest = {
  token: string
}

type Model = Error | {
  accessToken: string
}

export class FacebookLoginController {
  constructor (private readonly facebookAuthentication: FacebookAuthentication) {}

  async handle (httpRequest: httpRequest): Promise<httpResponse<Model>> {
    try {
      const error = this.validate(httpRequest)
      if (error !== undefined) {
        return badRequest(error)
      }

      const accessToken = await this.facebookAuthentication.perform({ token: httpRequest.token })
      if (accessToken instanceof AccessToken) {
        return ok({
          accessToken: accessToken.value
        })
      } else {
        return unauthorized()
      }
    } catch (error) {
      return serverError(error)
    }
  }

  private validate (httpRequest: httpRequest): Error | undefined {
    const validators = [new RequiredStringValidator(httpRequest.token, 'token')]
    return new ValidationComposite(validators).validate()
  }
}
