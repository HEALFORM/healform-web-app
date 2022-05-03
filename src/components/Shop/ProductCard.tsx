import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Image,
  Skeleton,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  Headline,
} from '@healform/liquid'
import { StackProps } from '@chakra-ui/react'
import * as React from 'react'
import { Rating } from './Rating'
import { FavouriteButton } from './FavouriteButton'
import { PriceTag } from './PriceTag'
import { Product } from '../../interfaces/Product'

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
              <Headline noMargin size={'three'} color={useColorModeValue('gray.700', 'gray.400')} as={'h3'}>
                {name}
              </Headline>
              <PriceTag price={price} currency="EUR" />
            </Stack>
            <HStack>
              <Rating defaultValue={4} size="sm" />
              <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
                12 Reviews
              </Text>
            </HStack>
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
