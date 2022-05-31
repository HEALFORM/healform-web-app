import TimeAgo from 'javascript-time-ago'
import de from 'javascript-time-ago/locale/de.json'
import en from 'javascript-time-ago/locale/en.json'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { App } from './App'
import './index.css'
import { Auth0ProviderWithHistory } from './utils/auth0-provider-with-history'

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
