import { withAuthenticationRequired } from '@auth0/auth0-react'
import { Stack, Body, useToast, Box, Headline, Fade, useColorModeValue, Button, Wrap, Divider } from '@healform/liquid'
import { format } from 'date-fns'
import { de, deAT } from 'date-fns/locale'
import React, { useEffect, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import Loading from '../components/Loading'
import { PageHeader } from '../components/PageHeader'
import { RadioCard, RadioCardGroup } from '../components/RadioCardGroup'
import { Location } from '../interfaces/Location'

const AppointmentCreateView: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<any>()
  const [locations, setLocations] = useState<Location[]>([])
  const [dates, setDates] = useState<any[]>([])
  const [isLocationsLoading, setLocationsLoading] = useState(true)
  const [isTimeslotsLoading, setTimeslotsLoading] = useState(false)
  const [isError, setError] = useState(false)
  const [date, setDate] = useState(Date.now())
  const toast = useToast()

  useEffect(() => {
    console.log(format(date, 'yyyy-MM'))
    const getLocations = () => {
      fetch(`${process.env.REACT_APP_API_URL}` + `/acuity/locations`)
        .then(response => response.json())
        .then(json => {
          /* Set certificates */
          setLocations(json)
          /* Disable loading */
          setLocationsLoading(false)
        })
        .catch(err => {
          if (err.response) {
            setLocationsLoading(false)
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
            setLocationsLoading(false)
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
    setSelectedLocation(locationId)
    setTimeslotsLoading(true)
    const appointmentId = '5780353'
    const appointmentMonth = format(date, 'yyyy-MM')
    fetch(
      `${process.env.REACT_APP_API_URL}` +
        `/acuity/availability/dates/` +
        appointmentId +
        `/` +
        appointmentMonth +
        `/` +
        locationId,
    )
      .then(response => response.json())
      .then(json => {
        json.length = 5
        setDates(json)
        setTimeslotsLoading(false)
      })
  }

  return (
    <>
      <Stack spacing={6}>
        <Stack spacing="3">
          <PageHeader
            title={'Neuer Termin'}
            subtitle={
              'Wähle zuerst den Ort und im nächsten Schritt einen passenden Termin aus. Bezahlen kannst du mit deiner 10er-, 50er- oder 100er-Karte. Natürlich auch mit PayPal, Gutschein und Kreditkarte.'
            }
          />
          <Divider />
          <Headline size="four">1. Cryocenter auswählen</Headline>
          {isLocationsLoading ? (
            <Loading />
          ) : (
            <Fade in={!isLocationsLoading}>
              <RadioCardGroup defaultValue="one" spacing="2" onChange={e => getAvailableDates(e)}>
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
            </Fade>
          )}
        </Stack>
        <Fade in={selectedLocation}>
          {selectedLocation && (
            <Stack spacing="3">
              <Headline noMargin size="four">
                2. Datum auswählen.
              </Headline>
              <Wrap justify="space-between">
                <Button leftIcon={<FiChevronLeft />} variant="link" size="sm">
                  Früher
                </Button>
                <Button rightIcon={<FiChevronRight />} variant="link" size="sm">
                  Weitere Termine
                </Button>
              </Wrap>
              {isTimeslotsLoading ? (
                <Loading />
              ) : (
                <Wrap justify="space-between">
                  {dates && dates.length > 0 ? (
                    dates.map(date => (
                      <>
                        <Stack textAlign="center" spacing={4} flex="auto">
                          <Stack spacing={0}>
                            <Box
                              px={3}
                              py={1}
                              borderRadius="sm"
                              borderWidth="1px"
                              borderColor={useColorModeValue('gray.200', 'gray.800')}
                              transition="all .2s"
                              _hover={{ borderColor: 'gray.300', cursor: 'pointer' }}
                            >
                              <Body noMargin variant="highlight">
                                {format(new Date(date.date), 'EEEE', { locale: deAT })}
                              </Body>
                              <Body noMargin>{format(new Date(date.date), 'dd.MM.yy', { locale: deAT })}</Body>
                            </Box>
                          </Stack>
                        </Stack>
                      </>
                    ))
                  ) : (
                    <Body>Bitte Ort auswählen</Body>
                  )}
                </Wrap>
              )}
            </Stack>
          )}
        </Fade>
      </Stack>
    </>
  )
}

export default withAuthenticationRequired(AppointmentCreateView, {
  onRedirecting: () => <Loading />,
})
