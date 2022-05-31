// @ts-nocheck
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
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
  Divider,
  Headline,
  Skeleton,
} from '@healform/liquid'
import _ from 'lodash'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'

import AppointmentList from '../components/Appointments/AppointmentList'
import AppointmentNext from '../components/Appointments/AppointmentNext'
import Error from '../components/Error'
import Loading from '../components/Loading'
import { PageHeader } from '../components/PageHeader'
import { Appointment } from '../interfaces/Appointment'

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

  return (
    <>
      <Stack spacing={6}>
        <Stack spacing="3">
          <Stack
            spacing="4"
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align={{ base: 'start', md: 'center' }}
          >
            <PageHeader title={'Dashboard'} subtitle={'Deine erworbenen 10er-, 50er- oder 100er-Karten'} />
            <Button
              colorScheme="primary"
              variant="solid"
              leftIcon={<FiPlus fontSize="1.25rem" />}
              display={{ base: 'none', lg: 'flex' }}
              size="sm"
            >
              Neuer Termin
            </Button>
          </Stack>
          <Divider />
          <Stack spacing={{ base: '5', lg: '6' }}>
            <SimpleGrid columns={{ base: 1, md: 1 }} gap="6">
              <Skeleton isLoaded={!isLoading}>
                <AppointmentNext nextAppointment={nextAppointment} />
              </Skeleton>
            </SimpleGrid>
          </Stack>
        </Stack>
        <Stack spacing="3">
          <Headline noMargin size="four">
            Deine Termine
          </Headline>
          <Skeleton isLoaded={!isLoading}>
            <Tabs variant={'unstyled'} colorScheme={'blue'}>
              <TabList>
                <Tab
                  color={useColorModeValue('gray.800', 'gray.600')}
                  fontWeight="medium"
                  fontFamily="heading"
                  borderRadius="xl"
                  fontSize={14}
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
                  fontFamily="heading"
                  borderRadius="xl"
                  fontSize={14}
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
                <TabPanel px={0} pt={2}>
                  <AppointmentList appointments={futureAppointments} />
                </TabPanel>
                <TabPanel px={0} pt={2}>
                  <AppointmentList appointments={pastAppointments} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Skeleton>
          <Center>
            <Button>Weitere Termine laden</Button>
          </Center>
        </Stack>
      </Stack>
    </>
  )
}

export default withAuthenticationRequired(DashboardView, {
  onRedirecting: () => <Loading />,
})
