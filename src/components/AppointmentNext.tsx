import { Body, FeatureCard, Heading, HStack, Icon, Stack, Headline } from '@healform/liquid'
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
        <Stack spacing={2}>
          <HStack>
            <Body noMargin>Nächster Termin:</Body>
          </HStack>
          <Headline color={'blue.500'}>
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
      </FeatureCard>
    </>
  )
}

export default AppointmentNext
