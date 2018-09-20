// import * as React from 'react';
// import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
// import { doImageMagick } from '../../imagemagick';

// const styles = (theme: Theme) => createStyles({
//   paper: {
//     color: theme.palette.text.secondary,
//     width: '100%'
//   },
//   input: {
//     width: '100%',
//     height: '80px'
//   }
// });

// function render(props: WithStyles<typeof styles>) {
//   const { classes } = props;

//   return (
//     <Grid container spacing={24}>
//       <Grid item xs={12}>
//         <Paper className={classes.paper}>
//           <p>IM Command</p>
//           <textarea className={classes.paper + ' input'}>["convert", "srcFile.png", "-rotate", "90", "-resize", "200%", "out.png"]</textarea>
//           <button className="execute" onClick={doImageMagick}>Execute</button>

//           <p>Suggestions:</p>
//           <ul>
//             <li>
//               ["convert", "srcFile.png",  "-morphology", "Hit-and-Miss" , "2x1:1,0", "out.png"]
//               </li>
//             <li>
//               ["convert", "logo:", "-rotate", "90", "-resize", "200%", "out.png"]
//             </li>
//             <li>
//             ["convert", "logo:", "-morphology", "Convolve" , "3x3: 0.0,0.5,0.0  0.5,1.0,0.5   0.0,0.5,0.0", "out.png"]
//             </li>
//           </ul>
//           <p>Source image: </p>
//           <img id="srcImage" src="gnu.jpg" />

//           <p>Rotated and enlarged image: </p>
//           <img id="rotatedImage" />
//           <br /><br />
//         </Paper>
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <Paper className={classes.paper}><h3 className="page-home">home
//         </h3>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// }

// export default withStyles(styles)(render);