import { Box, Body, BodyLarge } from '@healform/liquid'
import * as React from 'react'

interface PageHeaderProps {
  title: string
  subtitle: string
}

export const PageHeader = (props: PageHeaderProps) => {
  const { title, subtitle } = props
  return (
    <Box>
      <BodyLarge noMargin>{title}</BodyLarge>
      <Body variant={'subtle'}>{subtitle}</Body>
    </Box>
  )
}
