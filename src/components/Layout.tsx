import { Navbar } from './Navigation/Navbar'
import { Box, useColorModeValue, Alert, AlertTitle, AlertDescription, AlertIcon, Button } from '@healform/liquid'
import AppointmentCreateView from '../views/AppointmentCreateView'
import AppointmentDetailView from '../views/AppointmentDetailView'
import CertificatesView from '../views/CertificatesView'
import ShopView from '../views/ShopView'
import DashboardView from '../views/DashboardView'
import ProfileView from '../views/ProfileView'
import * as React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { useAuth0 } from '@auth0/auth0-react'
import ChatwootWidget from './ChatwootWidget'

export const Layout = () => {
  const { user } = useAuth0()

  return (
    <>
      <Box as="section" bg={useColorModeValue('gray.50', 'gray.900')}>
        <Navbar />
        <Box mx="auto" maxW={'3xl'} pt={{ base: '24', lg: '32' }} pb={{ base: '12', lg: '24' }}>
          {user?.email_verified && (
            <Alert status="warning" mb={10} colorScheme={'gray'}>
              <AlertIcon />
              <AlertTitle mr={2}>E-Mail Adresse nicht bestätigt.</AlertTitle>
              <AlertDescription>Bitte bestätige deine E-Mail Adresse.</AlertDescription>
              <Button position="absolute" right="8px" top="8px" colorScheme={'yellow'}>
                Erneut senden
              </Button>
            </Alert>
          )}
          <Routes>
            <Route path="/" element={<ProtectedRoute component={DashboardView} />} />
            <Route path="/termin/:id" element={<ProtectedRoute component={AppointmentDetailView} />} />
            <Route path="/neuer-termin" element={<ProtectedRoute component={AppointmentCreateView} />} />
            <Route path="/abonnements" element={<ProtectedRoute component={CertificatesView} />} />
            <Route path="/shop" element={<ProtectedRoute component={ShopView} />} />
            <Route path="/profile" element={<ProtectedRoute component={ProfileView} />} />
          </Routes>
        </Box>
      </Box>
      <ChatwootWidget />
    </>
  )
}
