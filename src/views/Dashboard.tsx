// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import AppointmentList from '../components/AppointmentList'
import AppointmentNext from '../components/AppointmentNext'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { Appointment } from '../interfaces/Appointment'
import {
  Stack,
  SimpleGrid,
  Button,
  Center,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useToast,
  useColorModeValue,
} from '@healform/liquid'
import { FiPlus } from 'react-icons/fi'
import { PageHeader } from '../components/PageHeader'
import moment from 'moment'
import _ from 'lodash'

const DashboardView: React.FC = () => {
  const { user } = useAuth0()
  const [futureAppointments, setFutureAppointments] = useState<Appointment[]>([])
  const [pastAppointments, setPastAppointments] = useState<Appointment[]>([])
  const [nextAppointment, setNextAppointment] = useState<Appointment>()
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)
  const toast = useToast()

  useEffect(() => {
    const getAppointmentByUser = (user: string | undefined) => {
      fetch(`${process.env.REACT_APP_API_URL}` + `/acuity/` + user + `/appointments`)
        .then(response => response.json())
        .then(json => {
          /* Set future appointments */
          let futureAppointments = json.filter((x: { datetime: string }) => Date.parse(x.datetime) > new Date())
          futureAppointments = _.sortBy(futureAppointments, function (o) {
            return new moment(o.datetime)
          })
          setFutureAppointments(futureAppointments)

          /* Set past appointments */
          let pastAppointments = json.filter((x: { datetime: string }) => Date.parse(x.datetime) < new Date())
          pastAppointments = _.sortBy(pastAppointments, function (o) {
            return new moment(o.datetime)
          })
          setPastAppointments(pastAppointments)

          /* Set next appointment */
          let nextAppointment = json.filter((x: { datetime: string }) => Date.parse(x.datetime) > new Date())
          nextAppointment = _.sortBy(nextAppointment, function (o) {
            return new moment(o.datetime)
          })
          setNextAppointment(nextAppointment[0])

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

    getAppointmentByUser(user?.email)
  }, [toast, user?.email])

  if (isLoading) {
    return <Loading />
  } else {
    if (isError) {
      return <Error />
    } else {
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
                <PageHeader title={'Start'} subtitle={`Guten Tag, ${user?.name} 👋`} />
                <Button leftIcon={<FiPlus fontSize="1.25rem" />}>Neuer Termin</Button>
              </Stack>
              <Stack spacing={{ base: '5', lg: '6' }}>
                <SimpleGrid columns={{ base: 1, md: 1 }} gap="6" mb={5}>
                  <AppointmentNext nextAppointment={nextAppointment} />
                </SimpleGrid>
              </Stack>
            </Stack>
            <Stack spacing="2">
              <Stack spacing="1">
                <PageHeader
                  title={'Deine Termine'}
                  subtitle={'Überblick deiner zukünftigen und vergangenen Termine.'}
                />
              </Stack>
              <Tabs variant={'unstyled'} colorScheme={'blue'}>
                <TabList>
                  <Tab
                    color={useColorModeValue('gray.800', 'gray.600')}
                    fontWeight="medium"
                    borderRadius="xl"
                    _selected={{
                      color: 'primary.500',
                      bg: useColorModeValue('primary.100', 'whiteAlpha.100'),
                    }}
                    _focus={{
                      boxShadow: 'none',
                    }}
                  >
                    Zukünftige Termine
                  </Tab>
                  <Tab
                    color={useColorModeValue('gray.800', 'gray.600')}
                    fontWeight="medium"
                    borderRadius="xl"
                    _selected={{
                      color: 'primary.500',
                      bg: useColorModeValue('primary.100', 'whiteAlpha.100'),
                    }}
                    _focus={{
                      boxShadow: 'none',
                    }}
                  >
                    Vergangene Termine
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel px={0}>
                    <AppointmentList appointments={futureAppointments} />
                  </TabPanel>
                  <TabPanel px={0}>
                    <AppointmentList appointments={pastAppointments} />
                  </TabPanel>
                </TabPanels>
              </Tabs>
              <Center>
                <Button>Weitere Termine laden</Button>
              </Center>
            </Stack>
          </Stack>
        </>
      )
    }
  }
}

export default withAuthenticationRequired(DashboardView, {
  onRedirecting: () => <Loading />,
})
