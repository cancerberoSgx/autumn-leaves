import { createGenerateClassName, jssPreset, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { create } from 'jss';
import * as React from 'react';
import JssProvider from 'react-jss/lib/JssProvider';
import { CssBaseline } from '@material-ui/core';
import {AppBar} from './appBar';
import { BrowserRouter } from 'react-router-dom';
import theme from './theme';


const generateClassName = createGenerateClassName();
const jss = create(jssPreset());

export default function MyApp() {
  return (
    <MuiThemeProvider theme={theme}>
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <React.Fragment>
        <CssBaseline />
        <BrowserRouter>
          <AppBar />
        </BrowserRouter>
      </React.Fragment>
    </JssProvider>
    </MuiThemeProvider>
  )
}