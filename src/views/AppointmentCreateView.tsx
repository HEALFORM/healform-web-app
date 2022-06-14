import { withAuthenticationRequired } from '@auth0/auth0-react'
import { chakra, useRadio, useRadioGroup } from '@chakra-ui/react'
import {
  Stack,
  Body,
  useToast,
  Box,
  Headline,
  Fade,
  useColorModeValue,
  Wrap,
  Divider,
  BodyLarge,
  HStack,
} from '@healform/liquid'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { Props, useDayzed } from 'dayzed'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'

import { Calendar } from '../components/Calendar'
import Error from '../components/Error'
import Loading from '../components/Loading'
import { PageHeader } from '../components/PageHeader'
import { RadioCard, RadioCardGroup } from '../components/RadioCardGroup'
import { Location } from '../interfaces/Location'

const AppointmentCreateView: React.FC = () => {
  /* Available & selected location */
  const [availableLocations, setAvailableLocations] = useState<Location[]>([])
  const [selectedLocation, setSelectedLocation] = useState<any>()
  const [selectedLocationName, setSelectedLocationName] = useState<any>()
  /* Available dates & selected date */
  const [availableDates, setAvailableDates] = useState<any[]>([])
  const [selectedDate, setSelectedDate] = useState<any>(Date.now())
  /* Available timeslots & selected timeslot */
  const [availableTimeslots, setAvailableTimeslots] = useState<any[]>([])
  const [selectedTimeslot, setSelectedTimeslot] = useState<any>()
  /* Component states */
  const [isLocationsLoading, setLocationsLoading] = useState(true)
  const [isTimeslotsLoading, setTimeslotsLoading] = useState(false)
  const [isError, setError] = useState(false)
  const toast = useToast()

  useEffect(() => {
    getAvailableLocations()
  }, [toast])

  const getAvailableLocations = () => {
    fetch(`${process.env.REACT_APP_API_URL}` + `/acuity/locations`)
      .then(response => response.json())
      .then(json => {
        setAvailableLocations(json)
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
        } else {
          setLocationsLoading(false)
          setError(true)
          const id = 'errorUnknown'
          if (!toast.isActive(id)) {
            toast({
              title: 'Ein unbekannter Fehler ist aufgetreten.',
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

  const getAvailableTimeslots = (locationId: string, date: number | Date) => {
    setTimeslotsLoading(true)
    const appointmentId = '5780353'
    const appointmentDate = formatDate(date)
    const appointmentLocation = locationId
    fetch(
      `${process.env.REACT_APP_API_URL}` +
        `/acuity/availability/times/` +
        appointmentId +
        `/` +
        appointmentDate +
        `/` +
        appointmentLocation,
    )
      .then(response => response.json())
      .then(json => {
        setAvailableTimeslots(json)
        setTimeslotsLoading(false)
      })
  }

  const formatDate = (date: number | Date) => {
    return format(date, 'yyyy-MM-dd')
  }

  const _handleOnLocationSelected = (selectedLocation: string) => {
    setSelectedTimeslot(null)
    setSelectedLocation(selectedLocation)
    getAvailableTimeslots(selectedLocation, selectedDate)
  }

  // @ts-ignore
  const _handleOnDateSelected = ({ date }) => {
    setSelectedDate(date)
    getAvailableTimeslots(selectedLocation, date)
  }

  const _handleOnTimeslotSelected = (selectedTimeslot: string) => {
    setSelectedTimeslot(selectedTimeslot)
  }

  const { getRadioProps, getRootProps } = useRadioGroup({
    onChange: _handleOnTimeslotSelected,
  })

  function getLocationName(id: number) {
    const result = _.find(availableLocations, ['id', id])
    console.log(result)
  }

  function Timeslot(props: { timeslot: string }) {
    const { timeslot, ...radioProps } = props
    const { state, getInputProps, getCheckboxProps, htmlProps, getLabelProps } = useRadio(radioProps)

    return (
      <chakra.label {...htmlProps} cursor="pointer">
        <input {...getInputProps({})} hidden />
        <Box
          px={3}
          py={1}
          borderRadius="sm"
          borderWidth="1px"
          borderColor={state.isChecked ? 'primary.500' : useColorModeValue('gray.200', 'gray.800')}
          _hover={{ borderColor: state.isChecked ? 'primary.500' : 'gray.400', cursor: 'pointer' }}
          textAlign="center"
          {...getCheckboxProps()}
        >
          <Body noMargin variant="highlight" {...getLabelProps()}>
            {format(new Date(timeslot), 'HH:mm', { locale: de })}
          </Body>
        </Box>
      </chakra.label>
    )
  }

  if (isError) {
    return <Error />
  } else {
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
            {isLocationsLoading ? (
              <Loading />
            ) : (
              <>
                <Fade in={!isLocationsLoading}>
                  <Headline size="four" as="h2">
                    1. Cryocenter auswählen
                  </Headline>
                  <RadioCardGroup
                    defaultValue="one"
                    spacing="2"
                    onChange={location => _handleOnLocationSelected(location)}
                  >
                    {availableLocations.map(location => (
                      <RadioCard key={location.id} value={location.id.toString()}>
                        <Body noMargin variant="highlight">
                          {location.name}
                        </Body>
                        <Body noMargin color="gray.600" size="two">
                          {location.location}
                        </Body>
                      </RadioCard>
                    ))}
                  </RadioCardGroup>
                </Fade>
              </>
            )}
          </Stack>
          <Fade in={selectedLocation}>
            {selectedLocation && (
              <Stack spacing="3">
                <Headline noMargin size="four" as="h3">
                  2. Datum auswählen
                </Headline>
                <HStack justify="flex-start" flexDirection={['column', 'row']} spacing="4" alignItems="start">
                  <Box maxW={['100%', '50%']}>
                    <Datepicker
                      selected={selectedDate}
                      onDateSelected={_handleOnDateSelected}
                      firstDayOfWeek={1}
                      minDate={new Date(new Date().setDate(new Date().getDate() - 1))}
                    />
                  </Box>
                  <Box maxW={['100%', '50%']}>
                    <BodyLarge variant="highlight">{format(selectedDate, 'EEEE, dd. LLLL', { locale: de })}</BodyLarge>
                    {isTimeslotsLoading ? (
                      <Loading />
                    ) : (
                      <Wrap spacing={2} justifyContent="space-between" {...getRootProps()}>
                        {availableTimeslots && availableTimeslots.length > 0 ? (
                          availableTimeslots.map(timeslot => (
                            <>
                              <Timeslot
                                key={timeslot.time}
                                timeslot={timeslot.time}
                                {...getRadioProps({ value: timeslot.time })}
                              />
                            </>
                          ))
                        ) : (
                          <Body>Für diesen Tag sind keine Termine verfügbar.</Body>
                        )}
                      </Wrap>
                    )}
                  </Box>
                </HStack>
              </Stack>
            )}
          </Fade>
          <Fade in={selectedTimeslot}>
            {selectedTimeslot && (
              <Stack spacing="3">
                <Headline noMargin size="four" as="h3">
                  3. Termin bestätigen
                </Headline>
                <Body>Cryocenter: {selectedLocationName}</Body>
                <Body>Uhrzeit: {selectedTimeslot}</Body>
              </Stack>
            )}
          </Fade>
        </Stack>
      </>
    )
  }
}

function Datepicker(props: Omit<Props, 'children' | 'render'>) {
  const dayzedData = useDayzed(props)
  return <Calendar {...dayzedData} />
}

export default withAuthenticationRequired(AppointmentCreateView, {
  onRedirecting: () => <Loading />,
})
