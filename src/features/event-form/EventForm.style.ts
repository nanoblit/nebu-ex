import styled, { css } from "styled-components";

const formWidth = css`
  min-width: 30rem;
  width: 100%;
`;

export const ErrorUL = styled.ul`
  list-style-type: square;
  color: ${({ theme }) => theme.colors.red};
  margin-bottom: 1rem;
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
`;

export default EventFormContainer;
