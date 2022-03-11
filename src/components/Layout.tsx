import { Navbar } from './Navbar'
import {
  Box,
  Container,
  useColorModeValue,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  Button,
} from '@healform/liquid'
import AppointmentDetailView from '../views/AppointmentDetail'
import DashboardView from '../views/Dashboard'
import ProfileView from '../views/Profile'
import ScheduleView from '../views/Schedule'
import * as React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { useAuth0 } from '@auth0/auth0-react'

export const Layout = () => {
  const { user } = useAuth0()

  return (
    <Box as="section" height="100vh" overflowY="auto" bg={useColorModeValue('#f9f9f9', '#121212')}>
      <Navbar />
      <Container maxW={'3xl'} pt={{ base: '24', lg: '32' }} pb={{ base: '12', lg: '24' }}>
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
          <Route path="/neuer-termin" element={<ProtectedRoute component={ScheduleView} />} />
          <Route path="/profile" element={<ProtectedRoute component={ProfileView} />} />
        </Routes>
      </Container>
    </Box>
  )
}
