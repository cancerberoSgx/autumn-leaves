import { registerMagickTemplates } from "../magickTemplates"
import { MagickTemplate, MagickTemplateArgument } from "../MagickTemplate";
import { FrameDecorPolaroid } from './FrameDecorPolaroid';


export function registerAllMagickTemplateFrameDecorations() {

const templates: MagickTemplate[] = [
new FrameDecorPolaroid(),
]
registerMagickTemplates(templates)
}
