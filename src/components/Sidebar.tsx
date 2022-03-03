import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  Progress,
  Stack,
  Text,
  useColorModeValue,
} from '@healform/liquid'
import { NavLink } from 'react-router-dom'
import * as React from 'react'
import {
  FiBookmark,
  FiCheckSquare,
  FiHelpCircle,
  FiHome,
  FiSettings,
  FiUsers,
  FiMoreHorizontal,
  FiLogOut,
} from 'react-icons/fi'
import { Logo } from './Logo'
import { NavButton } from './NavButton'
import { UserProfile } from './UserProfile'
import { useAuth0 } from '@auth0/auth0-react'

export const Sidebar: React.FC = () => {
  const { logout } = useAuth0()
  return (
    <Flex as="section" minH="100vh" bg="white">
      <Flex
        flex="1"
        bg={useColorModeValue('white', 'black')}
        overflowY="auto"
        maxW={{ base: 'full', sm: 'xs' }}
        py={{ base: '6', sm: '5' }}
        px={{ base: '4', sm: '5' }}
      >
        <Stack justify="space-between" spacing="1">
          <Stack spacing={{ base: '4', sm: '5' }} shouldWrapChildren>
            <Logo />
            <Stack spacing="1">
              <NavButton
                as={NavLink}
                to={'/'}
                label="Dashboard"
                icon={FiHome}
                _activeLink={{ fontWeight: 'bold', bg: 'rgba(91, 104, 229, .1)', color: 'blue.500' }}
              />
              <NavButton
                as={NavLink}
                to={'/neuer-termin'}
                label="Neuer Termin"
                icon={FiCheckSquare}
                _activeLink={{ fontWeight: 'bold', bg: 'rgba(91, 104, 229, .1)', color: 'blue.500' }}
              />
              <NavButton label="Abonnements" icon={FiBookmark} />
              <NavButton
                as={NavLink}
                to={'/profile'}
                label="Profil"
                icon={FiUsers}
                _activeLink={{ fontWeight: 'bold', bg: 'rgba(91, 104, 229, .1)', color: 'blue.500' }}
              />
            </Stack>
          </Stack>
          <Stack spacing={{ base: '5', sm: '6' }}>
            <Stack spacing="1">
              <NavButton label="Hilfe" icon={FiHelpCircle} />
              <NavButton label="Einstellungen" icon={FiSettings} />
              <NavButton
                label="Logout"
                icon={FiLogOut}
                onClick={() => logout({ returnTo: window.location.origin })}
                _activeLink={{ fontWeight: 'bold', bg: 'blue.50', color: 'blue.500' }}
              />
              <Menu>
                <NavButton as={MenuButton} label="Mehr" icon={FiMoreHorizontal} />
                <MenuList>
                  <MenuItem icon={<FiHelpCircle />}>
                    Stornierungsbedingungen
                  </MenuItem>
                  <MenuItem icon={<FiHelpCircle />}>
                    Rechtliche Hinweise
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
            <Box bg={useColorModeValue('gray.50', 'gray.900')} px="4" py="5" borderRadius="lg">
              <Stack spacing="4">
                <Stack spacing="1">
                  <Text fontSize="sm" fontWeight="medium">
                    Almost there
                  </Text>
                  <Text fontSize="sm" color="muted">
                    Fill in some more information about you and your person.
                  </Text>
                </Stack>
                <Progress value={80} size="sm" aria-label="Profile Update Progress" />
                <HStack spacing="3">
                  <Button variant="link" size="sm">
                    Dismiss
                  </Button>
                  <Button variant="link" size="sm" colorScheme="blue">
                    Update profile
                  </Button>
                </HStack>
              </Stack>
            </Box>
            <Divider />
            <UserProfile name="Christoph Winston" image="https://tinyurl.com/yhkm2ek8" email="chris@chakra-ui.com" />
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  )
}
