// Tests preparedStatement
//
import TemplateQuery from '../TemplateQuery';

describe('Generic->StatementQuery->VersionCompare', () => {
  const c = new TemplateQuery('21.4');
  it('Generic->StatementQuery->VersionCompare', () => {
    expect(c.versionCompare('21.11.00', '22.11.22')).toBe(-1);
    expect(c.versionCompare('21.11.00', '21.11.00')).toBe(0);
    expect(c.versionCompare('22.11.00', '21.11.00')).toBe(1);
  });
});
describe('Generic->StatementQuery->Template', () => {
  const c = new TemplateQuery('21.4');

  it('Generic->StatementQuery->Template->version_ge 1', () => {
    const sql = `{% if version_ge('21.3') -%}V21.4{% else -%}20.0{% endif -%}`;
    expect(c.template(sql, {})).toContain('V21.4');
  });
  it('Generic->StatementQuery->Template->version_ge 2', () => {
    const sql = `{% if version_ge('25.3') -%}V25.3{% else -%}V20.0{% endif -%}`;
    expect(c.template(sql, {})).toContain('V20.0');
  });

  it('Generic->StatementQuery->Template->version var', () => {
    const sql = `VV{{ version }}VV`;
    expect(c.template(sql, {})).toContain('VV21.4VV');
  });

  it('Generic->StatementQuery->Template->custom var', () => {
    const sql = `[{{ v }},{{ y }}]`;
    expect(c.template(sql, { v: 1, y: 'TXT' })).toContain('[1,TXT]');
    expect(c.template(sql, { v: false, y: 'TXT' })).toContain('[false,TXT]');
  });

  it('Generic->StatementQuery->Template->custom var if', () => {
    const sql = `[{% if v1 and v2 %}TRUE{%else%}FALSE{% endif %}]`;
    expect(c.template(sql, { v1: 1, v2: 0 })).toContain('[FALSE]');
    expect(c.template(sql, { v1: 1, v2: 1 })).toContain('[TRUE]');
    expect(c.template(sql, { v1: true, v2: true })).toContain('[TRUE]');
    expect(c.template(sql, { v1: false, v2: true })).toContain('[FALSE]');
  });
});
