import { Button, Grid } from '@material-ui/core';
import AppBarComponent from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import * as classNames from 'classnames';
import * as React from 'react';
import Main from './mainContent';
import Drawer, { drawerWidth } from './drawer';
import AppBarIcons from './AppBarIcons';

const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  'appBarShift-right': {
    marginRight: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  'content-right': {
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  'contentShift-right': {
    marginRight: 0,
  },
});

export interface AppBarProps extends WithStyles<typeof styles> { }
export interface AppBarState { open: boolean, anchor: string }
export class AppBarNaked extends React.Component<AppBarProps, AppBarState> {
  state = {
    open: false,
    anchor: 'left',
  };

  handleDrawerOpen() {
    this.setState({ open: true });
  };

  handleDrawerClose() {
    this.setState({ open: false });
  };

  render(): React.ReactNode {

    const { classes, theme }: { classes: any, theme?: Theme } = this.props
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBarComponent
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [(classes as any)[`appBarShift-${this.state.anchor}`]]: open,
            })}
          >
            <Toolbar disableGutters={!open}>
              <Grid container spacing={24} >
                <Grid item xs={6} sm={6}>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => this.handleDrawerOpen()}
                    className={classNames('toolbar-button', classes.menuButton, open && classes.hide)}
                  >
                    <MenuIcon />
                  </IconButton>
                  <span>Sebastian Gurin home page</span>
                </Grid>
                <Grid item xs={6} sm={6} style={{flexBasis: '50%'}}>

                  <AppBarIcons/>
                </Grid>
              </Grid>


            </Toolbar>
          </AppBarComponent>

          <Drawer open={this.state.open} handleDrawerClose={() => this.handleDrawerClose()} />

          <main
            className={classNames(classes.content, classes[`content-${this.state.anchor}`], {
              [classes.contentShift]: open,
              [classes[`contentShift-${this.state.anchor}`]]: open,
            })} >
            <Main />
          </main>
        </div>
      </div>
    );
  }
}

export const AppBar = withStyles(styles, { withTheme: true })(AppBarNaked);