import { registerMagickTemplates } from "../magickTemplates"
import { MagickTemplate, MagickTemplateArgument } from "../MagickTemplate";
import { FrameDecorPolaroid } from './FrameDecorPolaroid';
import { FrameDecorLabeling } from './FrameDecorLabeling';


export function registerAllMagickTemplateFrameDecorations() {

const templates: MagickTemplate[] = [
new FrameDecorPolaroid(),
new FrameDecorLabeling()
]
registerMagickTemplates(templates)
}
