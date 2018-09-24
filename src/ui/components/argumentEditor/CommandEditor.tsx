import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
// import { Argument, ArgumentType } from './types';
// import { ArgumentEditorState, ArgumentEditorProps } from './types';
import { Color } from 'csstype';
import { ArgumentEditorProps, ArgumentEditorState, ArgumentType } from '../../page/convertDemo/CommandTemplate';


const styles = (theme: Theme) => createStyles({
  root: {
  }
});
export interface CommandEditorProps extends ArgumentEditorProps<Color> , WithStyles<typeof styles>{

}
export interface CommandEditorState extends ArgumentEditorState<Color>{

}
export class CommandEditor extends React.Component<CommandEditorProps, CommandEditorState> {

  state: CommandEditorState = {
  }

  constructor(props: CommandEditorProps, state: CommandEditorState) {
    super(props, state)
  }

  render(): React.ReactNode {
    const { classes, theme }: { classes: any, theme?: Theme } = this.props
    return (
      <div className={classes.root}>
        {/* TODO: split this to different classes responsibilities: */}
        {(()=>{
          if(this.props.argument.type===ArgumentType.color||this.props.argument.type===ArgumentType.text){
            return <input type={this.props.argument.type}/>
          }
        })()}

      </div>
    )
  }

  /**
   * implementation must notify here when the value changes in the UI
   */
  valueChanged(value: Color){
    this.setState({...this.state, value})
  }
}
export const ArgumentEditor = withStyles(styles, { withTheme: true })(CommandEditor as any);

