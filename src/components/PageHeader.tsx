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
      <Title noMargin size={'six'} as="h1">
        {title}
      </Title>
      {subtitle && <Body size="two">{subtitle}</Body>}
    </Stack>
  )
}
