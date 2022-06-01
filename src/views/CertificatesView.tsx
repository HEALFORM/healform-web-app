import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { IconButton } from '@chakra-ui/react'
import { Stack, Divider, HStack, useToast, Tooltip, Fade } from '@healform/liquid'
import React, { useEffect, useState } from 'react'
import { FiRefreshCw, FiShoppingCart } from 'react-icons/fi'

import CertificateList from '../components/CertificateList'
import Loading from '../components/Loading'
import { PageHeader } from '../components/PageHeader'
import { Certificate } from '../interfaces/Certificate'
import { Product } from '../interfaces/Product'

const CertificatesView: React.FC = () => {
  const { user } = useAuth0()
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)
  const toast = useToast()

  useEffect(() => {
    const getCertificatesByUser = (user: string | undefined) => {
      fetch(`${process.env.REACT_APP_API_URL}` + `/acuity/` + user + `/certificates`)
        .then(response => response.json())
        .then(json => {
          /* Set certificates */
          setCertificates(json)
          fetch(`${process.env.REACT_APP_API_URL}` + `/acuity/products`)
            .then(response => response.json())
            .then(json => {
              /* Set products */
              setProducts(json)
              /* Disable loading */
              setLoading(false)
            })
        })
        .catch(err => {
          if (err.response) {
            setLoading(false)
            setError(true)
            const id = 'errorResponse'
            if (!toast.isActive(id)) {
              toast({
                title: 'Die Daten konnten nicht geladen werden.',
                description: 'Der Server gab eine Fehlermeldung zurück.',
                status: 'error',
                isClosable: true,
                position: 'bottom-right',
                id,
              })
            }
          } else if (err.request) {
            setLoading(false)
            setError(true)
            const id = 'errorRequest'
            if (!toast.isActive(id)) {
              toast({
                title: 'Die Daten konnten nicht geladen werden.',
                description: 'Möglicherweise besteht keine Verbinung zum Internet oder Server.',
                status: 'error',
                isClosable: true,
                position: 'bottom-right',
                id,
              })
            }
          }
        })
    }

    getCertificatesByUser(user?.email)
  }, [toast, user?.email])

  return (
    <>
      <Stack spacing={6}>
        <Stack spacing="3">
          <Stack
            spacing="6"
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align={{ base: 'start', md: 'center' }}
          >
            <PageHeader
              title={'Abonnements'}
              subtitle={
                'Hier erhältst du einen Überblick über deine erworbenen und aktiven HEALFORM® 10er-, 50er- oder 100er-Karten und deren Restguthaben.'
              }
            />
            <HStack spacing="2">
              <Tooltip label={'Aktualisieren'} hasArrow>
                <IconButton icon={<FiRefreshCw />} aria-label="Aktualisieren" size="sm" />
              </Tooltip>
              <Tooltip label={'Zum Shop'} hasArrow>
                <IconButton icon={<FiShoppingCart />} aria-label="Neues Abonnement bestellen" size="sm" />
              </Tooltip>
            </HStack>
          </Stack>
          <Divider />
          {isLoading ? (
            <Loading />
          ) : (
            <Fade in={!isLoading}>
              <CertificateList certificates={certificates} products={products} />
            </Fade>
          )}
        </Stack>
      </Stack>
    </>
  )
}

export default withAuthenticationRequired(CertificatesView, {
  onRedirecting: () => <Loading />,
})
