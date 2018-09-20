import * as React from 'react';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button, Typography } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
  fileDropTarget: {
    display: 'block',
    height: '140px',
    backgroundColor: 'green'
  }
});

function page1(props: WithStyles<typeof styles>) {
  const { classes } = props;

  return (
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <Paper>

              <Typography className={''}>
          <Button onClick={download}>Click to download result images</Button></Typography>

        </Paper>
      </Grid>
    </Grid>
  );
}


import { saveAs } from 'file-saver'
import * as JSZip from 'jszip'

function download() {
  var zip = new JSZip();
  zip.file("Hello.txt", "Hello World\n");
  var img = zip.folder("other");
  var blob = new Blob(["Hello, world!"], { type: "text/plain;charset=utf-8" });
  img.file("other.txt", blob)
  zip.generateAsync({ type: "blob" }).then(function (content) {
    saveAs(content, "example.zip");
  });
}
export default withStyles(styles)(page1);