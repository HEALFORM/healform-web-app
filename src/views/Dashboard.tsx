import React, { useEffect, useState } from 'react'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import AppointmentList from '../components/AppointmentList'
import AppointmentNext from '../components/AppointmentNext'
import Loading from '../components/Loading'
import Error from '../components/Error'
import axios from 'axios'
import { Appointment } from '../interfaces/Appointment'
import {
  Stack,
  HStack,
  SimpleGrid,
  Box,
  Button,
  Center,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useToast,
  Body,
  BodyLarge,
} from '@healform/liquid'
import { FiPlus } from 'react-icons/fi'
import { PageHeader } from '../components/PageHeader'

const DashboardView: React.FC = () => {
  const { user } = useAuth0()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [futureAppointments, setFutureAppointments] = useState<Appointment[]>([])
  const [pastAppointments, setPastAppointments] = useState<Appointment[]>([])
  const [nextAppointment, setNextAppointment] = useState<Appointment>()
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)
  const toast = useToast()

  useEffect(() => {
    const getAppointmentByUser = (user: string | undefined) => {
      axios
        .get(`${process.env.REACT_APP_API_URL}` + `/acuity/` + user + `/appointments`)
        .then(res => {
          setAppointments(res.data)
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
          } else {
            console.log('anything else')
          }
        })
    }

    const getNextAppointmentByUser = (user: string | undefined) => {
      axios
        .get(`${process.env.REACT_APP_API_URL}` + `/acuity/` + user + `/appointments/next`)
        .then(res => {
          setNextAppointment(res.data)
          setLoading(false)
        })
        .catch(err => console.log(err))
    }

    const getFutureAppointmentByUser = (user: string | undefined) => {
      axios
        .get(`${process.env.REACT_APP_API_URL}` + `/acuity/` + user + `/appointments/future`)
        .then(res => {
          setFutureAppointments(res.data)
          setLoading(false)
        })
        .catch(err => console.log(err))
    }

    const getPastAppointmentByUser = (user: string | undefined) => {
      axios
        .get(`${process.env.REACT_APP_API_URL}` + `/acuity/` + user + `/appointments/past`)
        .then(res => {
          setPastAppointments(res.data)
          setLoading(false)
        })
        .catch(err => console.log(err))
    }

    getAppointmentByUser(user?.email)
    getNextAppointmentByUser(user?.email)
    getFutureAppointmentByUser(user?.email)
    getPastAppointmentByUser(user?.email)
  }, [])

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
                <Button colorScheme={'gray'} leftIcon={<FiPlus fontSize="1.25rem" />}>
                  Neuer Termin
                </Button>
              </Stack>
              <Stack spacing={{ base: '5', lg: '6' }}>
                <SimpleGrid columns={{ base: 1, md: 1 }} gap="6" mb={5}>
                  <AppointmentNext nextAppointment={nextAppointment} />
                </SimpleGrid>
              </Stack>
            </Stack>
            <Stack spacing="2">
              <Stack spacing="1">
                <PageHeader title={'Ihre Termine'} subtitle={'Überblick deiner zukünftigen und vergangenen Termine.'} />
              </Stack>
              <Tabs variant={'soft-rounded'} colorScheme={'blue'}>
                <TabList>
                  <Tab>Zukünftige Termine</Tab>
                  <Tab>Vergangene Termine</Tab>
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
