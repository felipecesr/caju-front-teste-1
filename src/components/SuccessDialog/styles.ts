import styled from "styled-components";
import { FaRegCircleCheck } from "react-icons/fa6";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: green;
`;

export const Header = styled.div`
  text-align: right;
`;

export const Icon = styled(FaRegCircleCheck)`
  font-size: 48px;
`;
