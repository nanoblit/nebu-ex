import React, { useState } from "react";
import { format } from "date-fns";

import { addEvent, Event } from "./eventSlice";
import { useAppDispatch } from "../../app/hooks";
import CenteredLayout from "../layout/CenteredLayout.style";
import EventFormContainer, {
  ButtonContainer,
  InputContainer,
} from "./EventForm.style";
import Input from "../counter/input/Input.style";
import Button from "../counter/button/Button.style";

const EventForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [eventData, setEventData] = useState<Event>({
    firstName: "",
    lastName: "",
    email: "",
    eventDate: format(new Date(Date.now()), "yyyy-MM-dd"),
  });
  const [errors, setErrors] = useState<string[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEventData((prev) => ({
      ...prev,
      [e.target.id]: value,
    }));
  };

  const validateField = (
    fieldName: string,
    value: string | Date,
    errorList: string[]
  ) => {
    switch (fieldName) {
      case "firstName":
        console.log(value);
        break;
      case "lastName":
        console.log(value);
        break;
      case "email":
        console.log(value);
        break;
      case "eventDate":
        console.log(value);
        break;
    }
  };

  const submitEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorList: string[] = [];
    for (const fieldName in eventData) {
      validateField(fieldName, (eventData as any)[fieldName], errorList);
    }
    // do validation and show errors (toastify?)
    dispatch(addEvent(eventData));
  };

  return (
    <CenteredLayout>
      <EventFormContainer onSubmit={submitEvent}>
        <InputContainer>
          <label htmlFor="firstName">First name</label>
          <Input
            value={eventData.firstName}
            onChange={onChange}
            type="text"
            id="firstName"
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="lastName">Last name</label>
          <Input
            value={eventData.lastName}
            onChange={onChange}
            type="text"
            id="lastName"
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="email">Email</label>
          <Input
            value={eventData.email}
            onChange={onChange}
            type="email"
            id="email"
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="eventDate">Event date</label>
          <Input
            value={eventData.eventDate}
            onChange={onChange}
            type="date"
            id="eventDate"
          />
        </InputContainer>
        <ButtonContainer>
          <Button as="input" type="submit" value="Submit" />
        </ButtonContainer>
      </EventFormContainer>
    </CenteredLayout>
  );
};

export default EventForm;
