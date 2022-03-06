import { Box, BoxProps, useColorModeValue } from '@healform/liquid'
import * as React from 'react'

export const Card = (props: BoxProps) => (
  <Box
    minH="3xs"
    bg={useColorModeValue('white', 'gray.900')}
    borderRadius="xl"
    borderColor={useColorModeValue('gray.200', 'whiteAlpha.200')}
    borderWidth={'1px'}
    {...props}
  />
)
