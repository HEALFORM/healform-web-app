import { As, ButtonProps } from '@chakra-ui/react'
import { Button, HStack, Icon, Text } from '@healform/liquid'
import * as React from 'react'

interface NavButtonProps extends ButtonProps {
  icon: As
  label: string
  to?: string
}

export const NavButton = (props: NavButtonProps) => {
  const { icon, label, ...buttonProps } = props
  return (
    <Button variant="ghost" justifyContent="start" {...buttonProps} borderRadius={'md'} w={'100%'}>
      <HStack spacing="3">
        <Icon as={icon} boxSize="5" color="currentColor" />
        <Text>{label}</Text>
      </HStack>
    </Button>
  )
}
