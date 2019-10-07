import styled from "styled-components";

const defaultDiff = 12;
const colors = ["red", "green", "blue", "yellow"];
const gen = (): string => {
  var result = "";
  for (var i = 0; i < 4; i++) {
    result += `div:nth-child(${i + 1}) {
            background-color: ${colors[i]};
          }`;
  }
  return result;
};

export const Styled = styled.div`
  ${gen()}
`;
