import styled from "styled-components";
import { StackedCardStyledProps } from "./StackedCards";

export const CardStyled = styled.div<StackedCardStyledProps>`
  position: absolute;
  transition: all 300ms ease-in-out;
  ${(props): string => genCardStyle(props)}
`;

const genCardStyle = (props: StackedCardStyledProps) => {
  let result = "";
  for (var i = 0; i < props.nCards; i++) {
    result += `:nth-child(${i + 1}){
      top: ${-i * props.gapY}px;
      left: 0;
      right: 0;
      width: ${100 - (props.nCards - 1 - i) * props.gapX}%;
      margin: 0 auto;
      border: 1px solid red;
      background-color: gray;
    }`;
    result += "\n";
  }
  console.log(result);
  return result;
};
