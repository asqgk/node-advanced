export class UserProfile {
  initials?: string
  pictureUrl?: string

  constructor (readonly id: string) {}

  setPicture ({ pictureUrl, name }: { pictureUrl?: string, name?: string}): void {
    this.pictureUrl = pictureUrl
    if (pictureUrl === undefined && name !== undefined) {
      const firstLetters = name.match(/\b(.)/g) ?? []
      this.initials = (firstLetters.length > 1)
        ? `${firstLetters.shift()?.toUpperCase() ?? ''}${firstLetters.pop()?.toUpperCase() ?? ''}`
        : name.substring(0, 2)?.toUpperCase()
    }
  }
}
