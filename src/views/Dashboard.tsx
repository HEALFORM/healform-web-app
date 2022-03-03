import React, { useEffect, useState } from 'react'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import Loading from '../components/Loading'
import axios from 'axios'
import { Appointment } from '../interfaces/Appointment'
import {
  Stack,
  Button,
  HStack,
  SimpleGrid,
  Headline,
  BodyLarge,
  Tooltip,
  FeatureCard,
  Text,
  Box,
  Title,
  Body,
} from '@healform/liquid'
import { FiCalendar, FiMoreHorizontal } from 'react-icons/fi'
import { Card } from '../components/Card'
import { StackDivider } from '@chakra-ui/react'

const DashboardView: React.FC = () => {
  const { user } = useAuth0()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getAppointmentByUser(user?.email)
  }, [])

  const getAppointmentByUser = (user: string | undefined) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}` + `/api/user/` + user + `/appointments`)
      .then(res => {
        setAppointments(res.data)
        setLoading(false)
        console.log(res.data)
      })
      .catch(err => console.log(err))
  }

  const AppointmentList = () => {
    return (
      <Stack spacing="3" divider={<StackDivider />}>
        {appointments.map(appointment => (
          <Box key={appointment.id}>
            {appointment.date}
            <Body noMargin size={'two'} variant={'subtle'}>
              {appointment.location}
            </Body>
          </Box>
        ))}
      </Stack>
    )
  }

  if (isLoading) {
    return <Loading />
  } else {
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
              <Box>
                <Text fontSize="lg" fontWeight="medium">
                  Dashboard
                </Text>
                <Text color="gray.500" fontSize="sm">
                  Hi, {user?.name} 👋
                </Text>
              </Box>
            </Stack>
            <HStack spacing={{ base: 0, lg: 3 }}>
              <Button display={{ base: 'none', lg: 'flex' }} variant={'ghost'} colorScheme={'blue'}>
                <FiMoreHorizontal />
              </Button>
              <Tooltip label={'Jetzt neuen HEALFORM Termin vereinbaren'}>
                <Button variant={'solid'} colorScheme={'blue'} leftIcon={<FiCalendar fontSize="1.25rem" />}>
                  Neuer Termin
                </Button>
              </Tooltip>
            </HStack>
          </Stack>
          <Stack spacing={{ base: '5', lg: '6' }}>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
              <Card p={5}>
                <Headline size={'four'}>Dein nächster Termin:</Headline>
                <Title size={'four'} noMargin>
                  10:15 Uhr
                </Title>
              </Card>
              <Card />
              <Card />
            </SimpleGrid>
          </Stack>
          <Stack spacing="1">
            <Box>
              <Text fontSize="lg" fontWeight="medium">
                Ihre Termine
              </Text>
              <Text color="gray.500" fontSize="sm">
                Tell others who you are
              </Text>
            </Box>
          </Stack>
          <AppointmentList />
        </Stack>
      </>
    )
  }
}

export default withAuthenticationRequired(DashboardView, {
  onRedirecting: () => <Loading />,
})
