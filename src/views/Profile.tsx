import React from 'react'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import Loading from '../components/Loading'
import {
  Stack,
  Button,
  Box,
  Divider,
  FormControl,
  Text,
  FormLabel,
  Input,
  Avatar,
  Textarea,
  Flex,
  HStack,
} from '@healform/liquid'
import { StackDivider, InputGroup, InputLeftAddon, FormHelperText } from '@chakra-ui/react'
import {PageHeader} from "../components/PageHeader";

const ProfileView: React.FC = () => {
  const { user } = useAuth0()
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
            <PageHeader title={'Dein Profil'} subtitle={'Tell others who you are'} />
          </Stack>
          <HStack spacing="3">
            <Button variant={'solid'} colorScheme={'blue'}>
              Save
            </Button>
          </HStack>
        </Stack>
        <Divider />
        <Stack spacing="5" divider={<StackDivider />}>
          <FormControl id="name">
            <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: '1.5', md: '8' }} justify="space-between">
              <FormLabel variant="inline">Name</FormLabel>
              <Input maxW={{ md: '3xl' }} defaultValue={user?.name} />
            </Stack>
          </FormControl>
          <FormControl id="email">
            <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: '1.5', md: '8' }} justify="space-between">
              <FormLabel variant="inline">Email</FormLabel>
              <Input type="email" maxW={{ md: '3xl' }} defaultValue={user?.email} />
            </Stack>
          </FormControl>
          <FormControl id="picture">
            <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: '1.5', md: '8' }} justify="space-between">
              <FormLabel variant="inline">Photo</FormLabel>
              <Stack
                spacing={{ base: '3', md: '5' }}
                direction={{ base: 'column', sm: 'row' }}
                width="full"
                maxW={{ md: '3xl' }}
              >
                <Avatar size="lg" name={user?.name} src={user?.picture} />
              </Stack>
            </Stack>
          </FormControl>
          <FormControl id="website">
            <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: '1.5', md: '8' }} justify="space-between">
              <FormLabel variant="inline">Website</FormLabel>
              <InputGroup maxW={{ md: '3xl' }}>
                <InputLeftAddon>https://</InputLeftAddon>
                <Input defaultValue="www.chakra-ui.com" />
              </InputGroup>
            </Stack>
          </FormControl>
          <FormControl id="bio">
            <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: '1.5', md: '8' }} justify="space-between">
              <Box>
                <FormLabel variant="inline">Bio</FormLabel>
                <FormHelperText mt="0" color="muted">
                  Write a short introduction about you
                </FormHelperText>
              </Box>
              <Textarea maxW={{ md: '3xl' }} rows={5} resize="none" />
            </Stack>
          </FormControl>

          <Flex direction="row-reverse">
            <Button variant="primary">Save</Button>
          </Flex>
        </Stack>
      </Stack>
    </>
  )
}

export default withAuthenticationRequired(ProfileView, {
  onRedirecting: () => <Loading />,
})
