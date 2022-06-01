import { withAuthenticationRequired } from '@auth0/auth0-react'
import { Stack, Divider, HStack, useToast } from '@healform/liquid'
import React, { useEffect, useState } from 'react'

import Error from '../components/Error'
import Loading from '../components/Loading'
import { PageHeader } from '../components/PageHeader'
import { ProductCard } from '../components/Shop/ProductCard'
import { ProductGrid } from '../components/Shop/ProductGrid'
import { Product } from '../interfaces/Product'

const ShopView: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)
  const toast = useToast()

  useEffect(() => {
    const getProducts = () => {
      fetch(`${process.env.REACT_APP_API_URL}` + `/acuity/products`)
        .then(response => response.json())
        .then(json => {
          /* Set certificates */
          setProducts(json)
          /* Disable loading */
          setLoading(false)
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

    getProducts()
  }, [toast])

  if (isError) {
    return <Error />
  } else {
    return (
      <>
        <Stack spacing={6}>
          <Stack spacing="3">
            <PageHeader
              title={'Shop'}
              subtitle={
                'Das Zertifikat wird im Anschluss einer erfolgreichen Transaktion in Ihrem Account hinterlegt.\n' +
                'Im Anschluss an den Bestellprozess können Sie Ihre Termine individuell vereinbaren.'
              }
            />
            <Divider />
            {isLoading ? (
              <Loading />
            ) : (
              <ProductGrid>
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </ProductGrid>
            )}
          </Stack>
        </Stack>
      </>
    )
  }
}

export default withAuthenticationRequired(ShopView, {
  onRedirecting: () => <Loading />,
})
