export interface TokenGenerator {
  generateToken: (params: TokenGenerator.Params) => Promise<void>
}

export namespace TokenGenerator {
  export type Params = {
    key: string
  }

  export type Result = undefined | {
    id: string
    name?: string
  }
}
