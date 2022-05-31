import { useAuth0 } from '@auth0/auth0-react'
import {
  Box,
  useColorModeValue,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  Button,
  Container,
} from '@healform/liquid'
import * as React from 'react'
import { Routes, Route } from 'react-router-dom'

import AppointmentCreateView from '../views/AppointmentCreateView'
import AppointmentDetailView from '../views/AppointmentDetailView'
import CertificatesView from '../views/CertificatesView'
import DashboardView from '../views/DashboardView'
import ProfileView from '../views/ProfileView'
import ShopView from '../views/ShopView'
import ChatwootWidget from './ChatwootWidget'
import { Navbar } from './Navigation/Navbar'
import { ProtectedRoute } from './ProtectedRoute'

export const Layout = () => {
  const { user } = useAuth0()

  return (
    <>
      <Box as="section" bg={useColorModeValue('gray.50', 'gray.900')}>
        <Navbar />
        <Box pt={24}>
          <Container size="3xl">
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
          </Container>
        </Box>
      </Box>
      <ChatwootWidget />
    </>
  )
}
