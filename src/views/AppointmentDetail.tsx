import React, { useEffect, useState } from 'react'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import Loading from '../components/Loading'
import { useParams } from 'react-router-dom'
import { Appointment } from '../interfaces/Appointment'
import { Button, SimpleGrid, Stack, useToast } from '@healform/liquid'
import Error from '../components/Error'
import { PageHeader } from '../components/PageHeader'
import { FiPlus } from 'react-icons/fi'

const AppointmentDetailView: React.FC = () => {
  const { id } = useParams()
  const { user } = useAuth0()
  const [appointment, setAppointment] = useState<Appointment>()
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)
  const toast = useToast()

  useEffect(() => {
    const getAppointmentDetailsByUser = (user: string | undefined) => {
      fetch(`${process.env.REACT_APP_API_URL}` + `/acuity/` + user + `/appointment/` + id)
        .then(response => response.json())
        .then(json => {
          setAppointment(json)
          setLoading(false)
        })
        .catch(err => {
          if (err.response) {
            setLoading(false)
            setError(true)
            const id = 'errorResponse'
            if (!toast.isActive(id)) {
              toast({
                title: 'Die Daten konnten nicht geladen werden.',
                description: 'Der Server gab eine Fehlermeldung zurück.',
                status: 'error',
                isClosable: true,
                position: 'bottom-right',
                id,
              })
            }
          } else if (err.request) {
            setLoading(false)
            setError(true)
            const id = 'errorRequest'
            if (!toast.isActive(id)) {
              toast({
                title: 'Die Daten konnten nicht geladen werden.',
                description: 'Möglicherweise besteht keine Verbinung zum Internet oder Server.',
                status: 'error',
                isClosable: true,
                position: 'bottom-right',
                id,
              })
            }
          }
        })
    }

    getAppointmentDetailsByUser(user?.email)
  }, [id, toast, user?.email])

  if (isLoading) {
    return <Loading />
  } else {
    if (isError) {
      return <Error />
    } else {
      return (
        <Stack spacing={5}>
          <Stack spacing="2">
            <Stack
              spacing="4"
              direction={{ base: 'column', md: 'row' }}
              justify="space-between"
              align={{ base: 'start', md: 'center' }}
            >
              <PageHeader
                title={`${appointment?.date}` + ` • ` + `${appointment?.time}` + ` bis ` + `${appointment?.endTime}`}
                subtitle={`${appointment?.location}`}
              />
              <Button leftIcon={<FiPlus fontSize="1.25rem" />}>Neuer Termin</Button>
            </Stack>
            <Stack spacing={{ base: '5', lg: '6' }}>
              <SimpleGrid columns={{ base: 1, md: 1 }} gap="6" mb={5}>
                huhu
              </SimpleGrid>
            </Stack>
          </Stack>
        </Stack>
      )
    }
  }
}

export default withAuthenticationRequired(AppointmentDetailView, {
  onRedirecting: () => <Loading />,
})
