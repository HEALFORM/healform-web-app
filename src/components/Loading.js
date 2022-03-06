import React from 'react'
import { Spinner } from '@healform/liquid'
import { Center } from '@chakra-ui/react'

const Loading = () => {
  return (
    <Center>
      <Spinner size="sm" />
    </Center>
  )
}

export default Loading
