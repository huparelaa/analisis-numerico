import React, { useEffect, useRef, useState } from "react";
import useWindowDimensions from "../utils/windowDimensionsHook";
import { Spacing } from "../rules";
import { Button, MediaContainer, Parameters, Eval } from "./BigContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as d3 from "d3";
import styled from "styled-components";
import functionPlot from "function-plot";
import { methods } from "../data/methods";
import { Navbar } from "../Home/Header";
import { i } from "mathjs";
window.d3 = d3;

function GraphSpline() {
  const params = new URLSearchParams(window.location.search);
  const size = useWindowDimensions();
  const node = useRef(null);

  const [domain, setDomain] = useState(
    params.has("domain")
      ? params.get("domain").toString().split(",")
      : [-7, 7, undefined, undefined]
  );

  const [xPoints, setXPoints] = useState(
    params.has("xPoints") ? params.get("xPoints") : [-1, 1]
  );

  const [trazadores, setTrazadores] = useState(
    params.has("trazadores")
      ? params.get("trazadores").toString().split(",")
      : "x^2"
  );

  const [prebuiltData, setPrebuiltData] = useState([{ fn: "x^2" }]);

  if (trazadores.length > 0) {
    const newData = [];
    for (let i = 0; i < xPoints.length - 1; i++) {
      const dataFunction = {
        fn: trazadores[i],
        color: "#358180",
        sampler: "builtIn",
        graphType: "polyline",
        range: [xPoints[i], xPoints[i + 1]],
      };
      newData.push(dataFunction);
    }
    console.log(newData)
    setPrebuiltData(newData); // Actualizar el estado una vez con el nuevo array completo
  }

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setErrorMessage(null);
    if (node.current) {
      try {
        functionPlot({
          target: node.current,
          width: size.width > 800 ? 700 : size.width - 80,
          height: 480,
          data: prebuiltData,
          grid: false,
        });
      } catch (err) {
        setErrorMessage(err.toString());
      }
    }
  }, [
    node,
    size.width,
    prebuiltData,
  ]);

  return (
    <div>
      <Navbar />
      <div className="texto">
        <MediaContainer width={"1050px"}>
          <Eval>
            <p>
              <strong>Graph</strong>
            </p>
            {!errorMessage ? (
              <GraphChart ref={node} />
            ) : (
              <ErrorMessage>
                <FontAwesomeIcon icon={"exclamation-circle"} />
                {errorMessage}
              </ErrorMessage>
            )}
          </Eval>
        </MediaContainer>
      </div>
    </div>
  );
}

const GraphChart = styled("div")`
  margin: 0 0 ${Spacing.md} 0;
`;
const ErrorMessage = styled("div")`
  text-align: center;
  padding: ${Spacing.xl};
  svg {
    padding: 0 ${Spacing.md};
  }
`;
const LabelGridFirstColumn = styled("label")`
  grid-column-start: 1;
`;

export { GraphSpline };
