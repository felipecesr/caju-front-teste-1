import { createMachine } from "xstate";

export const fetchMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QFsD2ECGAbAdASwDs8AXPbAYgCEBRAcQEkA5AbQAYBdRUAB1VhLyoCXEAA9EARgAsrHBNYBOAMwB2AKwAaEAE9JUgGw4FE-abPnTAX0ta0mXAGMhAMzwAnZISjkAwgHlGADF6ACUAWTZOJBBeflIhEXEEJQUVHAAmCQAOdS1dBHkpHDVrW3RsHCcCVw8vXwBBRh9qABlIkViBBOik6Vl5ZVydRAVDKRMLCxVrGxACdDgRO2wOvi7hHsQAWn087f1SkGXcQgEV6M74jdAkqXS9gtZ04sPjypd3TwIoVbjBa7EiHS+iKOU0w0eJVmbywqAwEC8v3WiUQaiUslU4PyWQkLxmQA */
  id: "modal",
  initial: "initial",
  states: {
    initial: {
      on: {
        BEGIN: "confirming",
      },
    },
    confirming: {
      on: {
        CONFIRM: "loading",
        CANCEL: "initial",
      },
    },
    loading: {
      invoke: {
        src: "fetchData",
        onDone: {
          target: "success",
          // actions: assign({
          //   data: ({ event }) => event.output,
          // }),
        },
        onError: {
          target: "failure",
          // actions: assign({
          //   error: ({ event }) => event.error,
          // }),
        },
      },
    },
    success: {
      entry: "notifySuccess",
      type: "final",
    },
    failure: {
      entry: "notifyError",
      type: "final",
    },
  },
});
