import React, { useEffect, useState } from 'react'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import Loading from '../components/Loading'
import axios from 'axios'
import { Appointment } from '../interfaces/Appointment'
import {
  Stack,
  HStack,
  SimpleGrid,
  Text,
  Box,
  Body,
  Skeleton,
  Button,
  Heading,
  Icon,
  FeatureCard,
  Center,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@healform/liquid'
import { FiPlus, FiMapPin, FiClock } from 'react-icons/fi'
import { StackDivider } from '@chakra-ui/react'
import { PageHeader } from '../components/PageHeader'
import ReactTimeAgo from 'react-time-ago'
import { NavLink } from 'react-router-dom'

const DashboardView: React.FC = () => {
  const { user } = useAuth0()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [nextAppointment, setNextAppointment] = useState<Appointment>()
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const getAppointmentByUser = (user: string | undefined) => {
      axios
        .get(`${process.env.REACT_APP_API_URL}` + `/acuity/` + user + `/appointments`)
        .then(res => {
          setAppointments(res.data)
          setLoading(false)
        })
        .catch(err => console.log(err))
    }

    const getNextAppointmentByUser = (user: string | undefined) => {
      axios
        .get(`${process.env.REACT_APP_API_URL}` + `/acuity/` + user + `/appointments/next`)
        .then(res => {
          console.log(res.data)
          setNextAppointment(res.data)
          setLoading(false)
        })
        .catch(err => console.log(err))
    }

    getAppointmentByUser(user?.email)
    getNextAppointmentByUser(user?.email)
  }, [])

  const AppointmentList = () => {
    if (!appointments || appointments.length === 0) return <>nichts da</>

    return (
      <Box bg={'white'} borderWidth={'1px'} borderRadius={'sm'}>
        <Stack spacing="3" divider={<StackDivider />}>
          {appointments.map(appointment => (
            <Box key={appointment.id} px={3}>
              {appointment.date}
              <Body noMargin size={'two'} variant={'subtle'}>
                {appointment.location}
              </Body>
            </Box>
          ))}
        </Stack>
      </Box>
    )
  }

  const NextAppointmentCard = () => {
    if (!nextAppointment)
      return (
        <>
          <FeatureCard variant={'neutral'}>
            <Stack>
              <Heading fontSize={32}>Du hast noch keinen Termin gebucht.</Heading>
            </Stack>
          </FeatureCard>
        </>
      )

    return (
      <>
        <FeatureCard variant={'neutral'}>
          <Stack spacing={3} fontFamily={'Space Grotesk'}>
            <HStack>
              <Text>Nächster Termin:</Text>
            </HStack>
            <Text fontSize={36}>
              <ReactTimeAgo date={Date.parse(nextAppointment.datetime)} locale="de-DE" />
            </Text>
            <Stack spacing={1} color={'gray.500'}>
              <HStack>
                <Icon as={FiMapPin} />
                <Body>{nextAppointment?.location}</Body>
              </HStack>
              <HStack>
                <Icon as={FiClock} />
                <Body>
                  Am {nextAppointment?.date} um {nextAppointment?.time} Uhr
                </Body>
              </HStack>
            </Stack>
          </Stack>
        </FeatureCard>
      </>
    )
  }

  if (isLoading) {
    return <Loading />
  } else {
    return (
      <Stack spacing={{ base: '5', lg: '5' }}>
        <Stack
          spacing="4"
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'start', lg: 'center' }}
        >
          <Stack spacing="1">
            <PageHeader title={'Start'} subtitle={` Hi, ${user?.name} 👋`} />
          </Stack>
          <HStack spacing={{ base: 0, lg: 3 }}>
            <Button colorScheme={'gray'} leftIcon={<FiPlus fontSize="1.25rem" />}>
              Neuer Termin
            </Button>
          </HStack>
        </Stack>
        <Stack spacing={{ base: '5', lg: '6' }}>
          <SimpleGrid columns={{ base: 1, md: 1 }} gap="6" mb={5}>
            <Skeleton isLoaded={!isLoading} borderRadius={'xl'}>
              <NextAppointmentCard />
            </Skeleton>
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
        <Tabs variant={'soft-rounded'} colorScheme={'blue'}>
          <TabList>
            <Tab>Zukünftige Termine</Tab>
            <Tab>Vergangene Termine</Tab>
          </TabList>
          <TabPanels>
            <TabPanel px={0}>
              <AppointmentList />
            </TabPanel>
            <TabPanel px={0}>
              <AppointmentList />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Center>
          <Button>Weitere Termine laden</Button>
        </Center>
      </Stack>
    )
  }
}

export default withAuthenticationRequired(DashboardView, {
  onRedirecting: () => <Loading />,
})
