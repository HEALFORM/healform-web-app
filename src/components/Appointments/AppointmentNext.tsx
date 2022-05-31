import { Body, HStack, Icon, Stack, Headline } from '@healform/liquid'
import React from 'react'
import { FiClock, FiMapPin } from 'react-icons/fi'

const AppointmentNext = (props: { nextAppointment: any }) => {
  const { nextAppointment } = props
  if (!nextAppointment)
    return (
      <>
        <Stack spacing={2}>
          <Headline size="four" noMargin>
            Dein nächster Termin:
          </Headline>
          <Body>Du hast noch keinen Termin gebucht.</Body>
        </Stack>
      </>
    )

  return (
    <>
      <Stack spacing={2}>
        <Headline size="four" noMargin>
          Dein nächster Termin:
        </Headline>
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
    </>
  )
}

export default AppointmentNext
