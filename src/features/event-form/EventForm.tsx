import React, { useState } from "react";
import { format } from "date-fns";

import { addEvent, Event } from "./eventSlice";
import { useAppDispatch } from "../../app/hooks";
import CenteredLayout from "../layout/CenteredLayout.style";
import EventFormContainer, {
  ButtonContainer,
  ErrorUL,
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
    eventDate: format(Date.now(), "yyyy-MM-dd"),
  });
  const [errors, setErrors] = useState<string[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEventData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));

  const validateField = (
    fieldName: string,
    value: string,
    errorList: string[]
  ) => {
    switch (fieldName) {
      case "firstName":
        const firstNameValid = value.match(/^[a-zA-Z ]{2,30}$/);
        if (!firstNameValid) {
          errorList.push("Please enter a valid first name");
        }
        break;
      case "lastName":
        const lastNameValid = value.match(/^[a-zA-Z ]{2,30}$/);
        if (!lastNameValid) {
          errorList.push("Please enter a valid last name");
        }
        break;
      case "email":
        const emailValid = value.toLowerCase().match(
          // eslint-disable-next-line no-useless-escape
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        );
        if (!emailValid) {
          errorList.push("Please enter a valid email");
        }
        break;
      case "eventDate":
        const date = new Date(value).getTime();
        const currentDate = Date.now();
        const dateValid = date - currentDate > 0;
        if (!dateValid) {
          errorList.push("Please enter a date after today");
        }
        break;
      default:
        break;
    }
  };

  const submitEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorList: string[] = [];
    for (const fieldName in eventData) {
      validateField(fieldName, (eventData as any)[fieldName], errorList);
    }
    if (errorList.length === 0) {
      return dispatch(addEvent(eventData));
    }
    setErrors(errorList);
  };

  return (
    <CenteredLayout>
      <EventFormContainer onSubmit={submitEvent}>
        <ErrorUL>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ErrorUL>
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
