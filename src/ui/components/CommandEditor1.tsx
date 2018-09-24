// import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
// import * as React from 'react';

// const styles = (theme: Theme) => createStyles({
//   root: {
//     backgroundColor: 'pink'
//   }
// });

// export interface CommandEditor1Props extends WithStyles<typeof styles> {
//   initialToggleState: boolean
// }
// export interface CommandEditor1State {
//   toggle: boolean
// }

// export class CommandEditor1Naked extends React.Component<CommandEditor1Props, CommandEditor1State> {

//   state = {
//     toggle: true
//   }

//   constructor(props: CommandEditor1Props, state: CommandEditor1State) {
//     super(props, state)
//     this.setState({ toggle: props.initialToggleState || false })
//   }

//   render(): React.ReactNode {
//     const { classes, theme }: { classes: any, theme?: Theme } = this.props
//     const { toggle } = this.state
//     return (
//       <div className={classes.root}>
//         <textarea defaultValue="[]"></textarea>
//       </div>
//     )
//   }
// }

// export const CommandEditor1 = withStyles(styles, { withTheme: true })(CommandEditor1Naked as any);
