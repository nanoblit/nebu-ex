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
import Validator from "./validator/Validator";

const EventForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [eventData, setEventData] = useState<Event>({
    firstName: "",
    lastName: "",
    email: "",
    eventDate: format(Date.now(), "yyyy-MM-dd"),
  });
  const [toValidate, setToValidate] = useState(0);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEventData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));

  const submitEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setToValidate(prev => prev += 1);
  };

  const onValidated = (valid: boolean) => {
    if (valid) {
      return dispatch(addEvent(eventData));
    }
  }

  return (
    <CenteredLayout>
      <EventFormContainer onSubmit={submitEvent}>
        <Validator
          eventData={eventData}
          toValidate={toValidate}
          onValidated={onValidated}
        ></Validator>
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
