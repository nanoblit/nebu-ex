import { useState } from "react";
import { format } from "date-fns";

import { addEvent, Event } from "./eventSlice";
import { useAppDispatch } from "../../app/hooks";

const EventForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [eventData, setEventData] = useState<Event>({
    firstName: "",
    lastName: "",
    email: "",
    eventDate: new Date(Date.now()),
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEventData((prev) => ({
      ...prev,
      [e.target.id]: e.target.type === "date" ? new Date(value) : value,
    }));
  };

  const submitEvent = () => {
    // do validation and show errors (toastify?)
    dispatch(addEvent(eventData));
  };

  return (
    <div>
      <label htmlFor="firstName">First name</label>
      <input
        value={eventData.firstName}
        onChange={onChange}
        type="text"
        id="firstName"
      />
      <label htmlFor="lastName">Last name</label>
      <input
        value={eventData.lastName}
        onChange={onChange}
        type="text"
        id="lastName"
      />
      <label htmlFor="email">Email</label>
      <input
        value={eventData.email}
        onChange={onChange}
        type="email"
        id="email"
      />
      <label htmlFor="eventDate">Event date</label>
      <input
        value={format(eventData.eventDate, "yyyy-MM-dd")}
        onChange={onChange}
        type="date"
        id="eventDate"
      />
      <button onClick={submitEvent}>Submit</button>
    </div>
  );
};

export default EventForm;
