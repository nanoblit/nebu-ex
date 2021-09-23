import styled, { css } from "styled-components";
import ValidatorContainer from "./validator/Validator.style";

const formWidth = css`
  min-width: 30rem;
  width: 100%;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  ${formWidth}

  > input {
    width: 20rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  ${formWidth}
`;

const EventFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background};
  border: 0.1rem solid ${({ theme }) => theme.colors.text};
  min-width: 30rem;
  width: 40rem;

  ${ValidatorContainer} {
    margin-bottom: 1rem;
  }
`;

export default EventFormContainer;
