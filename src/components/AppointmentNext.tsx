import { Body, FeatureCard, Heading, HStack, Icon, Stack, Text } from '@healform/liquid'
import ReactTimeAgo from 'react-time-ago'
import { FiClock, FiMapPin } from 'react-icons/fi'
import React from 'react'

const AppointmentNext = (props: { nextAppointment: any }) => {
  const { nextAppointment } = props
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

export default AppointmentNext
