import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Event {
  firstName: string;
  lastName: string;
  email: string;
  eventDate: string;
}

export type EventState = Event[];

const initialState: EventState = [];

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Event>) => {
      state.push(action.payload);
    },
  },
});

export const { addEvent } = eventSlice.actions;

export const selectLastEvent = (state: RootState) =>
  state.events[state.events.length - 1];

export default eventSlice.reducer;
