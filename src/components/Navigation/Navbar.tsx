// @ts-nocheck
import { useAuth0 } from '@auth0/auth0-react'
import {
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuDivider,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from '@healform/liquid'
import * as React from 'react'
import {
  FiBookmark,
  FiPlus,
  FiHelpCircle,
  FiHome,
  FiLogOut,
  FiMoreHorizontal,
  FiSettings,
  FiShoppingCart,
  FiUser,
} from 'react-icons/fi'
import { NavLink } from 'react-router-dom'

import { Logo } from '../Logo'
import { Sidebar } from './Sidebar'
import { ToggleButton } from './ToggleButton'

export const Navbar = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true })
  const { isOpen, onToggle, onClose } = useDisclosure()
  const { user, logout } = useAuth0()

  return (
    <Box as="nav" bg={useColorModeValue('white', 'black')} position={'fixed'} w={'100%'} zIndex={500} py={2}>
      <Container size="4xl" py={{ base: '3' }} maxW={'none'}>
        <Flex justify="space-between">
          <HStack spacing="4">
            <Logo />
            {isDesktop && (
              <ButtonGroup variant="link" spacing="4" fontFamily={'body'}>
                <Button
                  size={'md'}
                  as={NavLink}
                  to={'/'}
                  leftIcon={<FiHome />}
                  _activeLink={{ color: 'primary.500' }}
                  color={'currentColor'}
                  transitionDuration={'0ms'}
                >
                  Dashboard
                </Button>
                <Button
                  size={'md'}
                  as={NavLink}
                  to={'/neuer-termin'}
                  leftIcon={<FiPlus />}
                  _activeLink={{ color: 'primary.500' }}
                  color={'currentColor'}
                  transitionDuration={'0ms'}
                >
                  Neuer Termin
                </Button>
                <Button
                  size={'md'}
                  as={NavLink}
                  to={'/abonnements'}
                  leftIcon={<FiBookmark />}
                  _activeLink={{ color: 'primary.500' }}
                  color={'currentColor'}
                  transitionDuration={'0ms'}
                >
                  Abonnements
                </Button>
                <Button
                  size={'md'}
                  as={NavLink}
                  to={'/shop'}
                  leftIcon={<FiShoppingCart />}
                  _activeLink={{ color: 'primary.500' }}
                  color={'currentColor'}
                  transitionDuration={'0ms'}
                >
                  Shop
                </Button>
              </ButtonGroup>
            )}
          </HStack>
          {isDesktop ? (
            <HStack spacing="2">
              <Menu>
                <Avatar size="sm" name={user?.name} src={user?.picture} as={MenuButton} />
                <MenuList>
                  <MenuItem isDisabled>{user?.name}</MenuItem>
                  <MenuDivider />
                  <MenuItem as={NavLink} to={'/profile'} icon={<FiUser />}>
                    Profil
                  </MenuItem>
                  <MenuItem as={NavLink} to={'/settings'} icon={<FiSettings />}>
                    Einstellungen
                  </MenuItem>
                  <MenuItem
                    icon={<FiLogOut />}
                    aria-label="Log Out"
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    Logout
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem icon={<FiHelpCircle />}>Support-Center</MenuItem>
                  <MenuItem icon={<FiHelpCircle />}>Stornierungsbedingungen</MenuItem>
                  <MenuItem icon={<FiHelpCircle />}>Rechtliche Hinweise</MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton
                  size="sm"
                  name={user?.name}
                  src={user?.picture}
                  as={IconButton}
                  icon={<FiMoreHorizontal />}
                />
                <MenuList>
                  <MenuItem>
                    <Avatar size="sm" name={user?.name} src={user?.picture} boxSize="1rem" mr={2} />
                    <span>{user?.name}</span>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem as={NavLink} to={'/profile'} icon={<FiUser />}>
                    Profil
                  </MenuItem>
                  <MenuItem as={NavLink} to={'/settings'} icon={<FiSettings />}>
                    Einstellungen
                  </MenuItem>
                  <MenuItem
                    icon={<FiLogOut />}
                    aria-label="Log Out"
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    Log-Out
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem icon={<FiHelpCircle />}>Support-Center</MenuItem>
                  <MenuItem icon={<FiHelpCircle />}>Stornierungsbedingungen</MenuItem>
                  <MenuItem icon={<FiHelpCircle />}>Rechtliche Hinweise</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          ) : (
            <>
              <ToggleButton isOpen={isOpen} aria-label="Open Menu" onClick={onToggle} />
              <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                isFullHeight
                preserveScrollBarGap
                // Only disabled for showcase
                trapFocus={false}
              >
                <DrawerOverlay />
                <DrawerContent>
                  <Sidebar />
                </DrawerContent>
              </Drawer>
            </>
          )}
        </Flex>
      </Container>
    </Box>
  )
}
