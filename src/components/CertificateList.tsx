import { StackDivider } from '@chakra-ui/react'
import { Body, Box, Stack, useColorModeValue } from '@healform/liquid'
import React from 'react'

import { Certificate } from '../interfaces/Certificate'
import { Product } from '../interfaces/Product'

const CertificateList = (props: { certificates: Certificate[]; products: Product[] }) => {
  const { certificates, products } = props
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
          <Stack key={certificate.id} justify="space-between" direction="row" spacing="4" px={3} align="center">
            <Body noMargin>{certificate.name}</Body>
            <Stack spacing={0}>
              <Body noMargin variant="highlight" color="primary.500">
                {certificate.remainingCounts[certificate.appointmentTypeIDs[0]]} /{' '}
                {products.map(product => product.appointmentTypeCounts[certificate.appointmentTypeIDs[0]])}
              </Body>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Box>
  )
}

export default CertificateList
