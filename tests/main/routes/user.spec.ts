import { PgUser } from '@/infra/repos/postgres/entities'
import { app } from '@/main/config/app'
import { UnauthorizedError } from '@/application/errors'
import { makeFakeDb } from '@/tests/infra/repos/postgres/mocks'

import { IBackup } from 'pg-mem'
import { getConnection } from 'typeorm'
import request from 'supertest'

describe('User Routes', () => {
  describe('Delete /users/picture', () => {
    let backup: IBackup

    beforeAll(async () => {
      const db = await makeFakeDb([PgUser])
      backup = db.backup()
    })

    afterAll(async () => {
      await getConnection().close()
    })

    beforeEach(() => {
      backup.restore()
    })

    it('should return 403 if no authorization header is present', async () => {
      const { status } = await request(app)
        .delete('/api/users/picture')
        .send()

      expect(status).toBe(403)
    })
  })
})
