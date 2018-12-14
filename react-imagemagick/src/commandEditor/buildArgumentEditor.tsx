import { Argument, ArgumentChangeEvent, ArgumentType, Command, CommandEditorProps as CommandEditorPropsBase, SizedImageContext, TemplateContext } from 'imagemagick-browser';
import * as React from 'react';
import { ColorPickerEditor } from './ColorPickerEditor';
import { ImagePointsEditor } from './ImagePointsEditor';
import { NumberEditor } from './NumberEditor';
import { SelectOneEditor } from './SelectOneEditor';
import { BooleanEditor } from './BooleanEditor';
import { SelectFileEditor } from './SelectFileEditor';
import { TextEditor } from './TextEditor';

export function buildArgumentEditor<T>(arg: Argument, templateContext: SizedImageContext, onChange: (e: ArgumentChangeEvent<T>) => void, imageSrc: string) {

  const val = (templateContext as any)[arg.id]

  if (arg.type === ArgumentType.color) {
    return <ColorPickerEditor
      value={val + ''}
      argument={arg}
      onChange={onChange as any}
    />
  } 
else if (arg.type === ArgumentType.text) {
    return <TextEditor
      value={val + ''}
      argument={arg}
      onChange={onChange as any}
    />
  }
  else if (arg.type === ArgumentType.number) {
    const value = arg.isInteger ? parseInt(val + '', 10) : parseFloat(val + '')
    return <NumberEditor
      value={value}
      argument={arg}
      isInteger={arg.isInteger || false}
      onChange={onChange as any}
    />
  }
  else if (arg.type === ArgumentType.boolean) {
    const value = val
    return <BooleanEditor
      value={value}
      argument={arg}
      onChange={onChange as any}
    />
  }
  else if (arg.type === ArgumentType.selectOne) {
    return <SelectOneEditor
      value={val + ''}
      select={arg.list}
      argument={arg}
      onChange={onChange as any}
    />
  }
  else if (arg.type === ArgumentType.file) {
    return <SelectFileEditor
      value={val}
      argument={arg}
      onChange={onChange as any}
    />
  }
  else if (arg.type === ArgumentType.imagePoints) {
    return <ImagePointsEditor
      imageWidth={templateContext.imageWidth}
      imageHeight={templateContext.imageHeight}
      imageSrc={imageSrc}
      value={arg.points}
      argument={arg}
      onChange={onChange as any}
    />
  }
  else {
    return <div>Sorry, dont know how to represent {arg.type}, yet</div>
  }
}