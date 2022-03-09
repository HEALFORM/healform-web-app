import { Body, Box, Stack, useColorModeValue } from '@healform/liquid'
import { StackDivider } from '@chakra-ui/react'
import React from 'react'

const AppointmentList = (props: { appointments: any }) => {
  const { appointments } = props
  if (!appointments || appointments.length === 0) return <>nichts da</>

  return (
    <Box bg={useColorModeValue('white', 'black')} borderWidth={'1px'} borderRadius={'sm'}>
      <Stack spacing="3" divider={<StackDivider />} py={3}>
        {appointments.map((appointment: { id: string; date: string; time: string; location: string }) => (
          <Box key={appointment.id} px={3}>
            {appointment.date} • {appointment.time}
            <Body noMargin size={'two'} variant={'subtle'}>
              {appointment.location}
            </Body>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}

export default AppointmentList
