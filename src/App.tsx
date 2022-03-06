import { ThemeProvider } from '@healform/liquid'
import * as React from 'react'
import { Layout } from './components/Layout'

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
