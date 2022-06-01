import { Stack, Body, Title } from '@healform/liquid'
import * as React from 'react'

interface PageHeaderProps {
  title: string
  subtitle?: string
}

export const PageHeader = (props: PageHeaderProps) => {
  const { title, subtitle } = props
  return (
    <Stack spacing="1">
      <Title noMargin size={'six'}>
        {title}
      </Title>
      {subtitle && <Body>{subtitle}</Body>}
    </Stack>
  )
}
