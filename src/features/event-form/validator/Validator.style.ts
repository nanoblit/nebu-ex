import styled from "styled-components";

const ValidatorContainer = styled.ul`
  list-style-type: square;
  color: ${({ theme }) => theme.colors.red};
`;

export default ValidatorContainer;