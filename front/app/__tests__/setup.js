['time', 'info', 'warn'].forEach((type) => {
  jest.spyOn(console, type).mockImplementation(() => {});
});
//
// jest.mock('@/ui/hd-adapter', () => {
//   return {
//     HdAdapter: jest.fn().mockImplementation(() => {
//       return {
//         init: jest.fn(),
//         destroy: jest.fn(),
//       };
//     }),
//   };
// });
