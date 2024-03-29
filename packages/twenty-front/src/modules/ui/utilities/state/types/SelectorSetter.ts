import {
  DefaultValue,
  GetRecoilValue,
  ResetRecoilState,
  SetRecoilState,
} from 'recoil';

export type SelectorSetter<T, P> = (
  param: P,
) => (
  opts: { set: SetRecoilState; get: GetRecoilValue; reset: ResetRecoilState },
  newValue: T | DefaultValue,
) => void;
