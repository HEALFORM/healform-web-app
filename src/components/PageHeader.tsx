import { Stack, Body, Headline } from '@healform/liquid'
import * as React from 'react'

interface PageHeaderProps {
  title: string
  subtitle: string
}

export const PageHeader = (props: PageHeaderProps) => {
  const { title, subtitle } = props
  return (
    <Stack spacing="2">
      <Headline noMargin size={'four'}>
        {title}
      </Headline>
      <Body variant={'subtle'}>{subtitle}</Body>
    </Stack>
  )
}
