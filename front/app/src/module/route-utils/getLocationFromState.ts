import type { LocationDescriptorObject, Location } from 'history';
import type FromLocationState from './FromLocationState';

export default function getLocationFromState(
  location: Location<unknown>,
  fallback: Location['pathname'] | LocationDescriptorObject<unknown>
): LocationDescriptorObject<unknown> {
  return (
    (location.state as FromLocationState)?.from ||
    (typeof fallback === 'string' ? { pathname: fallback } : fallback)
  );
}
