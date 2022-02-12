export default class TabixUpdate {
  static getRequestInit(query: object): RequestInit {
    const init: RequestInit = {
      mode: 'cors',
      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept-Encoding': 'gzip',
      },
      body: JSON.stringify(query),
    };
    return init;
  }

  static getTabixBuildVersion(): string {
    // See webpack.DefinePlugin => ('./package.json').version
    // @ts-ignore
    return `${BUILD_VERSION}`.trim();
  }

  static _check(ch?: string): Promise<void> {
    // UpdateTabix
    // CompatibilityCH
    const versionTabix = TabixUpdate.getTabixBuildVersion();
    let url = '';
    if (ch === undefined) {
      // if `&f=1` force show update -)

      url = `https://tabix.io/checkVersion/UpdateTabix?&f=1&dt=${Date.now()}&version=${encodeURIComponent(
        versionTabix
      )}`;
    } else {
      url = `https://tabix.io/checkVersion/CompatibilityCH?dt=${Date.now()}&version=${encodeURIComponent(
        versionTabix
      )}`;
    }
    const data = {
      tabix: versionTabix,
      clickhouse_compatibility: ch,
    };

    const init = TabixUpdate.getRequestInit(data);
    return fetch(url, init).then((response) => {
      const contentType = response.headers.get('content-type');
      if (
        contentType &&
        contentType.includes('application/json') &&
        response.status >= 200 &&
        response.status < 300
      ) {
        return response.json();
      }
      return response.text();
    });
  }

  static async checkVersionUpdateTabix(
    ch?: string
  ): Promise<{ haveUpdate: boolean; newVersion: string; link: string }> {
    const d = await TabixUpdate._check(ch);
    let haveUpdate = false;

    if (d['currentVersion'] && d['changelogUrl']) {
      if (d['update']) {
        haveUpdate = true;
      }
    }
    return {
      newVersion: d['currentVersion'],
      link: d['changelogUrl'],
      haveUpdate,
    };
  }
}
