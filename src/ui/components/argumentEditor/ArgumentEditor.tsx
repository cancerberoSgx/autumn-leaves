import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Color } from 'csstype';
import { ArgumentEditorProps, ArgumentEditorState, ArgumentType } from '../../page/convertDemo/CommandTemplate';


const styles = (theme: Theme) => createStyles({
  root: {
  },
  hidden: {
    display: 'none'
  }
});
export interface ColorPickerEditorProps extends ArgumentEditorProps<Color>, WithStyles<typeof styles> {
}
export interface ColorPickerEditorState extends ArgumentEditorState<Color> {

}
export class ColorPickerEditor extends React.Component<ColorPickerEditorProps, ColorPickerEditorState> {

  state: ColorPickerEditorState = {
    value: '#ffffff'
  }

  // constructor(props: ColorPickerEditorProps, state: ColorPickerEditorState) {
  //   super(props, state)
  // }

  render(): React.ReactNode {
    const { classes, theme }: { classes: any, theme?: Theme } = this.props
    // if(this.props.argument.type !== ArgumentType.color){
    //   return (<div className={classes.hidden}></div>)
    // }
    return (
      <span className={classes.root}>
        <input type="color" onChange={e=>this.inputChange(e)} />
      </span>
    )
  }

  inputChange(e: React.ChangeEvent<HTMLInputElement>){
    this.props.onChange({value: e.target.value, changeEvent: e, argument: this.props.argument})
    
  }

  /**
   * implementation must notify here when the value changes in the UI
   */
  valueChanged(value: Color) {
    this.setState({ ...this.state, value })
  }
}
export const ArgumentEditor = withStyles(styles, { withTheme: true })(ColorPickerEditor as any);

