import styled from "styled-components";

export const Wrapper = styled.div<{ $isSuccess?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${(props) => (props.$isSuccess ? "green" : "red")};

  svg {
    font-size: 48px;
  }
`;

export const Header = styled.div`
  text-align: right;
`;
