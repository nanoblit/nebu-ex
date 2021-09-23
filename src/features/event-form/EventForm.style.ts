import styled, { css } from "styled-components";
import Button from "../counter/button/Button.style";

const formWidth = css`
  min-width: 30rem;
  width: 100%;
`;

export const ErrorUL = styled.ul`
  list-style-type: square;
  color: ${({ theme }) => theme.colors.red};
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

interface SubmitMessageProps {
  show: boolean;
}

export const SubmitMessage = styled.p<SubmitMessageProps>`
  display: ${({show}) => show ? "auto" : "none"};
  margin: 0;
`;

export const SubmitButton = styled(Button)`
  margin-left: auto;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

  ${ErrorUL} > li:last-child {
    margin-bottom: 1rem;
  }
`;

export default EventFormContainer;
