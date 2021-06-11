import { EventObject, StateMachine } from '@xstate/fsm';
import { SingleOrArray } from '@xstate/fsm/lib/types';
import { TransitionConfig } from 'moti';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { TransitionWithTransition as TransitionWithTarget } from './extensions';

export type AllStyle = ImageStyle | TextStyle | ViewStyle;

export type Event<T extends EventObject> = T['type'] | T;

export type SimpleState<
  T extends StateMachine.State<any, any, any>
> = T['value'] | T;

export type StateViewContext<ST extends AllStyle = AllStyle> = {
  state: Partial<ST>;
  transition?: Partial<Record<keyof ST, TransitionConfig>>;
};

export type StateView<
  S extends string = string,
  ST extends AllStyle = AllStyle
> = StateViewContext<ST> & {
  cond?: (
    context?: StateViewContext<ST>,
    event?: Event<ViewEvent<S>>
  ) => boolean;
  entry?: SingleOrArray<
    StateMachine.Action<object, EventObject>
  >;
  exit?: SingleOrArray<StateMachine.Action<object, EventObject>>;
};

export type StateViewContextMap<
  S extends string = string,
  ST extends AllStyle = AllStyle
> = {
  [key in S]: StateView<S, ST>;
};

export type ViewEvent<S extends string = string> = { type: S };

export type ViewConfigWithTarget<
  S extends string = string,
  ST extends AllStyle = AllStyle
> = {
  id?: string;
  context?: StateViewContext<ST>;
  states: {
    [Key1 in S]: {
      on?: {
        [Key2 in S]?: SingleOrArray<
          TransitionWithTarget<
            S,
            StateViewContext<ST>,
            ViewEvent<S>
          >
        >;
      };
      exit?: SingleOrArray<
        StateMachine.Action<StateViewContext<ST>, ViewEvent<S>>
      >;
      entry?: SingleOrArray<
        StateMachine.Action<StateViewContext<ST>, ViewEvent<S>>
      >;
    };
  };
  initial: S;
};

export type ActionView<
  S extends string = string,
  ST extends AllStyle = AllStyle
> = StateMachine.Action<StateViewContext<ST>, ViewEvent<S>>;

export type ActionViewMap<
  S extends string = string,
  ST extends AllStyle = AllStyle
> = Record<S, Exclude<ActionView<S, ST>, string>>;
