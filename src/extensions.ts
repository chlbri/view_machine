import {
  EventObject,
  Typestate,
  StateMachine,
} from '@xstate/fsm';
import { SingleOrArray } from '@xstate/fsm/lib/types';

export type Transition<
  S extends string,
  TContext extends object,
  TEvent extends EventObject
> =
  | S
  | {
      cond?: (context: TContext, event: TEvent) => boolean;
    };

export type TransitionWithTransition<
  S extends string,
  TContext extends object,
  TEvent extends EventObject
> =
  | S
  | {
      target?: S;
      actions?: SingleOrArray<
        StateMachine.Action<TContext, TEvent>
      >;
      cond?: (context: TContext, event: TEvent) => boolean;
    };

//See creator for pull request on transition
export interface Config<
  TContext extends object,
  TEvent extends EventObject,
  TState extends Typestate<TContext> = {
    value: any;
    context: TContext;
  }
> {
  id?: string;
  initial: TState['value'];
  context?: TContext;
  states: {
    [key in TState['value']]: {
      on?: {
        [K in TEvent['type']]?: SingleOrArray<
          Transition<TEvent['type'], TContext, TEvent>
        >;
      };
      exit?: SingleOrArray<
        StateMachine.Action<TContext, TEvent>
      >;
      entry?: SingleOrArray<
        StateMachine.Action<TContext, TEvent>
      >;
    };
  };
}
