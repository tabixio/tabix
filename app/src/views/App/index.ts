import { Omit } from '@vzh/mobx-stores';
import { Props, InjectedProps } from './App';

export type AppProps = Omit<Props, keyof InjectedProps>;

export { default } from './App';
