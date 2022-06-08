import { CircularProgress, StackDivider } from '@chakra-ui/react'
import { Body, Box, CircularProgressLabel, Stack, BodyLarge } from '@healform/liquid'
import React from 'react'

import { Certificate } from '../interfaces/Certificate'
import { Product } from '../interfaces/Product'

function justNumbers(string: string) {
  const numsStr = string.replace(/[^0-9]/g, '')
  return parseInt(numsStr)
}

const CertificateList = (props: { certificates: Certificate[]; products: Product[] }) => {
  const { certificates, products } = props
  if (!certificates || certificates.length === 0)
    return (
      <Box borderWidth={'1px'} borderRadius={'sm'}>
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
    <Box borderWidth={'1px'} borderRadius={'sm'}>
      <Stack spacing="3" divider={<StackDivider />} py={3}>
        {certificates.map(certificate => (
          <Stack key={certificate.id} justify="space-between" direction="row" spacing="4" px={3} align="center">
            <Stack spacing="0">
              <Body noMargin size="two">
                Zertifikat
              </Body>
              <BodyLarge noMargin variant="highlight">
                {certificate.name}
              </BodyLarge>
            </Stack>
            <CircularProgress
              thickness={7}
              capIsRound
              value={certificate.remainingCounts[certificate.appointmentTypeIDs[0]]}
              max={justNumbers(
                products.map(product => product.appointmentTypeCounts[certificate.appointmentTypeIDs[0]]).toString(),
              )}
              color="secondary.500"
            >
              <CircularProgressLabel>
                <Body variant="subtle" size="two" noMargin fontFamily="heading">
                  {certificate.remainingCounts[certificate.appointmentTypeIDs[0]]}
                </Body>
              </CircularProgressLabel>
            </CircularProgress>
          </Stack>
        ))}
      </Stack>
    </Box>
  )
}

export default CertificateList
