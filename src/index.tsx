import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { App } from './App'
import { BrowserRouter } from 'react-router-dom'
import { Auth0ProviderWithHistory } from './utils/auth0-provider-with-history'

import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import de from 'javascript-time-ago/locale/de.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(de)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <App />
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)
