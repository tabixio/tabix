import DataDecorator, { ColumnMetadata } from './api/DataDecorator';

export default class PlotlyCreator {
  static create(data: DataDecorator): any {
    // init settings , todo create interface
    const settins = {
      autoAxis: false,
      markLine: true,
      stack: false,
      path: false,
      sort: true,
      xAxis: '',
      yAxis: '',
      enable: {},
    };

    let xAxisCol: ColumnMetadata | null = null;
    const dtCol: ColumnMetadata | null = data.findDateTimeOrDateColumn();
    if (!dtCol) {
      xAxisCol = data.getFirstColumn();
    } else {
      xAxisCol = dtCol;
    }
    // console.log('dtCol', dtCol);
    // console.log('xAxisCol', xAxisCol);

    // Exit?
    if (!xAxisCol) {
      console.warn('throw, xAxisCol column not exists', xAxisCol);
      return [];
    }

    // Если указана ось X
    if (settins.xAxis) {
      if (!data.isExistsColumn(settins.xAxis)) {
        console.warn('throw, xAxis column not exists');
        return []; // throw 'xAxis column not exists';
      }
      xAxisCol = data.getColumn(settins.xAxis);
    }
    // --------------------------------------------------------

    // const path: Array<String> = [];
    // const countStringCols = 0;
    // const columnsValues = [];
    // for (let colPos in columns) {
    //   // Идем по каждой колонке, если она не нужна для постореняи оси, или она числовая - доавляем ее в series
    //   let col = columns[colPos];
    //
    //   let skip = false;
    //
    //   if (_.size(enableColumns)) {
    //     skip = _.isUndefined(enableColumns[col]);
    //   }
    //
    //   if (col != xAxisCol && !skip) {
    //     if (this.isStringColumn(col) && cntStrAdd < 2 && !groupPath) {
    //       // Автопуть - автоматические создание групп если вторая и/или третья колонка строки
    //       if (!_.isArray(path)) {
    //         path = [];
    //       }
    //
    //       path.push(col);
    //       cntStrAdd++;
    //     }
    //     else {
    //       if (this.isNumericColumn(col)) {
    //         colValues.push(col);
    //       }
    //     }
    //   }
    // }
    // --------------------------------------------------------

    // const dataSize = data.rows.length;

    // Получим кол-во возможных серий/пар [x,y], где x - это firstCol, y - остальные
    // Если колонка тектосвая высторим path/путь

    // Идем по каждой колонке, если она не нужна для постореняи оси, или она числовая - доавляем ее в series
    const $series: any = [];
    data.getColumns().forEach((col: ColumnMetadata) => {
      if (!xAxisCol) return;
      const seriesPath: any = [];
      const skip = false;
      seriesPath.push(xAxisCol.name);

      if (
        col.name !== xAxisCol.name &&
        !skip &&
        data.isNumericColumn(col.name) /* && _.findIndex(path, col) < 0 */
      ) {
        // if (path) {  for (let pi = 0; pi < path.length; ++pi) {   let cc = path[pi];
        //  series_path.push(item[cc]);
        // }
        seriesPath.push(col.name);
        if ($series.length < 6) {
          // только часть строим
          $series.push(seriesPath);
        }
      }
      // if (_.size(enableColumns)) {
      //  skip = _.isUndefined(enableColumns[col]);
      // }
    });
    // Создаем plotly массивы
    const plotlyDataList: any = [];
    $series.forEach((seriesList: any) => {
      const name = seriesList.join(':');
      plotlyDataList.push({
        name,
        columnsSeries: {
          x: seriesList[0],
          y: seriesList[1],
        },
        type: 'scatter',
        line: { shape: 'spline' },
        mode: 'lines',
        x: [],
        y: [],
        // marker: {
        //   color: '#C8A2C8',
        //   line: {
        //     width: 1.5,
        //   },
        // },
      });
    });
    let itemAdd = 0;
    // Идем по данным
    data.rows.forEach((row: any) => {
      // Идем по серии
      plotlyDataList.forEach((pl: any, index: number, p: any) => {
        p[index].x.push(row[pl.columnsSeries.x]);
        p[index].y.push(row[pl.columnsSeries.y]);
      });
      itemAdd += 1;
      if (itemAdd > 500) return;
    });

    // ...
    // for (let seriesList in let series) {
    // ...

    // console.info('plotlyDataList', plotlyDataList);
    // console.log('PlotlyCreator.create', data);
    return plotlyDataList;
  }
}
