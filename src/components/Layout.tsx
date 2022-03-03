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
    <Flex
      as="section"
      direction={{ base: 'column', lg: 'row' }}
      height="100vh"
      bg={useColorModeValue('white', 'black')}
      overflowY="auto"
    >
      {isDesktop ? <Sidebar /> : <Navbar />}
      <Box bg={useColorModeValue('white', 'black')} pt={{ base: '0', lg: '3' }} flex="1">
        <Box
          bg={useColorModeValue('#f5f5f5', 'gray.900')}
          borderTopLeftRadius={{ base: 'none', lg: '2rem' }}
          height="full"
        >
          <Container p="6" flex="1" maxW="7xl">
            <Routes>
              <Route path="/" element={<ProtectedRoute component={DashboardView} />} />
              <Route path="/neuer-termin" element={<ProtectedRoute component={ScheduleView} />} />
              <Route path="/profile" element={<ProtectedRoute component={ProfileView} />} />
            </Routes>
          </Container>
        </Box>
      </Box>
    </Flex>
  )
}
