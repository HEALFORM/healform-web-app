import { Body, Box, Heading, HStack, Icon, Stack, Headline, useColorModeValue } from '@healform/liquid'
import ReactTimeAgo from 'react-time-ago'
import { FiClock, FiMapPin } from 'react-icons/fi'
import React from 'react'

const AppointmentNext = (props: { nextAppointment: any }) => {
  const { nextAppointment } = props
  if (!nextAppointment)
    return (
      <>
        <Box bg={useColorModeValue('white', 'gray.900')} p={6} borderRadius="xl">
          <Stack>
            <Headline size="three" noMargin>Du hast noch keinen Termin gebucht.</Headline>
          </Stack>
        </Box>
      </>
    )

  return (
    <>
      <Box bg={useColorModeValue('white', 'black')}>
        <Stack spacing={2}>
          <HStack>
            <Body noMargin>Nächster Termin:</Body>
          </HStack>
          <Headline color={'primary.500'} as={'h2'}>
            <ReactTimeAgo date={Date.parse(nextAppointment.datetime)} locale="de-DE" />
          </Headline>
          <Stack spacing={1} color={'gray.500'}>
            <HStack>
              <Icon as={FiClock} />
              <Body>
                Am {nextAppointment?.date} um {nextAppointment?.time} Uhr
              </Body>
            </HStack>
            <HStack>
              <Icon as={FiMapPin} />
              <Body>{nextAppointment?.location}</Body>
            </HStack>
          </Stack>
        </Stack>
      </Box>
    </>
  )
}

export default AppointmentNext
