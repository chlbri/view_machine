import { assign, createMachine } from '@xstate/fsm';
import {
  ActionViewMap,
  AllStyle,
  StateView,
  StateViewContext,
  StateViewContextMap,
  ViewConfigWithTarget,
  ViewEvent,
} from './types';

export function createViewMachine<
  S extends string = string,
  ST extends AllStyle = AllStyle
>(styles: StateViewContextMap<S, ST>) {
  // #region Config

  const entries = Object.entries(styles) as [
    S,
    StateView<S, ST>
  ][];

  const actions = entries
    ?.map(([key, { state, transition }]) => ({
      [key]: assign<StateViewContext<ST>, ViewEvent<S>>(() => ({
        state,
        transition,
      })),
    }))
    .reduce((acc, next) => {
      return Object.assign(acc, next);
    }, {}) as ActionViewMap<S, ST>;

  const setEvents = (key: S) => {
    return entries
      .filter(([_key]) => _key !== key)
      .map(([key, { cond }]) => ({
        actions: key,
        cond,
        target: key,
      }));
  };

  const states = entries
    .map(([key, { exit, entry }]) => ({
      [key]: {
        exit,
        entry,
        on: setEvents(key).reduce((acc, next) => {
          return Object.assign(acc, next);
        }, {}),
      },
    }))
    .reduce((acc, next) => {
      return Object.assign(acc, next);
    }, {}) as ViewConfigWithTarget<S, ST>['states'];

  const { state, transition } = entries[0][1];

  // #endregion

  return createMachine<
    StateViewContext<ST>,
    ViewEvent<S>,
    { value: S; context: StateViewContext<ST> }
  >(
    {
      initial: entries[0][0],
      states,
      context: { state, transition },
    },
    { actions }
  );
}

const d = createViewMachine({
  idle: {
    state: { alignContent: 'flex-start' },
  },
  start: {
    state: { alignContent: 'flex-start' },
  },
  finish: {
    state: { alignContent: 'flex-start' },
  },
});

console.log('*********************************************');

console.log(JSON.stringify(d, null, 2));
