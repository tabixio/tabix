import { getContainer } from './util/helpers';
// import TableSheet from '../TableSheet';
const s2Options = {
  width: 800,
  height: 600,
  showSeriesNumber: true,
};

describe('sheet-export', () => {
  test('should export correct data with showSeriesNumber', () => {
    // const s2 = new TableSheet();
    // s2.render();
    // const data = copyData(s2, '\t');
    //
    // expect(data.split('\n').length).toEqual(3);
    // expect(data.split('\n')[0].split('\t').length).toEqual(4);
    // expect(data.split('\n')[0].split('\t')[0]).toEqual('"序号"');
    // expect(data.length).toEqual(89);
  });
  //
  // test('should export correct data without showSeriesNumber', () => {
  //   const s2 = new TableSheet(getContainer(), mockDataConfig, {
  //     ...s2Options,
  //     showSeriesNumber: false,
  //   });
  //   s2.render();
  //   const data = copyData(s2, '\t');
  //
  //   expect(data.split('\n').length).toEqual(3);
  //   expect(data.split('\n')[0].split('\t').length).toEqual(3);
  //   expect(data.split('\n')[0].split('\t')[0]).toEqual('"col0"');
  //   expect(data.length).toEqual(76);
  // });
});
