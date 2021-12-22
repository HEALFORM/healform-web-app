import React from 'react';
// @ts-ignore
import { Router, Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";
import DashboardView from "./views/Dashboard";
import Loading from "./components/Loading";
import {ThemeProvider} from '@emotion/react'
import theme from "@healform/design-tokens";
import {GridColumn, GridRow, GridWrap} from "emotion-flex-grid";
import ChatwootWidget from './components/ChatwootWidget';

const grid = {
  breakpoints: {
    xs: theme.breakpoints.xs,
    s: theme.breakpoints.sm,
    m: theme.breakpoints.md,
    l: theme.breakpoints.lg,
    xl: theme.breakpoints.xl,
    xxl: theme.breakpoints.xxl
  },
  spacings: {
    xs: 5,
    s: 10,
    m: 15,
    l: 20,
    xl: 30,
    xxl: 60
  },
  defaults: {
    grid: {
      wrap: {
        maxWidth: 1400
      }
    }
  }
}

const App = () => {
  const { isLoading, error, user } = useAuth0();
  console.log(user);

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Router history={history}>
        <div id="App">
          <ThemeProvider theme={grid}>
            <GridColumn mx={['s', 'm']}>
              <GridWrap>
                <Switch>
                  <Route path="/" component={DashboardView}/>
                </Switch>
              </GridWrap>
            </GridColumn>
          </ThemeProvider>
        </div>
      </Router>
      <ChatwootWidget user={user} />
    </>
  );
}

export default App;
