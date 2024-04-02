import React, { useEffect, useState } from 'react'
import './App.css'
import { NavigationBar, steps } from './components/Navigation/NavigationBar'
import { Playlist, PlaylistContract } from './models/datacontracts/PlaylistContract'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { exchangeRefreshToken, getCode, getToken } from './scripts/SpotifyAuth'
import { LoadingSpinner } from './components/SelectArtists/Search/LoadingSpinner'
import { SelectArtists } from './components/SelectArtists/SelectArtists'
import { RefinePlaylist } from './components/RefinePlaylist/RefinePlaylist'

const App: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [playlist, setPlaylist] = useState<PlaylistContract>(new Playlist())
  const [token, setToken] = useState<string>('')
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false)

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code') ?? ''
    const refreshToken = localStorage.getItem('refreshToken')

    if (!isAuthenticating && !isAuthenticated) {
      if (code !== '') {
        setIsAuthenticating(true)

        try {
          const cleanedURL = window.location.href.split('?')[0]
          window.history.replaceState({}, document.title, cleanedURL)
          getToken(code)
            .then((value) => {
              setIsAuthenticated(true)
              setToken(value)
            })
            .catch((reason) => {
              console.error(reason)
              setIsAuthenticated(false)
            })
            .finally(() => {
              setIsAuthenticating(false)
            })
        } catch (error) {
          console.error('Error while exchanging fetching token')
          setIsAuthenticating(false)
        }
      } else if (refreshToken !== null && refreshToken !== '' && token === '') {
        setIsAuthenticating(true)

        try {
          exchangeRefreshToken(refreshToken)
            .then((newToken) => {
              setIsAuthenticated(true)
              setToken(newToken)
            })
            .catch((reason) => {
              console.error(reason)
              setIsAuthenticated(false)
            })
            .finally(() => setIsAuthenticating(false))
        } catch (e) {
          console.error('Error while exchanging refresh token')
          setIsAuthenticating(false)
        }
      }
    }
  }, [isAuthenticated, isAuthenticating, token])

  useEffect(() => {
    if (playlist.songs.length > 0) {
      setActiveStep(steps.indexOf('REFINE PLAYLIST'))
    } else {
      setActiveStep(steps.indexOf('SELECT ARTISTS'))
    }
  }, [playlist])

  const getCurrentScreen = () => {
    if (steps[activeStep] === 'SELECT ARTISTS') {
      return <SelectArtists setPlaylist={setPlaylist} token={token} />
    } else if (steps[activeStep] === 'REFINE PLAYLIST') {
      return (
        <RefinePlaylist
          playlist={playlist}
          setPlaylist={setPlaylist}
          setActiveStep={setActiveStep}
          token={token}
        />
      )
      // } else if (steps[activeStep] === 'GENERATE') {
      //   return <TempGeneratePlaylist />
    }
    return <></>
  }

  return (
    <>
      <NavigationBar activeStep={activeStep} setActiveStep={setActiveStep} />

      {isAuthenticated ? (
        getCurrentScreen()
      ) : isAuthenticating ? (
        <LoadingSpinner />
      ) : (
        <Box textAlign="center" padding={6}>
          <Button variant="contained" role="link" onClick={getCode}>
            Authorize Spotify
          </Button>
        </Box>
      )}
    </>
  )
}

export default App
