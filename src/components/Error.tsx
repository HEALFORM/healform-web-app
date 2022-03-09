import React from 'react'
import { Alert, AlertDescription, AlertIcon, AlertTitle, Button } from '@healform/liquid'
import { FiRefreshCcw } from 'react-icons/fi'

const Error = () => {
  function refreshPage() {
    window.location.reload()
  }

  return (
    <>
      <Alert status="error" mb={10}>
        <AlertIcon />
        <AlertTitle mr={2}>Fehler.</AlertTitle>
        <AlertDescription>Möglicherweise besteht keine Verbindung zum Internet oder Server.</AlertDescription>
      </Alert>
      <Button isFullWidth leftIcon={<FiRefreshCcw />} onClick={refreshPage}>
        Erneut versuchen
      </Button>
    </>
  )
}

export default Error
