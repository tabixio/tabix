import type { Location } from 'history';

export default interface FromLocationState {
  from: Pick<Location<unknown>, 'pathname' | 'search' | 'state'>;
}
