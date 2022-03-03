import { Box, BoxProps, useColorModeValue } from '@healform/liquid'
import * as React from 'react'

export const Card = (props: BoxProps) => (
  <Box
    minH="3xs"
    bg={useColorModeValue('white', 'blackAlpha.600')}
    boxShadow={useColorModeValue('sm', 'sm-dark')}
    borderRadius="xl"
    {...props}
  />
)
