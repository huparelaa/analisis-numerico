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
window.d3 = d3;

function GraphSpline() {
  const params = new URLSearchParams(window.location.search);
  const size = useWindowDimensions();
  const node = useRef(null);

  const [functionText, setFunctionText] = useState(
    params.has("trazadores")
      ? params.get("trazadores").toString().split(",")
      : ["x^2"]
  );

  const [xPoints, setXPoints] = useState(
    params.has("xPoints")
      ? params.get("xPoints").toString().split(",")
      : [-7, 7]
  );

  const [domain, setDomain] = useState(
    params.has("domain")
      ? params.get("domain").toString().split(",")
      : [-7, 7, undefined, undefined]
  );
  const [xAxis1Domain, setXAxis1Domain] = useState(domain[0]);
  const [xAxis2Domain, setXAxis2Domain] = useState(domain[1]);
  const [yAxis1Domain, setYAxis1Domain] = useState(domain[2]);
  const [yAxis2Domain, setYAxis2Domain] = useState(domain[3]);

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    setErrorMessage(null);
    if (node.current) {
      try {
        functionPlot({
          target: node.current,
          xAxis: {
            domain:
              xAxis1Domain && xAxis2Domain
                ? [xAxis1Domain, xAxis2Domain]
                : undefined,
            label: "x - axis",
          },
          yAxis: {
            domain:
              yAxis1Domain && yAxis2Domain
                ? [yAxis1Domain, yAxis2Domain]
                : undefined,
            label: "y - axis",
          },
          width: size.width > 800 ? 700 : size.width - 80,
          height: 480,
          data: functionText.map((trazador, index) => ({
            fn: trazador,
            graphType: "polyline",
            color: "#358180",
            sampler: "builtIn",
            range: [xPoints[index], xPoints[index + 1]],
          })),
        });
      } catch (err) {
        setErrorMessage(err.toString());
      }
    }
  }, [
    node,
    functionText,
    size.width,
    xAxis1Domain,
    xAxis2Domain,
    yAxis1Domain,
    yAxis2Domain,
    xPoints,
  ]);

  return (
    <div>
      <Navbar />
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
