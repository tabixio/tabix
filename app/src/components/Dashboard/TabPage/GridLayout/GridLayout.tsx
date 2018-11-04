import React from 'react';
import ReactGridLayout, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ReactGridLayoutFilled = WidthProvider(ReactGridLayout);

interface Props {
  items: any[];
  cols: number;
  itemWidth: number;
  width?: number;
}

interface State {
  items: any[];
  layout: ReactGridLayout.Layout[];
}

export default class GridLayout extends React.Component<Props, State> {
  static rowHeight: number = 50;

  static calculateLayout({ items, cols, itemWidth }: Props): State['layout'] {
    return items.map<ReactGridLayout.Layout>((_, i) => ({
      x: (i * itemWidth) % cols,
      y: 0,
      w: itemWidth,
      h: 4,
      minH: 2,
      i: i.toString(),
    }));
  }

  static getDerivedStateFromProps(
    nextProps: Readonly<Props>,
    prevState: State
  ): Partial<State> | null {
    if (nextProps.items !== prevState.items) {
      return { items: nextProps.items, layout: GridLayout.calculateLayout(nextProps) };
    }

    return null;
  }

  state = { items: [], layout: [] };

  render() {
    const { layout } = this.state;
    const { cols, width, children } = this.props;

    // refactor: detect initial width through props
    const Layout = width ? ReactGridLayout : ReactGridLayoutFilled;

    return (
      <Layout
        layout={layout}
        cols={cols}
        width={width}
        rowHeight={GridLayout.rowHeight}
        containerPadding={[0, 0]}
      >
        {children}
      </Layout>
    );
  }
}
