import styled from "styled-components";

const CenteredLayout = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: auto;
  max-width: ${80 + 0.5 * 2}rem;
  padding: 1rem 0.5rem;
`;

export default CenteredLayout;
