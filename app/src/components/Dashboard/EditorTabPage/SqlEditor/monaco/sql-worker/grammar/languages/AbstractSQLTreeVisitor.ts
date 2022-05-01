import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { RuleNode } from 'antlr4ts/tree/RuleNode';
import {
  ClauseTokenType,
  QToken,
  QueryRelation,
  Range,
  Relation,
  TableRelation,
} from '../CommonSQL';
import { Token } from 'antlr4ts';

export const ROOT_QUERY_NAME = '[ROOT_QUERY]';

export abstract class AbstractSQLTreeVisitor<Result> extends AbstractParseTreeVisitor<Result> {
  protected relationSeq = 0;
  public debug = false;
  protected currentRelation = new QueryRelation(this.getNextRelationId());

  getNextRelationId(): string {
    return `result_${this.relationSeq++}`;
  }

  protected listRelations: Map<string, Relation> = new Map();
  protected lastRelation: QueryRelation | undefined;
  protected tokensCurrentPoints: Map<string, number> = new Map();

  abstract visitNode(ctx: RuleNode): void;

  protected tokensList: Array<QToken> = [];

  // abstract getCurrentRelation(): void;

  public setTokenList(tokensList: Array<QToken>): void {
    this.tokensList = tokensList;
  }

  public getRelations(): Map<string, Relation> {
    return this.listRelations;
  }

  public onRelation(_relation: QueryRelation | TableRelation, _alias?: string): void {
    if (_alias && _relation instanceof QueryRelation) _relation.alias = _alias;
    this.listRelations.set(_relation.id, _relation);
    return;
  }

  public getTokens(): Array<QToken> {
    return this.tokensList;
  }

  public log(...args: any[]) {
    if (this.debug) {
      // console.log(structuredClone({ a: 1 }));
      // }
      //   function copyObject(o: any): object {
      //     return JSON.parse(JSON.stringify(o));
      //   }
      //
      //   function copyIfRegularObject(o: any): any {
      //     const isRegularObject = typeof o === 'object' && !(o instanceof RegExp);
      //     return isRegularObject ? copyObject(o) : o;
      //   }
      //
      //   //const sargs = [].slice.call(args);
      // const argsWithObjectCopies = args.map(structuredClone);
      console.log(...args);
      //   // return console.log.apply(console, argsWithObjectCopies);
    }
  }

  public unquote(text?: string): string {
    if (!text) {
      return '';
    }

    if (text.length < 2) {
      return text;
    }

    if (
      text.startsWith('"') ||
      text.startsWith('`') ||
      (text.startsWith("'") && text.startsWith(text[text.length - 1]))
    ) {
      return text.substr(1, text.length - 2);
    }

    return text;
  }

  public applyToken(start: Token, stop: Token, clause: ClauseTokenType) {
    this.log(`applyToken ${clause}, range [ ${start.tokenIndex}, ${stop.tokenIndex} ]`);

    this.tokensList.forEach((tok: QToken, index) => {
      if (
        start &&
        stop &&
        tok.tokenIndex >= start.tokenIndex &&
        tok.tokenIndex <= stop.tokenIndex
      ) {
        let set = true;
        const exists = this.tokensList[index].clause;
        if (exists) {
          // if set, set minimal size
          const sizeCur = exists.stop - exists.start;
          const sizeNew = stop.tokenIndex - start.tokenIndex;
          if (sizeNew >= sizeCur) {
            set = false;
          }
        }
        if (set) {
          this.tokensList[index].clause = {
            type: clause,
            start: start.tokenIndex,
            stop: stop.tokenIndex,
          };
        }
      }
    });
  }

  public applyTokenContext(start: Token, stop: Token, type: string) {
    this.tokensList.forEach((tok: QToken, index) => {
      if (
        start &&
        stop &&
        tok.tokenIndex >= start.tokenIndex &&
        tok.tokenIndex <= stop.tokenIndex
      ) {
        this.tokensList[index].context.push(type);
      }
    });
  }

  public visitChildren(ctx: RuleNode): Result {
    if (!ctx) {
      return {} as Result;
    }
    this.visitNode(ctx);
    for (let i = 0; i < ctx.childCount; i++) {
      const child = ctx.getChild(i);
      if (child && child.childCount) {
        child.accept(this);
      } else {
        //if (child && !child.children) {
        // visitor.visitNode(child);
        //}
      }
    }
    return {} as Result;
  }

  public getLastRelation(): QueryRelation | undefined {
    return this.lastRelation;
  }

