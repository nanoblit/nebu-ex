import React, { useEffect, useState } from "react";

import ValidatorContainer from "./Validator.style";
import { Event } from "../eventSlice";

interface Props {
  eventData: Event;
  toValidate: number;
  onValidated: (valid: boolean) => void;
}

const Validator: React.FC<Props> = ({ eventData, toValidate, onValidated }) => {
  const [errors, setErrors] = useState<string[]>([]);

  const validateField = (
    fieldName: string,
    value: string,
    errorList: string[]
  ) => {
    if (toValidate === 0) {
      return;
    }
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

  const validateEventData = () => {
    const errorList: string[] = [];
    for (const fieldName in eventData) {
      validateField(fieldName, (eventData as any)[fieldName], errorList);
    }
    setErrors(errorList);

    onValidated(errorList.length === 0);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(validateEventData, [toValidate]);

  return (
    <ValidatorContainer>
      {errors.map((error, idx) => (
        <li key={idx}>{error}</li>
      ))}
    </ValidatorContainer>
  );
};

export default Validator;
