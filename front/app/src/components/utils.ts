/* eslint-disable import/prefer-default-export */

export function error2status(hasError: boolean) {
  return hasError ? 'error' : undefined;
}
