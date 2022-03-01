import { Button, HStack, Icon, Text } from '@healform/liquid'
import { As, ButtonProps } from '@chakra-ui/react'
import * as React from 'react'

interface NavButtonProps extends ButtonProps {
  icon: As
  label: string
}

export const NavButton = (props: NavButtonProps) => {
  const { icon, label, ...buttonProps } = props
  return (
    <Button variant="ghost" justifyContent="start" {...buttonProps} borderRadius={'md'}>
      <HStack spacing="3">
        <Icon as={icon} boxSize="5" color="currentColor" />
        <Text>{label}</Text>
      </HStack>
    </Button>
  )
}
