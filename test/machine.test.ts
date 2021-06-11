import { createViewMachine } from '../src';

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

it('shoulds return the proper machine', () => {
  expect(d).toBeDefined();
  expect(JSON.stringify(d)).toBe(`{
    "config": {
      "initial": "idle",
      "states": {
        "idle": {
          "on": {
            "actions": "finish",
            "target": "finish"
          }
        },
        "start": {
          "on": {
            "actions": "finish",
            "target": "finish"
          }
        },
        "finish": {
          "on": {
            "actions": "start",
            "target": "start"
          }
        }
      },
      "context": {
        "state": {
          "alignContent": "flex-start"
        }
      }
    },
    "_options": {
      "actions": {
        "idle": {
          "type": "xstate.assign"
        },
        "start": {
          "type": "xstate.assign"
        },
        "finish": {
          "type": "xstate.assign"
        }
      }
    },
    "initialState": {
      "value": "idle",
      "actions": [],
      "context": {
        "state": {
          "alignContent": "flex-start"
        }
      }
    }
  }`);
});
