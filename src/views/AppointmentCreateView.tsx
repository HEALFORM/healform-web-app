import React from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import Loading from '../components/Loading'
import { Stack, Divider, Text, HStack, Tooltip } from '@healform/liquid'
import { PageHeader } from '../components/PageHeader'
import { RadioCard, RadioCardGroup } from '../components/RadioCardGroup'
import { IconButton } from '@chakra-ui/react'
import { FiRefreshCw, FiShoppingCart } from 'react-icons/fi'

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

const AppointmentCreateView: React.FC = () => {
  return (
    <>
      <Stack spacing={5}>
        <Stack spacing="2">
          <Stack
            spacing="4"
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align={{ base: 'start', md: 'center' }}
          >
            <PageHeader title={'Neuer Termin'} subtitle={'Tell others who you are'} />
            <HStack spacing="3"></HStack>
          </Stack>
          <Divider />
          <RadioCardGroup defaultValue="one" spacing="3">
            {locations.map(location => (
              <RadioCard key={location.id} value={location.acuityId}>
                <Text color="primary.500" fontWeight="medium" fontSize="sm">
                  {location.name}
                </Text>
                <Text color="gray.600" fontSize="sm">
                  Jelly biscuit muffin icing dessert powder macaroon.
                </Text>
              </RadioCard>
            ))}
          </RadioCardGroup>
        </Stack>
      </Stack>
    </>
  )
}

export default withAuthenticationRequired(AppointmentCreateView, {
  onRedirecting: () => <Loading />,
})
