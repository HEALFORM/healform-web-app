// @ts-ignore
import { ThemeProvider } from '@healform/liquid'
import * as React from 'react'
import { Layout } from './components/Layout'
import { useAuth0 } from '@auth0/auth0-react'

export const App = () => {
  return (
    <>
      <div id="App">
        <ThemeProvider nonce={''}>
          <Layout />
        </ThemeProvider>
      </div>
    </>
  )
}
