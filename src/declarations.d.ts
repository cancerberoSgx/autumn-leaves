declare module 'react-jss';
declare module 'react-jss/lib/JssProvider';

declare module 'enzyme-adapter-react-16';

declare module 'debounce' {
  export function debounce<A extends Function>(f: A, interval?: number, immediate?: boolean): A & { clear(): void; };
}
// declare function debounce<A extends Function>(f: A, interval?: number, immediate?: boolean): A & { clear(): void; };