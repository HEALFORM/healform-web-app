import React, { useEffect, useState } from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import Loading from '../components/Loading'
import { Stack, Divider, Body, useToast } from '@healform/liquid'
import { PageHeader } from '../components/PageHeader'
import { RadioCard, RadioCardGroup } from '../components/RadioCardGroup'
import { Location } from '../interfaces/Location'
import { Badge, Wrap } from '@chakra-ui/react'
import { format } from 'date-fns'
import { de, deAT } from 'date-fns/locale'

const AppointmentCreateView: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([])
  const [dates, setDates] = useState<any[]>([])
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)
  const toast = useToast()

  useEffect(() => {
    const getLocations = () => {
      fetch(`${process.env.REACT_APP_API_URL}` + `/acuity/locations`)
        .then(response => response.json())
        .then(json => {
          /* Set certificates */
          setLocations(json)
          /* Disable loading */
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

    getLocations()
  }, [toast])

  const getAvailableDates = (locationId: string) => {
    const appointmentId = '5780353'
    fetch(`${process.env.REACT_APP_API_URL}` + `/acuity/availability/dates/` + appointmentId + `/2022-05/` + locationId)
      .then(response => response.json())
      .then(json => {
        setDates(json)
        console.log(json)
      })
  }

  return (
    <>
      <Stack spacing={5}>
        <Stack spacing="2">
          <Stack
            spacing="4"
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align={{ base: 'start', md: 'center' }}
          >
            <PageHeader title={'Neuer Termin'} subtitle={''} />
          </Stack>
          <Divider />
          <RadioCardGroup defaultValue="one" spacing="3" onChange={e => getAvailableDates(e)}>
            {locations.map(location => (
              <RadioCard key={location.id} value={location.id.toString()}>
                <Body noMargin variant="highlight" color="primary.500">
                  {location.name}
                </Body>
                <Body noMargin color="gray.600">
                  {location.location}
                </Body>
              </RadioCard>
            ))}
          </RadioCardGroup>
        </Stack>
        <PageHeader title={'Datum auswählen'} subtitle={''} />
        <Wrap>
          {dates && dates.length > 0 ? (
            dates.map(date => (
              <Body noMargin variant="highlight" color="primary.500">
                {format(new Date(date.date), 'EE dd.MM.yy', { locale: deAT })}
              </Body>
            ))
          ) : (
            <Body>Bitte Ort auswählen</Body>
          )}
        </Wrap>
        <PageHeader title={'Zeit auswählen'} subtitle={''} />
      </Stack>
    </>
  )
}

export default withAuthenticationRequired(AppointmentCreateView, {
  onRedirecting: () => <Loading />,
})
