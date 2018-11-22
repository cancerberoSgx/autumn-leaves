// import { Fragment, FragmentType } from './chain';
// import { MagickInputFile } from '..';

// export interface ImagesFragment extends Fragment {
//   images: MagickInputFile[]
// }

// export class ImagesFragmentImpl implements ImagesFragment {
//   type: FragmentType
//   constructor(public images: MagickInputFile[]) {
//     this.type = FragmentType.image;
//   }
//   toCommand(): string[] {
//     return this.images.map(i => i.name)
//   }
// }