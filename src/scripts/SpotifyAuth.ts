const SCOPES = [
  'user-read-email',
  'user-read-private',
  'playlist-modify-public',
  'playlist-modify-private',
]
const CLIENT_ID = process.env['REACT_APP_SPOTIFY_CLIENT_ID'] ?? ''

const BASE_URI = 'https://jrfg22ir6f.execute-api.ap-southeast-2.amazonaws.com/api'

const ENDPOINTS = {
  AUTHENTICATE: `${BASE_URI}/authenticate`,
  REFRESH_TOKEN: `${BASE_URI}/refreshToken`,
}

export const getCode = () => {
  const queryParams = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: SCOPES.join(' '),
    redirect_uri: `${window.location.origin}/ArtistMixer/`,
  }).toString()

  window.location.href = `https://accounts.spotify.com/authorize?${queryParams}`
}

export const getToken = async (code: string): Promise<string> => {
  if (code !== '') {
    try {
      const res = await fetch(`${ENDPOINTS.AUTHENTICATE}?code=${code}`)
      const data = await res.json()

      const token = data.token as string
      sessionStorage.setItem('token', token)
      sessionStorage.removeItem('code')
      localStorage.setItem('refreshToken', data.refreshToken)

      return data.token
    } catch (err) {
      console.log(JSON.stringify(err))
      throw err
    }
  }
  throw new Error("Can't get token - Empty code")
}

export const exchangeRefreshToken = async (refreshToken: string): Promise<string> => {
  if (refreshToken !== '') {
    try {
      const res = await fetch(`${ENDPOINTS.REFRESH_TOKEN}?refreshToken=${refreshToken}`)
      const data = await res.json()

      const token = data.token as string
      sessionStorage.setItem('token', token)
      localStorage.setItem('refreshToken', data.refreshToken)

      return data.token as string
    } catch (err) {
      console.log(JSON.stringify(err))
      throw err
    }
  }

  throw new Error("Can't get token - Empty code")
}

export const isTokenValid = (token: string): boolean => {
  // TODO add to backend
  return token !== ''
}
