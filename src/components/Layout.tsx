import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'
import { Box, Container, Flex, useBreakpointValue, useColorModeValue } from '@healform/liquid'
import DashboardView from '../views/Dashboard'
import ProfileView from '../views/Profile'
import ScheduleView from '../views/Schedule'
import * as React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'

export const Layout = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true })
  return (
    <Box as="section" height="100vh" overflowY="auto" bg={useColorModeValue('#f9f9f9', '#121212')}>
      <Navbar />
      <Container maxW={'4xl'} pt={{ base: '8', lg: '12' }} pb={{ base: '12', lg: '24' }}>
        <Routes>
          <Route path="/" element={<ProtectedRoute component={DashboardView} />} />
          <Route path="/neuer-termin" element={<ProtectedRoute component={ScheduleView} />} />
          <Route path="/profile" element={<ProtectedRoute component={ProfileView} />} />
        </Routes>
      </Container>
    </Box>
  )
}
