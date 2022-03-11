import React from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import Loading from '../components/Loading'
import { useParams } from 'react-router-dom'

const AppointmentDetailView: React.FC = () => {
  const { id } = useParams()

  return <p>{id}</p>
}

export default withAuthenticationRequired(AppointmentDetailView, {
  onRedirecting: () => <Loading />,
})
