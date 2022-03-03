import React, { useEffect, useState } from 'react'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import Loading from '../components/Loading'
import axios from 'axios'
import { Appointment } from '../interfaces/Appointment'
import {
  Stack,
  HStack,
  SimpleGrid,
  Headline,
  Tooltip,
  Text,
  Box,
  Title,
  Body,
  Skeleton,
  SkeletonText,
  Button,
  Heading, Divider,
} from '@healform/liquid'
import { FiCalendar } from 'react-icons/fi'
import { Card } from '../components/Card'
import { StackDivider } from '@chakra-ui/react'
import {PageHeader} from "../components/PageHeader";

const DashboardView: React.FC = () => {
  const { user } = useAuth0()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getAppointmentByUser(user?.email)
  }, [])

  const getAppointmentByUser = (user: string | undefined) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}` + `/acuity/` + user + `/appointments`)
      .then(res => {
        setAppointments(res.data)
        setLoading(false)
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

  const NextAppointmentCard = () => {
    return (
      <>
        <Card p={5} bg={'blue.500'} color={'white'}>
          <Headline size={'four'}>Dein nächster Termin:</Headline>
          <Heading fontSize={40}>{appointments[0]?.date}</Heading>
          <Heading fontSize={40}>{appointments[0]?.time} Uhr</Heading>
        </Card>
      </>
    )
  }

  return (
    <Stack spacing={{ base: '5', lg: '5' }}>
      <Stack
        spacing="4"
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align={{ base: 'start', lg: 'center' }}
      >
        <Stack spacing="1">
          <PageHeader title={'Dashboard'} subtitle={` Hi, ${user?.name} 👋`} />
        </Stack>
        <HStack spacing={{ base: 0, lg: 3 }}>
          <Button variant={'solid'} colorScheme={'blue'} leftIcon={<FiCalendar fontSize="1.25rem" />}>
            Neuer Termin
          </Button>
        </HStack>
      </Stack>
      <Divider />
      <Stack spacing={{ base: '5', lg: '6' }}>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
          <Skeleton isLoaded={!isLoading} borderRadius={'xl'}>
            <NextAppointmentCard />
          </Skeleton>
          <Skeleton isLoaded={!isLoading} borderRadius={'xl'}>
            <Card />
          </Skeleton>
        </SimpleGrid>
      </Stack>
      <Divider />
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
      <SkeletonText isLoaded={!isLoading} mt="2" noOfLines={5} spacing="4" skeletonHeight={8}>
        <AppointmentList />
      </SkeletonText>
    </Stack>
  )
}

export default withAuthenticationRequired(DashboardView, {
  onRedirecting: () => <Loading />,
})
