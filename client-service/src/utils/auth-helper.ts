const CLIENT_TOKEN_KEY = 'CLIENT_SERVICE'

export const curretUserToken = (): string | null => localStorage.getItem(CLIENT_TOKEN_KEY)

export const setUserToken = (token: string): void => {
  localStorage.setItem(CLIENT_TOKEN_KEY, token)
}

export const logoutUser = (): void => {
  localStorage.removeItem(CLIENT_TOKEN_KEY)
}
