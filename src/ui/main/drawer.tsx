import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import * as React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import { List, Divider, Drawer, IconButton, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Home, FormatPaint, CameraAlt, Transform, PlaylistPlay, FileDownload, ImageAspectRatio } from '@material-ui/icons';
import { ListItemProps } from '@material-ui/core/ListItem';
// import { ToolbarSeparator } from '@material-ui/';

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
})

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


    <List component="nav" dense={true}>

      <ListItem component={(props: ListItemProps & LinkProps) => <Link to="" {...props} onClick={() => { }} />}>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>

      <ListItem component={(props: ListItemProps & LinkProps) => <Link to="imageFrame" {...props} />}>
        <ListItemIcon>
          <ImageAspectRatio />
        </ListItemIcon>
        <ListItemText primary="Command template editor" />
      </ListItem>

      <ListItem component={(props: ListItemProps & LinkProps) => <Link to="convertDemo" {...props} />}>
        <ListItemIcon>
          <Transform />
        </ListItemIcon>
        <ListItemText primary="Convert playground" />
      </ListItem>

      <ListItem component={(props: ListItemProps & LinkProps) => <Link to="cypher" {...props} />}>
        <ListItemIcon>
          <Transform />
        </ListItemIcon>
        <ListItemText primary="Cypher images" />
      </ListItem>

      {/* <ListItem> <ToolbarSeparator></ToolbarSeparator></ListItem> */}

      {/* <ListItem component={(props: ListItemProps & LinkProps) => <Link to="compositeCommands" {...props} />}>
        <ListItemIcon>
          <PlaylistPlay />
        </ListItemIcon>
        <ListItemText primary="Composite Commands" />
      </ListItem>

      <ListItem component={(props: ListItemProps & LinkProps) => <Link to="SimpleCLITransformationEditor" {...props} />}>
        <ListItemIcon>
          <FormatPaint />
        </ListItemIcon>
        <ListItemText primary="Basic CLI transformation tool" />
      </ListItem> */}

      {/* <ListItem component={(props: ListItemProps & LinkProps) => <Link to="TestImages" {...props} />}>
        <ListItemIcon>
          <CameraAlt />
        </ListItemIcon>
        <ListItemText primary="See test images" />
      </ListItem> */}

      {/* <ListItem component={(props: ListItemProps & LinkProps) => <Link to="download" {...props} />}>
        <ListItemIcon>
          <FileDownload />
        </ListItemIcon>
        <ListItemText primary="Download Results" />
      </ListItem> */}

      {/* <ListItem component={(props: ListItemProps & LinkProps) => <Link to="ImageHandleEditorTest" {...props} />}>
        <ListItemIcon>
          <FileDownload />
        </ListItemIcon>
        <ListItemText primary="ImageHandleEditorTest" />
      </ListItem> */}
      


    </List>

  </Drawer>
)
export default withStyles(styles, { withTheme: true })(drawer)
