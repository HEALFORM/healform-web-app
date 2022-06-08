// @ts-nocheck
import { withAuthenticationRequired } from '@auth0/auth0-react'
import {
  Stack,
  Body,
  useToast,
  Box,
  Headline,
  Fade,
  useColorModeValue,
  Button,
  Wrap,
  Divider,
  BodyLarge,
  HStack,
  IconButton,
  Center,
} from '@healform/liquid'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { Props, useDayzed } from 'dayzed'
import React, { useEffect, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import Loading from '../components/Loading'
import { PageHeader } from '../components/PageHeader'
import { RadioCard, RadioCardGroup } from '../components/RadioCardGroup'
import { Location } from '../interfaces/Location'

const AppointmentCreateView: React.FC = () => {
  /* Available & selected location */
  const [availableLocations, setAvailableLocations] = useState<Location[]>([])
  const [selectedLocation, setSelectedLocation] = useState<any>()
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
        console.log(err)
      })
  }

  const getAvailableTimeslots = (locationId: string, date?: number | Date) => {
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
    setSelectedLocation(selectedLocation)
    getAvailableTimeslots(selectedLocation, selectedDate)
  }

  const _handleOnDateSelected = ({ date }) => {
    setSelectedDate(date)
    getAvailableTimeslots(selectedLocation, date)
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
                      <Body noMargin color="gray.600">
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
              <Headline noMargin size="four">
                2. Datum auswählen
              </Headline>
              <HStack justify="flex-start" flexDirection="row" spacing="4" alignItems="start">
                <Box maxW="50%">
                  <Datepicker
                    selected={selectedDate}
                    onDateSelected={_handleOnDateSelected}
                    firstDayOfWeek={1}
                    minDate={new Date(new Date().setDate(new Date().getDate() - 1))}
                  />
                </Box>
                <Box maxW="50%">
                  <BodyLarge variant="highlight">{format(selectedDate, 'EEEE, dd. LLLL', { locale: de })}</BodyLarge>
                  {isTimeslotsLoading ? (
                    <Center>
                      <Loading />
                    </Center>
                  ) : (
                    <Wrap spacing={2}>
                      {availableTimeslots && availableTimeslots.length > 0 ? (
                        availableTimeslots.map(timeslot => (
                          <>
                            <Box
                              px={3}
                              py={1}
                              borderRadius="sm"
                              borderWidth="1px"
                              borderColor={useColorModeValue('gray.200', 'gray.800')}
                              transition="all .2s"
                              _hover={{ borderColor: 'gray.300', cursor: 'pointer' }}
                              textAlign="center"
                            >
                              <Body noMargin variant="highlight">
                                {format(new Date(timeslot.time), 'HH:mm', { locale: de })}
                              </Body>
                            </Box>
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
      </Stack>
    </>
  )
}

const monthNamesShort = [
  'Januar',
  'Februar',
  'März',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Dezember',
]
const weekdayNamesShort = ['Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.', 'So.']

function translateAria(direction: string, lang: string) {
  if (lang === 'en') {
    return `Go ${direction} 1 month`
  }
}

function Calendar({ calendars, getBackProps, getForwardProps, getDateProps }) {
  if (calendars.length) {
    return (
      <Box>
        {calendars.map(
          (calendar: {
            month: string | number
            year: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined
            weeks: Array<Array<{ date: any; selected: any; selectable: any; today: any }>>
          }) => (
            <>
              <Wrap justify="space-between" alignItems="center" mb={3}>
                <BodyLarge variant="highlight">
                  {monthNamesShort[calendar.month]} {calendar.year}
                </BodyLarge>
                <HStack>
                  <IconButton
                    aria-label="Vorheriger Monat"
                    size="xs"
                    icon={<FiChevronLeft />}
                    transitionDuration={'0ms'}
                    {...getBackProps({
                      calendars,
                      'aria-label': translateAria('backwards', 'en'),
                    })}
                  />
                  <IconButton
                    aria-label="Nächster Monat"
                    size="xs"
                    icon={<FiChevronRight />}
                    transitionDuration={'0ms'}
                    {...getForwardProps({
                      calendars,
                      'aria-label': translateAria('forwards', 'en'),
                    })}
                  />
                </HStack>
              </Wrap>
              <Box key={`${calendar.month}${calendar.year}`} w="full">
                {weekdayNamesShort.map(weekday => (
                  <Box
                    key={`${calendar.month}${calendar.year}${weekday}`}
                    w="calc(100% / 7)"
                    display="inline-block"
                    textAlign="center"
                  >
                    {weekday}
                  </Box>
                ))}
                {calendar.weeks.map(
                  (week: Array<{ date: any; selected: any; selectable: any; today: any }>, weekIndex: any) =>
                    week.map((dateObj: { date: any; selected: any; selectable: any; today: any }, index: any) => {
                      const key = `${calendar.month}${calendar.year}${weekIndex}${index}`
                      if (!dateObj) {
                        return (
                          <div
                            key={key}
                            style={{
                              display: 'inline-block',
                              width: 'calc(100% / 7)',
                              border: 'none',
                              background: 'transparent',
                            }}
                          />
                        )
                      }
                      const { date, selected, selectable, today } = dateObj
                      let background = today ? 'cornflowerblue' : ''
                      background = selected ? 'purple' : background
                      return (
                        <Button
                          size="sm"
                          transitionDuration={0}
                          variant="ghost"
                          style={{
                            display: 'inline-block',
                            width: 'calc(100% / 7)',
                            border: 'none',
                            background,
                          }}
                          key={key}
                          {...getDateProps({
                            dateObj,
                            'aria-label': 'Whatever you need here',
                          })}
                        >
                          {selectable ? date.getDate() : date.getDate()}
                        </Button>
                      )
                    }),
                )}
              </Box>
            </>
          ),
        )}
      </Box>
    )
  }
  return null
}

function Datepicker(props: Omit<Props, 'children' | 'render'>) {
  const dayzedData = useDayzed(props)
  return <Calendar {...dayzedData} />
}

export default withAuthenticationRequired(AppointmentCreateView, {
  onRedirecting: () => <Loading />,
})