  public getCurrentRelation(): void {
    // console.log('getCurrentRelationgetCurrentRelationgetCurrentRelationgetCurrentRelation');
    // console.log(this.lastRelation);
    // if (this.getRelations()) {
    //   this.availableColumns(this.getRelations());
    // }
  }

  public getToken(offset: number): QToken | undefined {
    return this.getTokens().find((st) => st.start <= offset && offset <= st.stop);
  }

  public getPositionByTokenOffset(offset: number): Range | undefined {
    const t = this.getToken(offset);
    if (!t) return;
    console.log('tokens', t);
    return {
      startLine: t.line,
      startColumn: t.start,
      endColumn: t.stop,
      endLine: t.line,
    };
  }

  private getColumnsFromTableRelation(relation: QueryRelation): Array<any> {
    let parent: null | string = null;

    if (relation.alias === ROOT_QUERY_NAME) {
      parent = null;
    } else {
      parent = relation.alias ?? 'NA_ERROR';
    }

    return (relation as QueryRelation).columns.map((q) => {
      return {
        label: q.label,
        parent: parent,
      };
    });
  }

  private getTableFromTableRelation(relation: TableRelation, parent = false): any {
    return {
      db: relation.tablePrimary.schemaName,
      name: relation.tablePrimary.tableName,
      alias: relation.tablePrimary.alias,
      parent: parent,
    };
  }

  public getRelation(offset: number): any {
    // Need find CaretScope , from tag?

    // Array<QueryRelation> | undefined {
    console.group('---------- getRelation ------------------');

    console.log('---------- getRelation ------------------');
    const t = this.getToken(offset);
    if (!t) return;

    console.log('token:', t.tokenIndex, t);
    console.log('this.getRelations()', this.getRelations());
    let dist = 999999;
    let qr: Relation | null = null;

    this.getRelations().forEach((rel, id) => {
      if (
        !rel.range ||
        rel.range?.stopTokenIndex === undefined ||
        rel.range?.startTokenIndex === undefined
      ) {
        console.warn('Can`t find range for rel', rel);
        return;
      }
      const tokRange = rel.range?.stopTokenIndex - rel.range?.startTokenIndex;
      if (rel.range?.startTokenIndex <= t.tokenIndex && t.tokenIndex <= rel.range?.stopTokenIndex) {
        console.log('Range:', tokRange, rel.range?.stopTokenIndex, rel.range?.startTokenIndex);
        if (dist > tokRange) {
          qr = rel;
          dist = tokRange;
        }
      }
    });
    // console.log(`---------- relation # ` + ((qr ?? 'null') + ` ------------------`);
    console.log('Result QR:', qr);

    // 1. Достаем relations.<0 => TableRelation}>.value.tablePrimary.alias,tableName,schemaName - указывает какие таблицы
    // 2. col

    console.groupEnd();
    const ret = {
      columms: [] as Array<any>,
      tables: [] as Array<any>,
    };

    // qr.relantion.<MAP >.columns - is sub comls & have alias: "ewp"
    if (!qr) return;
    // --- cols ----

    const cols = this.getColumnsFromTableRelation(qr);
    if (cols) {
      ret.columms.push(cols);
    }
    //
    // // --- tables --
    // (qr as QueryRelation).relations.forEach((relation) => {
    //   if (relation instanceof QueryRelation) {
    //     const cols = this.getColumnsFromTableRelation(relation);
    //     if (cols) {
    //       ret.columms.push(cols);
    //     }
    //
    //     relation.relations.forEach((sub_relation) => {
    //       if (sub_relation instanceof TableRelation) {
    //         sub_relation.tablePrimary &&
    //           ret.tables.push(this.getTableFromTableRelation(sub_relation, true));
    //       }
    //     });
    //   }
    //   if (relation instanceof TableRelation) {
    //     relation.tablePrimary && ret.tables.push(this.getTableFromTableRelation(relation, false));
    //   }
    // });

    return ret;
  }

  public getTables(): Array<string> | undefined {
    console.log('----x------------------');
    // console.log(this.lastRelation);
    console.log('----x------------------');
    return;
  }

  public availableColumns(relation: QueryRelation): void {
    const columns: { relation?: string; name: string; rrange?: Range; range?: Range }[] = [];

    relation.relations.forEach((rel, name) => {
      const relationName = name !== rel.id ? name : undefined;

      rel.columns.forEach((col) => {
        columns.push({
          relation: relationName,
          name: col.label,
          range: col.range,
          rrange: relation.range,
        });
      });
    });
    console.log('Cols:', columns);
  }
}
