import React from 'react';
import ReactGridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

interface Props {
  items: any[];
}

interface State {
  items: any[];
  layout: ReactGridLayout.Layout[];
}

export default class GridLayout extends React.Component<Props, State> {
  static calculateLayout(items: State['items']): State['layout'] {
    const layout = items.map<ReactGridLayout.Layout>((_, i) => ({
      x: (i * 2) % 12,
      y: 0,
      w: 2,
      h: 2,
      i: _.toString(),
    }));
    console.log(JSON.stringify(layout));
    return layout;
  }

  static getDerivedStateFromProps(
    nextProps: Readonly<Props>,
    prevState: State
  ): Partial<State> | null {
    if (nextProps.items !== prevState.items) {
      return { items: nextProps.items, layout: GridLayout.calculateLayout(nextProps.items) };
    }

    return null;
  }

  state = { items: [], layout: [] };

  render() {
    const { layout } = this.state;
    const { children } = this.props;

    return (
      <ReactGridLayout layout={layout} width={600}>
        {children}
      </ReactGridLayout>
    );
  }
}
