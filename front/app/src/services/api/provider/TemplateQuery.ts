import * as nunjucks from 'nunjucks';
import { Environment } from 'nunjucks';

export default class TemplateQuery {
  //
  public version: string;

  constructor(version: string) {
    this.version = version;
  }

  setVersion(version: string) {
    this.version = version;
    // if version = 21.11.4.14, then this.versionCompare(version,'19.01.01') = 1
    // if version = 21.11.4.14, then this.versionCompare(version,'21.11.4.15') = -1
    // '1' - is less , '0' - eq , '-1' - big
    // console.info('compare 21.10.3.14', this.versionCompare(this.version, '21.4.1'));
  }

  versionCompare(v1: string, v2: string): number {
    const lexicographical = false;
    const zeroExtend = false;

    let v1parts: Array<any> = (v1 || '0').trim().split('.');
    let v2parts: Array<any> = (v2 || '0').trim().split('.');

    function isValidPart(x: string) {
      return (lexicographical ? /^\d+[A-Za-zαß]*$/ : /^\d+[A-Za-zαß]?$/).test(x);
    }

    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
      return NaN;
    }
    if (zeroExtend) {
      while (v1parts.length < v2parts.length) v1parts.push('0');
      while (v2parts.length < v1parts.length) v2parts.push('0');
    }

    if (!lexicographical) {
      v1parts = v1parts.map((x) => {
        const match = /[A-Za-zαß]/.exec(x);
        return Number(match ? x.replace(match[0], `.${x.charCodeAt(match.index)}`) : x);
      });
      v2parts = v2parts.map((x) => {
        const match = /[A-Za-zαß]/.exec(x);
        return Number(match ? x.replace(match[0], `.${x.charCodeAt(match.index)}`) : x);
      });
    }

    for (let i = 0; i < v1parts.length; i += 1) {
      if (v2parts.length === i) {
        return 1;
      }

      if (v1parts[i] === v2parts[i]) {
        // skip
      } else if (v1parts[i] > v2parts[i]) {
        return 1;
      } else {
        return -1;
      }
    }

    if (v1parts.length !== v2parts.length) {
      return -1;
    }
    return 0;
  }

  public __version_GE(v: string): boolean {
    //  '0' - eq , '-1' - big
    return this.versionCompare(this.version, v) > 0;
  }

  private getTemplateEnvironment(): Environment {
    const env = new Environment();
    // haveNormalizeQueries
    env.addGlobal('version', this.version);
    env.addGlobal('version_ge', (v: string) => {
      return this.__version_GE(v);
    });
    return env;
  }

  template(sql: string, context: object = {}): string {
    // https://mozilla.github.io/nunjucks/templating.html#math
    return nunjucks.compile(sql, this.getTemplateEnvironment()).render(context);
  }
}
