import { Box, Button, HStack, Icon, Stack, Text } from '@healform/liquid'
import * as React from 'react'

interface PageHeaderProps {
  title: string
  subtitle: string
}

export const PageHeader = (props: PageHeaderProps) => {
  const { title, subtitle } = props
  return (
    <Box>
      <Text fontSize="xl" fontWeight="medium">
        {title}
      </Text>
      <Text color="gray.500" fontSize="sm">
        {subtitle}
      </Text>
    </Box>
  )
}
