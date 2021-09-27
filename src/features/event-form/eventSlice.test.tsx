import { format } from "date-fns";

import eventReducer, { addEvent, EventState, Event } from "./eventSlice";

describe("event reducer", () => {
  const initialState: EventState = [
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@gmail.com",
      eventDate: format(Date.now(), "yyyy-MM-dd"),
    },
  ];

  it("should hande initial state", () => {
    expect(eventReducer(undefined, { type: "unknown" })).toEqual([]);
  });

  it("should handle addEvent", () => {
    const payload: Event = {
      firstName: "Eve",
      lastName: "Jones",
      email: "Eve.Jones@hotmail.com",
      eventDate: format(Date.now(), "yyyy-MM-dd"),
    };
    expect(eventReducer(initialState, addEvent(payload))).toEqual([
      ...initialState,
      payload,
    ]);
  });
});
