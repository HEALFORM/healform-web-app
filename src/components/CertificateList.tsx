import { Body, Box, Stack, useColorModeValue } from '@healform/liquid'
import { StackDivider, IconButton } from '@chakra-ui/react'
import React from 'react'
import { Certificate } from '../interfaces/Certificate'

const CertificateList = (props: { certificates: Certificate[] }) => {
  const { certificates } = props
  if (!certificates || certificates.length === 0)
    return (
      <Box bg={useColorModeValue('white', 'black')} borderWidth={'1px'} borderRadius={'sm'}>
        <Stack spacing="3" divider={<StackDivider />} py={3}>
          <Box px={3}>
            <Body noMargin size={'two'} variant={'subtle'}>
              Es wurden keine Abonnements gefunden.
            </Body>
          </Box>
        </Stack>
      </Box>
    )

  return (
    <Box bg={useColorModeValue('white', 'black')} borderWidth={'1px'} borderRadius={'sm'}>
      <Stack spacing="3" divider={<StackDivider />} py={3}>
        {certificates.map(certificate => (
          <Stack key={certificate.id} justify="space-between" direction="row" spacing="4" px={3}>
            <Body noMargin>{certificate.name}</Body>
            <Stack>
              <Body noMargin>Verfügbar:</Body>
              <Body noMargin>{certificate.remainingCounts[certificate.appointmentTypeIDs[0]]}</Body>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Box>
  )
}

export default CertificateList
