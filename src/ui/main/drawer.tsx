import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import * as React from 'react';
import { Link } from 'react-router-dom';

export const drawerWidth = 240;

const styles = (theme: Theme) => createStyles({
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    paddingLeft: '10px',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    ...theme.mixins.toolbar,
  }
});

const drawer = (props: WithStyles<typeof styles> & { open: boolean, handleDrawerClose: () => void }) => (
  <Drawer
    variant="persistent"
    anchor="left"

    open={props.open}
    classes={{
      paper: props.classes.drawerPaper,
    }}
  >
    <div className={props.classes.drawerHeader}>
      <IconButton onClick={props.handleDrawerClose}>
        {props.theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </IconButton>
    </div>
    <Divider />

    <Link to="">Home</Link>
    <Divider />

    <Link to="page1">Page 1</Link>
    <Divider />

    <Link to="SimpleCLITransformationEditor">Basic CLI transformation tool</Link>
    <Divider />

    <Link to="TestImages">See test images</Link>
    <Divider />

    <Link to="convertDemo">Convert test page</Link>
    <Divider />

    <Link to="download">Download Results</Link>
  </Drawer>
);

export default withStyles(styles, { withTheme: true })(drawer);
