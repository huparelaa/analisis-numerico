import React, { useEffect, useRef, useState } from "react";
import useWindowDimensions from "../utils/windowDimensionsHook";
import { Spacing } from "../rules";
import { Button, MediaContainer, Parameters, Eval } from "./BigContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as d3 from "d3";
import styled from "styled-components";
import functionPlot from 'function-plot'
import { methods } from "../data/methods";
import { Navbar } from "../Home/Header";
window.d3 = d3;

function Graph() {
  const params = new URLSearchParams(window.location.search);
  const size = useWindowDimensions();
  const node = useRef(null);

  const [functionText, setFunctionText] = useState(
    params.has("function") ? params.get("function") : "x^2",
  );
  const [domain, setDomain] = useState(
    params.has("domain") ? params.get("domain").toString().split(',') : [-7, 7, undefined, undefined],
  );

  const [errorMessage, setErrorMessage] = useState(null);
  const [grid, setGrid] = useState(false);
  const [domainIsOn, setDomainIsOn] = useState(false);
  const [xAxis1Domain, setXAxis1Domain] = useState(domain[0]);
  const [xAxis2Domain, setXAxis2Domain] = useState(domain[1]);
  const [yAxis1Domain, setYAxis1Domain] = useState(domain[2]);
  const [yAxis2Domain, setYAxis2Domain] = useState(domain[3]);

  const handleSubmit = event => {
    event.preventDefault();
    setErrorMessage(null);
    setFunctionText(event.target.functionText.value);
    //console.log("dominio",event.target.domain.value);
    //setDomain(event.target.domain.value);
  };

  useEffect(() => {
    setErrorMessage(null);
    if (node.current) {
      try {
        functionPlot({
          target: node.current,
          width: size.width > 800 ? 700 : size.width - 80,
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
          height: 480,
          data: [
            {
              fn: functionText,
              color: "#358180",
              sampler: "builtIn",
              graphType: "polyline",
            },
          ],
          grid: grid,
        });
      } catch (err) {
        setErrorMessage(err.toString());
      }
    }
  }, [
    node,
    functionText,
    size.width,
    grid,
    xAxis1Domain,
    xAxis2Domain,
    yAxis1Domain,
    yAxis2Domain,
  ]);

  return (
    <div >
      <div className="texto">
      <MediaContainer width={"1050px"}>
        <Parameters width={"1050px"}>
          <p>
            <strong>Parameters</strong>
          </p>
          <form onSubmit={handleSubmit}>
            <label>
              Function f
              <input
                type="text"
                name="functionText"
                defaultValue={functionText}
                style={{
                      border: '1px solid #000',
                      borderRadius: '20px',
                      width: '100px',
                      height: '35px',
                    }}
              />
            </label>
            <label>
              Grid on
              <input
                type="checkbox"
                onChange={() => setGrid(!grid)}
                defaultChecked={grid}
              />
            </label>
            <Button type={"button"} onClick={() => setDomainIsOn(!domainIsOn)}>
              {domainIsOn ? "Hide domain inputs" : "Define domain"}
            </Button>
            {domainIsOn && (
              <React.Fragment>
                <LabelGridFirstColumn>
                  x - axis : lower value
                  <input
                    type="number"
                    step={0.1}
                    onChange={event => setXAxis1Domain(event.target.value)}
                    defaultValue={xAxis1Domain}
                    style={{
                      border: '1px solid #000',
                      borderRadius: '20px',
                      width: '100px',
                      height: '35px',
                    }}

                  />

                </LabelGridFirstColumn>
                <label>
                  x - axis : higher value
                  <input
                    type="number"
                    step={0.1}
                    onChange={event => setXAxis2Domain(event.target.value)}
                    defaultValue={xAxis2Domain}
                    style={{
                      border: '1px solid #000',
                      borderRadius: '20px',
                      width: '100px',
                      height: '35px',
                    }}
                  />
                </label>
                <label>
                  y - axis : lower value
                  <input
                    type="number"
                    step={0.1}
                    onChange={event => setYAxis1Domain(event.target.value)}
                    defaultValue={yAxis1Domain}
                    style={{
                      border: '1px solid #000',
                      borderRadius: '20px',
                      width: '100px',
                      height: '35px',
                    }}
                  />
                </label>
                <label>
                  y - axis : higher value
                  <input
                    type="number"
                    step={0.1}
                    onChange={event => setYAxis2Domain(event.target.value)}
                    defaultValue={yAxis2Domain}
                    style={{
                      border: '1px solid #000',
                      borderRadius: '20px',
                      width: '100px',
                      height: '35px',
                    }}
                  />
                </label>
              </React.Fragment>
            )}
            <Button primary>Plot the function</Button>
          </form>
        </Parameters>
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

export { Graph }