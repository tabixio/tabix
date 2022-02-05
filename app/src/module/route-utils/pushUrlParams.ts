import type { History } from 'history';

export type UrlParams = Record<string, unknown>;

export default function pushUrlParams<Params extends object = UrlParams>(
  history: History,
  paramsObject: Params,
  decode = true
): void {
  const urlParams = new URLSearchParams(history.location.search);
  Object.entries(paramsObject).forEach(([k, v]) => {
    if (v == null) {
      urlParams.delete(k);
    } else {
      urlParams.set(k, String(v));
    }
  });

  const search = decode ? decodeURIComponent(urlParams.toString()) : urlParams.toString();
  history.push({
    pathname: history.location.pathname,
    state: history.location.state,
    search,
  });
}
