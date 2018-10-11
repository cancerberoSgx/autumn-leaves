import { ArgumentType, Command, CommandTemplate, Interpolate, SizedImageContext, list } from "../..";

export interface SpreadContext extends Partial<SizedImageContext> {
  amount: number,
  interpolate: Interpolate
}
// -spread amount -interpolate SOMETHING https://www.imagemagick.org/script/command-line-options.php#spread
export const SpreadTemplate: CommandTemplate<SpreadContext> = {
  id: 'Spread',
  name: 'Spread Paint',
  commands: [["convert", "$INPUT",  "-spread", "5", "$OUTPUT"]],
  description: `displace image pixels by a random amount. 
The argument amount defines the size of the neighborhood around each pixel from which to choose a candidate pixel to blend. 
The lookup is controlled by the -interpolate setting.`,
  template: context => JSON.parse(`[["convert", "$INPUT", "-interpolate", "${context.interpolate}", "-spread", "${context.amount}", "$OUTPUT"]]`) as Command[],
  defaultTemplateContext: {
    amount: 5, 
    interpolate: Interpolate.Average
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
      list: list(Interpolate).map(m => ({ name: m, id: m }))
    },
  ]
}
