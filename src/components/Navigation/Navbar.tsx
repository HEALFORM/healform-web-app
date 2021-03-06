// @ts-nocheck
import { useAuth0 } from '@auth0/auth0-react'
import {
  MenuButton,
  MenuItem,
  MenuList,
  Body,
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
  Center,
  Tooltip,
  Divider,
} from '@healform/liquid'
import * as React from 'react'
import {
  FiPlus,
  FiHelpCircle,
  FiHome,
  FiLogOut,
  FiSettings,
  FiShoppingCart,
  FiUser,
  FiMessageCircle,
  FiLifeBuoy,
  FiMenu,
  FiShoppingBag,
  FiAward,
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
      <Container size="3xl" py={{ base: '3' }} maxW={'none'}>
        <Flex justify="space-between">
          <HStack spacing="4">
            <Box as={NavLink} to={'/'}>
              <Logo />
            </Box>
            {isDesktop && (
              <ButtonGroup variant="link" spacing="4" fontFamily={'body'}>
                <Button
                  size={'md'}
                  as={NavLink}
                  to={'/'}
                  /* leftIcon={<FiHome />} */
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
                  /* leftIcon={<FiPlus />} */
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
                  /* leftIcon={<FiAward />} */
                  _activeLink={{ color: 'primary.500' }}
                  color={'currentColor'}
                  transitionDuration={'0ms'}
                >
                  Abos
                </Button>
                <Center height="20px">
                  <Divider orientation="vertical" />
                </Center>
                <Button
                  size={'md'}
                  as={NavLink}
                  to={'/shop'}
                  leftIcon={<FiShoppingBag />}
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
              <Tooltip label="Warenkorb" hasArrow openDelay={500}>
                <Box>
                  <IconButton
                    size="sm"
                    icon={<FiShoppingCart />}
                    transition="none"
                    textAlign="center"
                    aria-label="Warenkorb"
                  />
                </Box>
              </Tooltip>
              <Menu>
                <Tooltip label="Men??" hasArrow openDelay={500}>
                  <Box>
                    <IconButton
                      size="sm"
                      as={MenuButton}
                      icon={
                        <Center>
                          <FiMenu />
                        </Center>
                      }
                      transition="none"
                      textAlign="center"
                      aria-label="Men??"
                    />
                  </Box>
                </Tooltip>
                <MenuList borderWidth={0} boxShadow="md" borderRadius="sm" py={2} px={2}>
                  <MenuItem borderRadius="sm" px={2}>
                    <Avatar size="sm" name={user?.name} src={user?.picture} boxSize="1.2rem" mr={2} />
                    <Body size="two" fontFamily="heading" noMargin>
                      {user?.name}
                    </Body>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem borderRadius="sm" as={NavLink} to={'/profile'} icon={<FiUser size="1.2rem" />} px={2}>
                    <Body size="two" fontFamily="heading" noMargin>
                      Profil
                    </Body>
                  </MenuItem>
                  <MenuItem borderRadius="sm" as={NavLink} to={'/settings'} icon={<FiSettings size="1.2rem" />} px={2}>
                    <Body size="two" fontFamily="heading" noMargin>
                      Einstellungen
                    </Body>
                  </MenuItem>
                  <MenuItem
                    borderRadius="sm"
                    icon={<FiLogOut size="1.2rem" />}
                    px={2}
                    aria-label="Log Out"
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    <Body size="two" fontFamily="heading" noMargin>
                      Logout
                    </Body>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem borderRadius="sm" icon={<FiMessageCircle size="1.2rem" />} px={2}>
                    <Body size="two" fontFamily="heading" noMargin>
                      Support-Center
                    </Body>
                  </MenuItem>
                  <MenuItem borderRadius="sm" icon={<FiHelpCircle size="1.2rem" />} px={2}>
                    <Body size="two" fontFamily="heading" noMargin>
                      Stornierung
                    </Body>
                  </MenuItem>
                  <MenuItem borderRadius="sm" icon={<FiLifeBuoy size="1.2rem" />} px={2}>
                    <Body size="two" fontFamily="heading" noMargin>
                      Rechtliche Hinweise
                    </Body>
                  </MenuItem>
                </MenuList>
              </Menu>
              <Tooltip label={user?.name} hasArrow openDelay={500}>
                <Box>
                  <Avatar size="sm" name={user?.name} src={user?.picture} />
                </Box>
              </Tooltip>
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
