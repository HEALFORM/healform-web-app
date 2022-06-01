import { StackProps } from '@chakra-ui/react'
import {
  AspectRatio,
  Box,
  Button,
  Image,
  Skeleton,
  Stack,
  useBreakpointValue,
  useColorModeValue,
  Headline,
} from '@healform/liquid'
import * as React from 'react'

import { Product } from '../../interfaces/Product'
import { FavouriteButton } from './FavouriteButton'
import { PriceTag } from './PriceTag'
import { Rating } from './Rating'

interface Props {
  product: Product
  rootProps?: StackProps
}

export const ProductCard = (props: Props) => {
  const { product, rootProps } = props
  const { name, price } = product
  return (
    <>
      {!product.hidden && (
        <Stack spacing={useBreakpointValue({ base: '4', md: '5' })} {...rootProps}>
          <Box position="relative">
            <AspectRatio ratio={16 / 9}>
              <Image
                alt={name}
                src={''}
                draggable="false"
                fallback={<Skeleton />}
                borderRadius={useBreakpointValue({ base: 'md', md: 'lg' })}
              />
            </AspectRatio>
            <FavouriteButton position="absolute" top="4" right="4" aria-label={`Add ${name} to your favourites`} />
          </Box>
          <Stack>
            <Stack spacing="1">
              <Headline noMargin size={'four'} color={useColorModeValue('gray.800', 'gray.400')} as={'h3'}>
                {name}
              </Headline>
              <PriceTag price={price} currency="EUR" />
            </Stack>
          </Stack>
          <Stack align="center">
            <Button colorScheme="primary" isFullWidth>
              In den Einkaufswagen
            </Button>
          </Stack>
        </Stack>
      )}
    </>
  )
}
