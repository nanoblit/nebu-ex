import React, { useEffect, useState } from "react";
import { format } from "date-fns";

import { addEvent, Event } from "./eventSlice";
import { useAppDispatch } from "../../app/hooks";
import CenteredLayout from "../layout/CenteredLayout.style";
import EventFormContainer, {
  ButtonContainer,
  ErrorUL,
  InputContainer,
  SubmitButton,
  SubmitMessage,
} from "./EventForm.style";
import Input from "../counter/input/Input.style";
import { clearTimeout, setTimeout } from "timers";

const tomorrow = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  return tomorrow.setDate(tomorrow.getDate() + 1);
};

const defaultEventData: Event = {
  firstName: "",
  lastName: "",
  email: "",
  eventDate: format(tomorrow(), "yyyy-MM-dd"),
};

const EventForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [eventData, setEventData] = useState<Event>(defaultEventData);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitMessageShown, setIsSubmitMessageShown] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [e.target.id]: value,
    }));
  };
  const validateField = (
    fieldName: string,
    value: string,
    errorList: string[]
  ) => {
    switch (fieldName) {
      case "firstName":
        const isFirstNameValid = value.match(/^[a-zA-Z ]{2,30}$/);
        if (!isFirstNameValid) {
          errorList.push("Please enter a valid first name");
        }
        break;
      case "lastName":
        const isLastNameValid = value.match(/^[a-zA-Z ]{2,30}$/);
        if (!isLastNameValid) {
          errorList.push("Please enter a valid last name");
        }
        break;
      case "email":
        const isEmailValid = value.toLowerCase().match(
          // eslint-disable-next-line no-useless-escape
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        );
        if (!isEmailValid) {
          errorList.push("Please enter a valid email");
        }
        break;
      case "eventDate":
        const date = new Date(value).getTime();
        const currentDate = Date.now();
        const isDateValid = date - currentDate > 0;
        if (!isDateValid) {
          errorList.push("Please enter a date after today");
        }
        break;
      default:
        break;
    }
  };

  const showAndHideSubmitMessage = () => {
    setIsSubmitMessageShown(() => true);
  };

  useEffect(() => {
    if (isSubmitMessageShown) {
      const timer = setTimeout(() => {
        console.log("hello");
        setIsSubmitMessageShown(() => false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitMessageShown]);

  const resetEventData = () => {
    setEventData(defaultEventData);
  };

  const submitEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorList: string[] = [];
    for (const fieldName in eventData) {
      validateField(fieldName, (eventData as any)[fieldName], errorList);
    }
    setErrors(errorList);
    if (errorList.length === 0) {
      showAndHideSubmitMessage();
      dispatch(addEvent(eventData));
      resetEventData();
    }
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
          {isSubmitMessageShown && (
            <SubmitMessage>Event created!</SubmitMessage>
          )}

          <SubmitButton as="input" type="submit" value="Submit" />
        </ButtonContainer>
      </EventFormContainer>
    </CenteredLayout>
  );
};

export default EventForm;
