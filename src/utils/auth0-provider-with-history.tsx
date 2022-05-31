import { Auth0Provider } from '@auth0/auth0-react'
import React, { PropsWithChildren } from 'react'
import { useNavigate } from 'react-router-dom'

import { getConfig } from '../config'

export const Auth0ProviderWithHistory = ({ children }: PropsWithChildren<any>): JSX.Element | null => {
  const navigate = useNavigate()
  const config = getConfig()

  const domain: string | undefined = config.domain
  const clientId: string | undefined = config.clientId

  const onRedirectCallback = () => {
    navigate(window.location.pathname)
  }

  if (!(domain && clientId)) {
    return null
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}
