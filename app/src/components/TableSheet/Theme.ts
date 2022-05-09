import { setLocale } from './Locale';
import { ThemeCfg } from '@antv/s2';

const BORDER_COLOR = '#636363';
const BACK_COLOR = '#424242';
const HEADER_BACK_COLOR = '#303030';
const CELL_ACTIVE_BACK_COLOR = '#525252';
const fontSize = 12;
const fontFamily =
  'Monaco, Menlo, Consolas,Inconsolata, Courier New, monospace, Helvetica, arial, sans-serif';
export const DarkTheme = {
  background: {
    color: HEADER_BACK_COLOR,
  },
  cornerCell: {
    cell: {
      horizontalBorderColor: BORDER_COLOR,
      verticalBorderColor: BORDER_COLOR,
      padding: {
        top: 2,
        right: 8,
        bottom: 2,
        left: 8,
      },
      backgroundColor: HEADER_BACK_COLOR,
    },
    text: {
      fill: '#fff',
      fontSize: 14,
      fontFamily,
    },
    bolderText: {
      fontFamily,
      fill: '#fff',
      opacity: 0.4,
    },
  },
  splitLine: {
    horizontalBorderColor: BORDER_COLOR,
    horizontalBorderColorOpacity: 0.5,
    horizontalBorderWidth: 1,
    verticalBorderColor: BORDER_COLOR,
    verticalBorderColorOpacity: 1,
    verticalBorderWidth: 1,
    showRightShadow: true,
    shadowWidth: 10,
    shadowColors: {
      left: 'rgba(0,0,0,0.1)',
      right: 'rgba(0,0,0,0)',
    },
  },
  rowCell: {
    text: {
      fill: '#fff123',
      opacity: 0.2,
      fontSize,
      fontFamily,
    },
    cell: {
      text: {
        fontFamily,
      },
      backgroundColor: HEADER_BACK_COLOR,
      padding: {
        top: 0,
        right: 8,
        bottom: 0,
        left: 8,
      },
      margin: {
        top: 0,
        bottom: 0,
      },
      interactionState: {
        hover: {
          backgroundColor: CELL_ACTIVE_BACK_COLOR,
          backgroundOpacity: 1,
        },
        selected: {
          backgroundColor: 'rgb(63, 69, 97)',
        },
      },
      horizontalBorderColor: BORDER_COLOR,
      verticalBorderColor: BORDER_COLOR,
      horizontalBorderColorOpacity: 0.4,
      verticalBorderColorOpacity: 0.4,
      verticalBorderWidth: 1,
    },
  },
  colCell: {
    // Колонки название
    cell: {
      horizontalBorderColor: BORDER_COLOR,
      verticalBorderColor: BORDER_COLOR,
      verticalBorderWidth: 1,
      verticalBorderColorOpacity: 0.4,
      horizontalBorderWidth: 1,
      padding: {
        top: 2,
        right: 8,
        bottom: 2,
        left: 8,
      },
      margin: {
        top: 2,
        bottom: 2,
      },
      backgroundColor: HEADER_BACK_COLOR,
      interactionState: {
        hover: {
          backgroundColor: CELL_ACTIVE_BACK_COLOR,
          backgroundOpacity: 0.9,
        },
        selected: {
          backgroundColor: 'rgb(63, 69, 97)',
        },
      },
    },
    text: {
      fill: 'red',
      fontSize,
      fontFamily,
    },
    bolderText: {
      fill: '#fff',
      opacity: 0.4,
      fontFamily,
      fontSize,
    },
  },
  dataCell: {
    icon: {
      size: 12,
      padding: {
        top: 0,
        right: 8,
        bottom: 2,
        left: 0,
      },
      margin: {
        left: 10,
        top: 0,
        bottom: 0,
      },
    },
    cell: {
      interactionState: {
        hover: {
          backgroundColor: CELL_ACTIVE_BACK_COLOR,
          backgroundOpacity: 0.3,
        },
        hoverFocus: {
          backgroundColor: CELL_ACTIVE_BACK_COLOR,
          backgroundOpacity: 0.3,
          borderColor: '#3D3D3D',
        },
        selected: {
          backgroundColor: CELL_ACTIVE_BACK_COLOR,
          backgroundOpacity: 1,
        },
        unselected: {
          backgroundOpacity: 1,
          opacity: 1,
        },
        prepareSelect: {
          borderColor: CELL_ACTIVE_BACK_COLOR,
        },
      },
      horizontalBorderColor: BORDER_COLOR,
      horizontalBorderColorOpacity: 0.4,
      verticalBorderColorOpacity: 0.4,
      verticalBorderColor: BORDER_COLOR,
      verticalBorderWidth: 1,
      horizontalBorderWidth: 1,
      padding: {
        top: 2,
        right: 8,
        bottom: 1,
        left: 0,
      },
      margin: {
        top: 1,
        bottom: 0,
        right: 0,
        left: 0,
      },
      backgroundColorOpacity: 0.1,
      backgroundColor: BACK_COLOR,
    },
    text: {
      fill: '#fffff0',
      fontFamily,
      fontSize,
    },
    bolderText: {
      fill: '#125212',
      opacity: 0.9,
      fontFamily,
      fontSize,
    },
  },
};
//

export const themeCfg: ThemeCfg = {
  name: 'gray',
  theme: DarkTheme,
};

// Try translate
setLocale();
