import { Body, Box, Stack, useColorModeValue, Tooltip } from '@healform/liquid'
import { StackDivider, IconButton } from '@chakra-ui/react'
import React from 'react'
import { FiCalendar, FiEye, FiTrash } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import { Appointment } from '../../interfaces/Appointment'

const AppointmentList = (props: { appointments: Appointment[] }) => {
  const { appointments } = props
  if (!appointments || appointments.length === 0)
    return (
      <Box bg={useColorModeValue('white', 'black')} borderWidth={'1px'} borderRadius={'sm'}>
        <Stack spacing="3" divider={<StackDivider />} py={3}>
          <Box px={3}>
            <Body noMargin size={'two'} variant={'subtle'}>
              Es wurden keine Termine gefunden.
            </Body>
          </Box>
        </Stack>
      </Box>
    )

  return (
    <Box bg={useColorModeValue('white', 'black')} borderWidth={'1px'} borderRadius={'sm'}>
      <Stack spacing="3" divider={<StackDivider />} py={3}>
        {appointments.map(appointment => (
          <Stack key={appointment.id} justify="space-between" direction="row" spacing="4" px={3}>
            <Stack
              spacing="0.5"
              fontSize="sm"
              as={NavLink}
              to={'/termin/' + appointment.id}
              _hover={{
                cursor: 'pointer',
              }}
            >
              <Body noMargin size={'one'}>
                {appointment.date} • {appointment.time}
              </Body>
              <Body noMargin size={'two'} variant={'subtle'}>
                {appointment.location}
              </Body>
            </Stack>

            <Stack direction={{ base: 'column', sm: 'row' }} spacing={{ base: '0', sm: '1' }}>
              <Tooltip label={'Details ansehen'}>
                <IconButton
                  icon={<FiEye fontSize="1.25rem" />}
                  variant="ghost"
                  aria-label="Details ansehen"
                  as={NavLink}
                  to={'/termin/' + appointment.id}
                />
              </Tooltip>
              <Tooltip label={'Termin umbuchen'}>
                <IconButton
                  icon={<FiCalendar fontSize="1.25rem" />}
                  variant="ghost"
                  aria-label="Termin stornieren"
                  disabled={!appointment.canClientReschedule}
                />
              </Tooltip>
              <Tooltip label={'Termin stornieren'}>
                <IconButton
                  icon={<FiTrash fontSize="1.25rem" />}
                  colorScheme={'red'}
                  variant="ghost"
                  aria-label="Termin stornieren"
                  disabled={!appointment.canClientCancel}
                />
              </Tooltip>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Box>
  )
}

export default AppointmentList
