import React from "react";
import { Spacing } from "../rules";
import { Title, Subtitle } from "./BigContainer";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Graph } from "./Graph";
import { Navbar } from "./Header";

const Home = () => {
  return (
    <React.Fragment>
      <Navbar />
      <CenteredTitle></CenteredTitle>
      <CenteredSubTitle className="pt-8">
        Pequeños consejos para que puedas graficar tus funciones de manera
        correcta:
        <ul className="text-base">
            <li>Las funciones trigonométricas se escriben como: sin(x), cos(x), tan(x)</li>
            <li>Las funciones exponenciales se escriben como: exp(x)</li>
            <li>Las funciones logarítmicas se escriben como: log(x)</li>
            <li>Las funciones potencia se escriben como: x^2</li>
            <li>Las funciones raíz se escriben como: sqrt(x)</li>
            <li>Las funciones valor absoluto se escriben como: abs(x)</li>
            <li>Si desesas escribir 3x+2 en los métodos, deberías escribir 3*x+2</li>
            

        </ul>
      </CenteredSubTitle>
      <MainContainer>
        <h4>Vamos intenta graficar algo 😄 : </h4>
        <Graph />
      </MainContainer>
    </React.Fragment>
  );
};
const CenteredTitle = styled(Title)`
  text-align: center;
  margin: ${Spacing.lg} 0;
`;
const CenteredSubTitle = styled(Subtitle)`
  text-align: center;
  max-width: none;
  @media (max-width: 425px) {
    font-size: 15px;
  }
`;
const MainContainer = styled("div")`
  margin: 0 auto ${Spacing.xxl} auto;
  display: flex;
  justify-content: center;
  max-width: 700px;
  flex-direction: column;
  text-align: center;
`;
export { Home };
