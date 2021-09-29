import styled from "styled-components";

const Input = styled.input`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.text};

  ::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }
`;

export default Input;
