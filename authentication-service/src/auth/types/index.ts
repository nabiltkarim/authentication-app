export interface JwtValidation {
  readonly id: string
  readonly email: string
}

export interface JwtPayload {
  readonly sub: string
  readonly email: string
}

export interface SigninResp {
  readonly access_token: string
}
