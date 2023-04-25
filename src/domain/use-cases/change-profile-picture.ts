import { UUIDGenerator, UploadFile } from '@/domain/contracts/gateways'
import { SaveUserPicture, LoadUserProfile } from '@/domain/contracts/repos'

type Setup = (fileStorage: UploadFile, crypto: UUIDGenerator, userProfileRepo: SaveUserPicture & LoadUserProfile) => ChangeProfilePicture
type Input = { id: string, file?: Buffer }
export type ChangeProfilePicture = (input: Input) => Promise<void>

export const setupChangeProfilePicture: Setup = (fileStorage, crypto, userProfileRepo) => async ({ id, file }) => {
  let pictureUrl: string | undefined
  let initials: string | undefined
  if (file !== undefined) {
    pictureUrl = await fileStorage.upload({ file, key: crypto.uuid(id) })
  } else {
    const { name } = await userProfileRepo.load({ id })
    if (name !== undefined) {
      const firstLetters = name.match(/\b(.)/g) ?? []
      initials = (firstLetters.length > 1) ? `${firstLetters.shift()?.toUpperCase() ?? ''}${firstLetters.pop()?.toUpperCase() ?? ''}` : name.substring(0, 2)?.toUpperCase()
    }
  }
  await userProfileRepo.savePicture({ pictureUrl, initials })
}
