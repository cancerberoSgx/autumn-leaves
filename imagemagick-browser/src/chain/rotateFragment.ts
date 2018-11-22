// import { Fragment, FragmentType } from './chain';


// export interface RotateFragment extends Fragment {
//   degrees: number
// }

// export class RotateFragmentImpl implements RotateFragment {
//   type: FragmentType
//   constructor(public degrees: number) {
//     this.type = FragmentType.rotate;
//   }
//   toCommand(): string[] {
//     return ['-rotate', this.degrees + '']
//   }
// }