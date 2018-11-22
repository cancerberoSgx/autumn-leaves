import { IMInterpolate } from "wasm-imagemagick";
import { ArgumentType, Command, CommandTemplate, list, SizedImageContext } from "../..";
import { CommandTemplateTag } from "../commandTemplate";

export interface SpreadContext extends Partial<SizedImageContext> {
  amount: number,
  interpolate: IMInterpolate
}
// -spread amount -interpolate SOMETHING https://www.imagemagick.org/script/command-line-options.php#spread
export const SpreadTemplate: CommandTemplate<SpreadContext> = {
  id: 'Spread',
  name: 'Spread Paint',
  tags: [CommandTemplateTag.artistic],
  description: `displace image pixels by a random amount. 
The argument amount defines the size of the neighborhood around each pixel from which to choose a candidate pixel to blend. 
The lookup is controlled by the -interpolate setting.`,
  template: context => JSON.parse(`[["convert", "$INPUT", "-interpolate", "${context.interpolate}", "-spread", "${context.amount}", "$OUTPUT"]]`) as Command[],
  defaultTemplateContext: {
    amount: 5, 
    interpolate: IMInterpolate.Average
  },
  arguments: [
    { 
      type: ArgumentType.number, 
      id: 'amount', 
      name: 'amount', 
      description: 'TODO' 
    },
    {
      type: ArgumentType.selectOne,
      id: 'interpolate',
      name: 'interpolate',
      description: 'TODO',
      list: list(IMInterpolate).map(m => ({ name: m, id: m }))
    },
  ]
}
