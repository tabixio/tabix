import type { LocationDescriptorObject, Location, LocationDescriptor } from 'history';
import type FromLocationState from './FromLocationState';

export default function getLocationWithState(
  to: LocationDescriptor<unknown>,
  from: Location<unknown> | Location['pathname']
): LocationDescriptorObject<FromLocationState> {
  const fromState: FromLocationState['from'] =
    typeof from === 'string'
      ? {
          pathname: from,
          search: '',
          state: null,
        }
      : {
          pathname: from.pathname,
          search: from.search,
          state: from.state,
        };

  return typeof to === 'string'
    ? { pathname: to, state: { from: fromState } }
    : {
        ...to,
        state: {
          ...(to.state && typeof to.state === 'object' ? to.state : undefined),
          from: fromState,
        },
      };
}
