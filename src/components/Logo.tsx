import { HStack, Image, Headline } from '@healform/liquid'
import * as React from 'react'

export const Logo = () => {
  return (
    <HStack>
      <Image src={require('./../assets/svg/healformLiquidDropBlack.png')} width={10} />
      <Headline size={'two'}>HEALFORM</Headline>
    </HStack>
  )
}
