import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { ArgumentEditorProps, ArgumentEditorState } from 'imagemagick-browser';
import * as React from 'react';

const styles = (theme: Theme) => createStyles({
  root: {
  }
})

export interface SelectOneEditorProps extends ArgumentEditorProps<string>, WithStyles<typeof styles> {
  select: { id: string, name: string }[]
}

export interface SelectOneEditorState extends ArgumentEditorState<string> {
}

export class SelectOneEditor extends React.Component<SelectOneEditorProps, SelectOneEditorState> {

  state: SelectOneEditorState = {
    value: ''
  }

  constructor(props: SelectOneEditorProps, state: SelectOneEditorState) {
    super(props, state)
    this.setState({ ...this.state, value: props.value || '' })
    // this.state.value = props.value || '#ffff11'
  }

  render(): React.ReactNode {
    const { classes, theme }: { classes: any, theme?: Theme } = this.props
    return (
      <span className={classes.root}>
        <select onChange={e => this.inputChange(e)}>
          {
            this.props.select.map(select =>
              <option id={select.id} key={select.id}>{select.name}
              </option>)
          }
        </select>
      </span>
    )
  }

  inputChange(changeEvent: React.ChangeEvent<HTMLSelectElement>) {
    const value = changeEvent.target.selectedOptions[0].id
    this.setState({ value })
    this.props.onChange({ value, changeEvent, argument: this.props.argument })
  }
}

export const ArgumentEditor = withStyles(styles, { withTheme: true })(SelectOneEditor as any)

