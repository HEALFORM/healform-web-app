import { Avatar, Box, HStack, Text } from '@healform/liquid'
import * as React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

interface UserProfileProps {
  name: string
  image: string
  email: string
}

export const UserProfile = (props: UserProfileProps) => {
  const { user } = useAuth0()
  return (
    <HStack spacing="3" pb={5}>
      <Avatar name={user?.name} src={user?.picture} boxSize="10" />
      <Box>
        <Text fontWeight="medium" fontSize="sm">
          {user?.name}
        </Text>
        <Text color="muted" fontSize="sm">
          {user?.email}
        </Text>
      </Box>
    </HStack>
  )
}
