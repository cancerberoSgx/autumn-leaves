export interface Editor<T> {
  load(t: T): void
  fetch(): T
}