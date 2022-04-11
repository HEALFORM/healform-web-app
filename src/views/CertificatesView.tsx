import React, { useEffect, useState } from 'react'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import { Stack, Divider, HStack, useToast, Tooltip } from '@healform/liquid'
import { PageHeader } from '../components/PageHeader'
import Loading from '../components/Loading'
import Error from '../components/Error'
import { Certificate } from '../interfaces/Certificate'
import { IconButton } from '@chakra-ui/react'
import { FiRefreshCw, FiShoppingCart } from 'react-icons/fi'
import CertificateList from '../components/CertificateList'
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

  if (isLoading) {
    return <Loading />
  } else {
    if (isError) {
      return <Error />
    } else {
      return (
        <>
          <Stack spacing={5}>
            <Stack spacing="2">
              <Stack
                spacing="4"
                direction={{ base: 'column', md: 'row' }}
                justify="space-between"
                align={{ base: 'start', md: 'center' }}
              >
                <PageHeader title={'Abonnements'} subtitle={'Deine erworbenen 10er-, 50er- oder 100er-Karten'} />
                <HStack spacing="3">
                  <Tooltip label={'Aktualisieren'} hasArrow>
                    <IconButton icon={<FiRefreshCw fontSize="1.25rem" />} aria-label="Aktualisieren" />
                  </Tooltip>
                  <Tooltip label={'Neues Abonnement bestellen'} hasArrow>
                    <IconButton icon={<FiShoppingCart fontSize="1.25rem" />} aria-label="Neues Abonnement bestellen" />
                  </Tooltip>
                </HStack>
              </Stack>
              <Divider />
              <CertificateList certificates={certificates} products={products} />
            </Stack>
          </Stack>
        </>
      )
    }
  }
}

export default withAuthenticationRequired(CertificatesView, {
  onRedirecting: () => <Loading />,
})
