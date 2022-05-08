import { setLocale } from './Locale';
import { ThemeCfg } from '@antv/s2';

const BORDER_COLOR = '#636363';
const BACK_COLOR = '#424242';
const HEADER_BACK_COLOR = '#303030';
const CELL_ACTIVE_BACK_COLOR = '#525252';
const fontFamily = 'Monaco';
export const DarkTheme = {
  background: {
    color: HEADER_BACK_COLOR,
  },
  cornerCell: {
    cell: {
      horizontalBorderColor: BORDER_COLOR,
      verticalBorderColor: BORDER_COLOR,
      padding: {
        top: 12,
        right: 8,
        bottom: 12,
        left: 8,
      },
      backgroundColor: HEADER_BACK_COLOR,
    },
    text: {
      fill: '#fff',
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
    horizontalBorderColorOpacity: 1,
    horizontalBorderWidth: 2,
    verticalBorderColor: BORDER_COLOR,
    verticalBorderColorOpacity: 1,
    verticalBorderWidth: 2,
    showRightShadow: true,
    shadowWidth: 10,
    shadowColors: {
      left: 'rgba(0,0,0,0.1)',
      right: 'rgba(0,0,0,0)',
    },
  },
  rowCell: {
    text: {
      fill: '#fff',
      opacity: 0.4,
      // fontSize: 15,
      // fontWeight: 'bold',
      fontFamily,
    },
    cell: {
      text: {
        fontFamily,
      },
      backgroundColor: HEADER_BACK_COLOR,
      padding: {
        top: 12,
        right: 8,
        bottom: 12,
        left: 8,
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
      verticalBorderWidth: 1,
    },
  },
  colCell: {
    cell: {
      horizontalBorderColor: BORDER_COLOR,
      verticalBorderColor: BORDER_COLOR,
      verticalBorderWidth: 2,
      horizontalBorderWidth: 2,
      padding: {
        top: 12,
        right: 8,
        bottom: 12,
        left: 8,
      },
      backgroundColor: HEADER_BACK_COLOR,
      interactionState: {
        hover: {
          backgroundColor: CELL_ACTIVE_BACK_COLOR,
          backgroundOpacity: 1,
        },
        selected: {
          backgroundColor: 'rgb(63, 69, 97)',
        },
      },
    },
    text: {
      fill: '#fff',
      fontFamily,
    },
    bolderText: {
      fill: '#fff',
      opacity: 0.4,
      fontFamily,
    },
  },
  dataCell: {
    icon: {
      size: 14,
      margin: {
        left: 10,
      },
    },
    cell: {
      interactionState: {
        hover: {
          backgroundColor: CELL_ACTIVE_BACK_COLOR,
          backgroundOpacity: 1,
        },
        hoverFocus: {
          backgroundColor: CELL_ACTIVE_BACK_COLOR,
          backgroundOpacity: 1,
          borderColor: 'blue',
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
      verticalBorderColor: BORDER_COLOR,
      verticalBorderWidth: 2,
      horizontalBorderWidth: 2,
      padding: {
        top: 0,
        right: 8,
        bottom: 2,
        left: 0,
      },
      backgroundColorOpacity: 0.9,
      backgroundColor: BACK_COLOR,
    },
    text: {
      fill: '#fff',
      fontFamily,
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
