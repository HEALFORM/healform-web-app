import {
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
} from '@chakra-ui/react'
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
import { Logo } from './Logo'
import { Sidebar } from './Sidebar'
import { ToggleButton } from './ToggleButton'
import { NavLink } from 'react-router-dom'
import { MenuButton, MenuItem, MenuList, Tooltip } from '@healform/liquid'
import { useAuth0 } from '@auth0/auth0-react'

export const Navbar = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true })
  const { isOpen, onToggle, onClose } = useDisclosure()
  const { user, logout } = useAuth0()

  return (
    <Box
      as="nav"
      bg={useColorModeValue('white', 'black')}
      position={'fixed'}
      w={'100%'}
      zIndex={500}
      boxShadow={{ base: 'xs', lg: 'sm' }}
    >
      <Container py={{ base: '3' }} maxW={'none'}>
        <Flex justify="space-between">
          <HStack spacing="4">
            <Logo />
            {isDesktop && (
              <ButtonGroup variant="link" spacing="4" fontFamily={'body'}>
                <Button
                  size={'lg'}
                  as={NavLink}
                  to={'/'}
                  leftIcon={<FiHome />}
                  _activeLink={{ color: 'blue.500' }}
                  fontWeight={600}
                  color={'currentColor'}
                  transitionDuration={'0ms'}
                >
                  Start
                </Button>
                <Button
                  size={'lg'}
                  as={NavLink}
                  to={'/neuer-termin'}
                  leftIcon={<FiPlus />}
                  _activeLink={{ color: 'blue.500' }}
                  fontWeight={600}
                  color={'currentColor'}
                  transitionDuration={'0ms'}
                >
                  Neuer Termin
                </Button>
                <Button
                  size={'lg'}
                  as={NavLink}
                  to={'/abonnements'}
                  leftIcon={<FiBookmark />}
                  _activeLink={{ color: 'blue.500' }}
                  fontWeight={600}
                  color={'currentColor'}
                  transitionDuration={'0ms'}
                >
                  Abonnements
                </Button>
                <Button
                  size={'lg'}
                  as={NavLink}
                  to={'/shop'}
                  leftIcon={<FiShoppingCart />}
                  _activeLink={{ color: 'blue.500' }}
                  fontWeight={600}
                  color={'currentColor'}
                  transitionDuration={'0ms'}
                >
                  Shop
                </Button>
              </ButtonGroup>
            )}
          </HStack>
          {isDesktop ? (
            <HStack spacing="4">
              <ButtonGroup variant="ghost" spacing="1">
                <Tooltip label={'Hilfe'} hasArrow>
                  <IconButton icon={<FiHelpCircle fontSize="1.25rem" />} aria-label="Hilfe" />
                </Tooltip>
                <Tooltip label={'Einstellungen'} hasArrow>
                  <IconButton icon={<FiSettings fontSize="1.25rem" />} aria-label="Einstellungen" />
                </Tooltip>
                <Tooltip label={'Log Out'} hasArrow>
                  <IconButton
                    icon={<FiLogOut fontSize="1.25rem" />}
                    aria-label="Log Out"
                    onClick={() => logout({ returnTo: window.location.origin })}
                  />
                </Tooltip>
                <Tooltip label={'Mehr'} hasArrow>
                  <Menu>
                    <MenuButton as={IconButton} aria-label="Options" icon={<FiMoreHorizontal />} />
                    <MenuList>
                      <MenuItem icon={<FiHelpCircle />}>Stornierungsbedingungen</MenuItem>
                      <MenuItem icon={<FiHelpCircle />}>Rechtliche Hinweise</MenuItem>
                    </MenuList>
                  </Menu>
                </Tooltip>
              </ButtonGroup>
              <Menu>
                <Avatar name={user?.name} src={user?.picture} as={MenuButton} />
                <MenuList>
                  <MenuItem isDisabled>{user?.name}</MenuItem>
                  <MenuDivider />
                  <MenuItem icon={<FiUser />}>Profil</MenuItem>
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
