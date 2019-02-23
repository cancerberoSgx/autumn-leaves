import { createGenerateClassName, jssPreset, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { create } from 'jss';
import * as React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { CssBaseline } from '@material-ui/core';
import { AppBar } from './appBar';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import theme from './theme';
import { config } from './config';
import { addExecuteListener } from 'wasm-imagemagick';

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());

const Router = config.hashRouter ? HashRouter : BrowserRouter

export default function MyApp() {
  return (
    <MuiThemeProvider theme={theme}>
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <React.Fragment>
          <CssBaseline />
          <Router>
            <AppBar />
          </Router>
        </React.Fragment>
      </JssProvider>
    </MuiThemeProvider>
  )
}
