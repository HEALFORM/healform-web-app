// @ts-ignore
import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/history";
import { ThemeProvider } from '@healform/liquid'
import * as React from 'react'
import { Layout } from "./components/Layout";

export const App = () => {
  return (
    <>
      <Router history={history}>
        <div id="App">
          <ThemeProvider nonce={''}>
            <Layout />
          </ThemeProvider>
        </div>
      </Router>
    </>
  )
}
