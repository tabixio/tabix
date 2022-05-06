import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { RuleNode } from 'antlr4ts/tree/RuleNode';
import {
  ClauseTokenType,
  QToken,
  QueryRelation,
  Range,
  Relation,
  ResultQuery_Column,
  ResultQuery_DataBase,
  ResultQuery_Table,
  ResultQueryStructure,
  Statement,
  TableRelation,
} from '../CommonSQL';
import { Token } from 'antlr4ts';

export const ROOT_QUERY_NAME = '[ROOT_QUERY]';
export const CURSOR_CHARS_VALUE = ' _CURSOR_ '; // ! whitespace char in start & end

export abstract class AbstractSQLTreeVisitor<Result> extends AbstractParseTreeVisitor<Result> {
  protected relationSeq = 0;
  public debug = false;
  public cursorOffsetInCurrent = -1;
  protected currentRelation = new QueryRelation(this.getNextRelationId());

  public isHaveCursor(): boolean {
    return this.cursorOffsetInCurrent > -1;
  }

  getNextRelationId(): string {
    return `result_${this.relationSeq++}`;
  }

  protected listRelations: Map<string, Relation> = new Map();
  protected lastRelation: QueryRelation | undefined;
  protected tokensCurrentPoints: Map<string, number> = new Map();

  abstract visitNode(ctx: RuleNode): void;

  protected tokensList: Array<QToken> = [];

  // abstract getCurrentRelation(): void;

  public applyTokenList(tokens: Array<Token>, input: Statement): void {
    this.tokensList = [];

    const _cursor_ = this.isHaveCursor() ? CURSOR_CHARS_VALUE.trim() : null;

    let correctForCursor = 0;
    tokens.forEach((tok: Token, index) => {
      // Find _CURSOR_ token

      let skip = false;

      if (_cursor_) {
        const next = tokens[index + 1];
        const prew = index > 1 ? tokens[index - 1] : undefined;

        // if next isCursor And current first space char
        if (next?.text === _cursor_ && tok.text === ' ') {
          skip = true;
          correctForCursor++;
        }

        if (tok.text === _cursor_) {
          correctForCursor += _cursor_.length;
          skip = true;
        }
        // if prew _cusor_ and current end space char
        if (prew?.text === _cursor_ && tok.text === ' ') {
          skip = true;
          correctForCursor++;
        }
      } // if _cursor_
      if (skip) return;
      const t: QToken = {
        treeText: '',
        counter: new Map(),
        exception: [],
        invokingState: new Map(),
        ruleIndex: new Map(),
        channel: tok.channel,
        column: tok.line,
        line: tok.line,
        start: tok.startIndex + input.start - correctForCursor,
        stop: tok.stopIndex + input.start - correctForCursor,
        tokenIndex: index,
        type: tok.type,
        text: tok.text,
        charPositionInLine: tok.charPositionInLine,
        symbolic: '',
        up: 0,
        context: [],
      };
      // console.log(
      //   `IStart = ${input.start} , Start = ${tok.startIndex}  , Correct = ${correctForCursor} , Stop = ${t.stop}        "${t.text}"`
      // );
      this.tokensList.push(t);
    });
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

  public applyToken(
    start: Token,
    stop: Token,
    data: { clause?: ClauseTokenType; context?: string; link?: QToken['link'] }
  ) {
    this.log(`applyToken ${data.clause}, range [ ${start.tokenIndex}, ${stop.tokenIndex} ]`);

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
          if (data.context) {
            this.tokensList[index].context.push(data.context);
          }

          if (data.link) {
            this.tokensList[index].link = data.link;
          }
          if (data.clause) {
            this.tokensList[index].clause = {
              type: data.clause,
              start: start.tokenIndex,
              stop: stop.tokenIndex,
            };
          }
        }
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

  public getToken(offset: number): QToken | undefined {
    return this.getTokens().find((st) => st.start <= offset && offset <= st.stop);
  }

  public getPositionByTokenOffset(offset: number): Range | undefined {
    const t = this.getToken(offset);
    if (!t) return;
    // console.log('tokens', t);
    return {
      startLine: t.line,
      startColumn: t.start,
      endColumn: t.stop,
      endLine: t.line,
    };
  }

  private getDataFromRelation(
    relation: Relation,
    result: ResultQueryStructure,
    deep = 0
  ): ResultQueryStructure {
    const parent: null | string = null;

    if (relation instanceof QueryRelation || relation instanceof TableRelation) {
      //
      relation.columns.forEach((col) => {
        result.columns.push({ name: col.label, deep: deep });
      });
    }
    if (relation instanceof TableRelation) {
      if (relation.tablePrimary) {
        result.tables.push({
          name: relation.tablePrimary.tableName,
          db: relation.tablePrimary.schemaName,
          alias: relation.tablePrimary.alias,
          deep: deep,
        });
        if (relation.tablePrimary.schemaName) {
          result.databases.push({
            name: relation.tablePrimary.schemaName,
            deep: deep,
          });
        }
      }
    }
    if (relation instanceof QueryRelation) {
      relation.relations.forEach((sub_relation) => {
        this.getDataFromRelation(sub_relation, result, deep++);
      });
    }
    return result;
    //
    // if (relation.alias === ROOT_QUERY_NAME) {
    //   parent = null;
    // } else {
    //   parent = relation.alias ?? 'NA_ERROR';
    // }
  }

  public getStructureData(offset: number): ResultQueryStructure | undefined {
    //
    const rel = this.getRelation(offset);
    if (!rel) return;
    let result: ResultQueryStructure = {
      columns: [] as Array<ResultQuery_Column>,
      databases: [] as Array<ResultQuery_DataBase>,
      tables: [] as Array<ResultQuery_Table>,
    };
    this.log(`---------- relation # ` + (rel ?? 'null') + ` ------------------`);
    this.log('Result QR:', rel);
    result = this.getDataFromRelation(rel, result);
    this.log('result getDataFromRelation:', result);
    return result;
  }

  public getRelation(offset: number): Relation | undefined {
    // Need find CaretScope , from tag?
    const t = this.getToken(offset);
    if (!t) return;

    if (this.debug) {
      console.group('---------- getRelation ------------------');
      console.log('---------- getRelation ------------------');
      console.log('token:', t.tokenIndex, t);
      console.log('this.getRelations()', this.getRelations());
      console.groupEnd();
    }

    let dist = 999999;
    let qr: Relation | undefined = undefined;

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
        if (dist > tokRange) {
          qr = rel;
          dist = tokRange;
        }
      }
    });
    return qr;
  }

  // public availableColumns(relation: QueryRelation): void {
  //   const columns: { relation?: string; name: string; rrange?: Range; range?: Range }[] = [];
  //
  //   relation.relations.forEach((rel, name) => {
  //     const relationName = name !== rel.id ? name : undefined;
  //
  //     rel.columns.forEach((col) => {
  //       columns.push({
  //         relation: relationName,
  //         name: col.label,
  //         range: col.range,
  //         rrange: relation.range,
  //       });
  //     });
  //   });
  //   console.log('Cols:', columns);
  // }
}
