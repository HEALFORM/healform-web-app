import React from 'react'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import Loading from '../components/Loading'
import { Stack, Box, Divider, Text, HStack } from '@healform/liquid'
import { PageHeader } from '../components/PageHeader'

const ScheduleView: React.FC = () => {
  return (
    <>
      <Stack spacing="5">
        <Stack
          spacing="4"
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'start', lg: 'center' }}
        >
          <Stack spacing="1">
            <PageHeader title={'Neuer Termin'} subtitle={'Tell others who you are'} />
          </Stack>
          <HStack spacing="3">
            <Text>hi</Text>
          </HStack>
        </Stack>
        <Divider />
      </Stack>
    </>
  )
}

export default withAuthenticationRequired(ScheduleView, {
  onRedirecting: () => <Loading />,
})
