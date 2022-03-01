import React, { useEffect, useState } from 'react'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import Loading from '../components/Loading'
import axios from 'axios'
import { Appointment } from '../interfaces/Appointment'
import {
  Stack,
  Heading,
  Button,
  useBreakpointValue,
  HStack,
  SimpleGrid,
  Headline,
  Tooltip,
  FeatureCard,
  BodyLarge
} from '@healform/liquid'
import { FiCalendar, FiEdit, FiMoreHorizontal } from 'react-icons/fi'
import { Card } from '../components/Card'

const DashboardView: React.FC = () => {
  const { user, logout } = useAuth0()
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    getAppointmentByUser(user?.email)
  }, [])

  const getAppointmentByUser = (user: string | undefined) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}` + `/api/user/` + user + `/appointments`)
      .then(res => {
        setAppointments(res.data)
      })
      .catch(err => console.log(err))
  }

  // @ts-ignore
  return (
    <>
      <Stack spacing={{ base: '8', lg: '6' }}>
        <Stack
          spacing="4"
          direction={{ base: 'column', lg: 'row' }}
          justify="space-between"
          align={{ base: 'start', lg: 'center' }}
        >
          <Stack spacing="1">
            <Heading size={useBreakpointValue({ base: 'xs', lg: 'sm' })} fontWeight="medium">
              <Heading fontSize={50}>Dashboard</Heading>
              <ul>
                {appointments.map(appointment => (
                  <li key={appointment.id}>{appointment.datetime}</li>
                ))}
              </ul>
            </Heading>
          </Stack>
          <HStack spacing="3">
            <Tooltip label={'Jetzt neuen HEALFORM Termin vereinbaren'}>
              <Button variant={'ghost'} colorScheme={'blue'} leftIcon={<FiCalendar fontSize="1.25rem" />}>
                Neuer Termin
              </Button>
            </Tooltip>
            <Button variant={'ghost'} colorScheme={'blue'}>
              <FiMoreHorizontal />
            </Button>
          </HStack>
        </Stack>
        <Stack spacing={{ base: '5', lg: '6' }}>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
            <FeatureCard variant={'gradientMulti'}>
              <Headline as={'h3'} size={'two'}>
                Ihr nächster Termin:
              </Headline>
            </FeatureCard>
            <Card />
            <Card />
          </SimpleGrid>
        </Stack>
        <Card minH="sm" />
      </Stack>
    </>
  )
}

export default withAuthenticationRequired(DashboardView, {
  onRedirecting: () => <Loading />,
})
