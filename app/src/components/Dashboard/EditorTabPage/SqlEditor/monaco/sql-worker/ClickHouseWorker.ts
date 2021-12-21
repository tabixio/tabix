import * as monaco from 'monaco-editor';

import IWorkerContext = monaco.worker.IWorkerContext;
export class ClickHouseWorker {
  // Worker
  private _ctx: IWorkerContext;

  private languageService: TodoLangLanguageService;

  constructor(ctx: IWorkerContext) {
    this._ctx = ctx;
    this.languageService = new TodoLangLanguageService();
  }

  doValidation(): Promise<ITodoLangError[]> {
    const code = this.getTextDocument();
    return Promise.resolve(this.languageService.validate(code));
  }

  private getTextDocument(): string {
    const model = this._ctx.getMirrorModels()[0]; // When there are multiple files open, this will be an array
    return model.getValue();
  }
}
