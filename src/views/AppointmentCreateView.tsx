import React, { useEffect, useState } from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import Loading from '../components/Loading'
import { Stack, Divider, Body, useToast, Box, BodyLarge, Headline } from '@healform/liquid'
import { PageHeader } from '../components/PageHeader'
import { RadioCard, RadioCardGroup } from '../components/RadioCardGroup'
import { Location } from '../interfaces/Location'
import { Badge, Wrap } from '@chakra-ui/react'
import { format, add } from 'date-fns'
import { de, deAT } from 'date-fns/locale'
import { SingleDatepicker } from 'chakra-dayzed-datepicker'

const AppointmentCreateView: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([])
  const [dates, setDates] = useState<any[]>([])
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)
  const [date, setDate] = useState(Date.now())
  const toast = useToast()

  useEffect(() => {
    console.log(format(date, 'yyyy-MM'));
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
    const appointmentMonth = format(date, 'yyyy-MM')
    fetch(`${process.env.REACT_APP_API_URL}` + `/acuity/availability/dates/` + appointmentId + `/` + appointmentMonth + `/` + locationId)
      .then(response => response.json())
      .then(json => {
        if (json.length < 5 ) {
          fetch(`${process.env.REACT_APP_API_URL}` + `/acuity/availability/dates/` + appointmentId + `/` + add(new Date(appointmentMonth), { months: 1 }) + `/` + locationId)
            .then(response => response.json())
            .then(json => {
              console.log(json)
            })
        } else {
          setDates(json)
          console.log(json)
        }
      })
  }

  return (
    <>
      <Stack spacing={5}>
        <Stack spacing="3">
          <Stack
            spacing="4"
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align={{ base: 'start', md: 'center' }}
          >
            <PageHeader title={'Neuer Termin'} subtitle={''} />
          </Stack>
          <Headline size="three">Ort auswählen</Headline>
          <RadioCardGroup defaultValue="one" spacing="3" onChange={e => getAvailableDates(e)}>
            {locations.map(location => (
              <RadioCard key={location.id} value={location.id.toString()}>
                <Body noMargin variant="highlight">
                  {location.name}
                </Body>
                <Body noMargin color="gray.600">
                  {location.location}
                </Body>
              </RadioCard>
            ))}
          </RadioCardGroup>
        </Stack>
        <Stack spacing="3">
          <Headline noMargin size="three">Freie Termine im {format(date, 'MMMM', { locale: de })}</Headline>
          <Wrap justify="space-between">
            {dates && dates.length > 0 ? (
              dates.map(date => (
                <>
                  <Stack textAlign="center" spacing={4}>
                    <Stack spacing={0}>
                      <BodyLarge noMargin variant="highlight">
                        {format(new Date(date.date), 'EEEE', {locale: deAT})}
                      </BodyLarge>
                      <Body>
                        {format(new Date(date.date), 'dd.MM.yy', {locale: deAT})}
                      </Body>
                    </Stack>
                  </Stack>
                </>
              ))
            ) : (
              <Body>Bitte Ort auswählen</Body>
            )}
          </Wrap>
        </Stack>
        <Stack spacing="3">
          <Headline noMargin size="three">Zeit auswählen</Headline>
        </Stack>
      </Stack>
    </>
  )
}

export default withAuthenticationRequired(AppointmentCreateView, {
  onRedirecting: () => <Loading />,
})
