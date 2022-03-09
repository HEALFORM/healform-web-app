import React from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import Loading from '../components/Loading'
import { Stack, Divider, Text, HStack, Box, Container } from '@healform/liquid'
import { PageHeader } from '../components/PageHeader'
import { RadioCard, RadioCardGroup } from '../components/RadioCardGroup'

const locations = [
  {
    id: 1,
    name: 'Kassel',
    description: '',
    address: '',
    acuityId: '',
  },
  {
    id: 2,
    name: 'Baunatal',
    description: '',
    address: '',
    acuityId: '',
  },
  {
    id: 3,
    name: 'Warburg',
    description: '',
    address: '',
    acuityId: '',
  },
]

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
        <RadioCardGroup defaultValue="one" spacing="3">
          {locations.map(location => (
            <RadioCard key={location.id} value={location.acuityId}>
              <Text color="blue.500" fontWeight="medium" fontSize="sm">
                {location.name}
              </Text>
              <Text color="gray.600" fontSize="sm">
                Jelly biscuit muffin icing dessert powder macaroon.
              </Text>
            </RadioCard>
          ))}
        </RadioCardGroup>
      </Stack>
    </>
  )
}

export default withAuthenticationRequired(ScheduleView, {
  onRedirecting: () => <Loading />,
})
