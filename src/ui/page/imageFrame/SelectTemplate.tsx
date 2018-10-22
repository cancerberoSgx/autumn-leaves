import { FormControl, FormHelperText, Input, InputLabel, MenuItem, Select } from '@material-ui/core';
import { CommandTemplate } from 'imagemagick-browser';
import * as React from 'react';

export interface SelectTemplateProps {
  templates: CommandTemplate[]
  selected: CommandTemplate
  onSelect: (event: { selectedTemplateId: string }) => void
}

export interface SelectTemplateState {
  selected?: CommandTemplate
}

export class SelectTemplate extends React.Component<SelectTemplateProps, SelectTemplateState> {

  state: SelectTemplateState = {
  }

  constructor(props: SelectTemplateProps, state: SelectTemplateState) {
    super(props, state)
    this.state.selected = props.selected
  }

  render(): React.ReactNode {
    console.log('select-template', this.state.selected);

    return (
      <div> 
        <FormControl>
          <InputLabel htmlFor="template-helper">Command Template</InputLabel>
          <Select
            value={this.state.selected.id}
            onChange={e => {
              this.props.onSelect({ selectedTemplateId: e.target.value });
              this.setState({ ...this.state, selected: this.props.templates.find(t => t.id === e.target.value) })
            }}
            input={<Input name="template" id="template-helper" />}
          >
            {this.props.templates.map((t: CommandTemplate, i: number) =>
              <MenuItem value={t.id} title={t.description} selected={t.id === this.state.selected.id}>{t.name}</MenuItem>
            )}
          </Select>
          <FormHelperText>Select one template to customize:</FormHelperText>
        </FormControl>
      </div>
    )
  }
}
