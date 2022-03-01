import {Sidebar} from "./Sidebar";
import {Navbar} from "./Navbar";
import {Box, Container, Flex, useBreakpointValue, useColorModeValue} from "@healform/liquid";
import DashboardView from "../views/Dashboard";
import * as React from "react";
// @ts-ignore
import { Router, Route, Switch } from "react-router-dom";

export const Layout = () => {
  const isDesktop = useBreakpointValue({base: false, lg: true})
  return (
    <Flex
      as="section"
      direction={{base: 'column', lg: 'row'}}
      height="100vh"
      bg={useColorModeValue('white', 'black')}
      overflowY="auto"
    >
      {isDesktop ? <Sidebar/> : <Navbar/>}
      <Box bg={useColorModeValue('white', 'black')} pt={{base: '0', lg: '3'}} flex="1">
        <Box bg={useColorModeValue('blue.50', 'gray.900')} borderTopLeftRadius={{base: 'none', lg: '2rem'}} height="full">
          <Container p="6" flex="1" maxW="7xl">
            <Switch>
              <Route path="/" component={DashboardView}/>
            </Switch>
          </Container>
        </Box>
      </Box>
    </Flex>
  )
}
