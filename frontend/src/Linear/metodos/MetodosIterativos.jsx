import React, { useEffect, useState } from "react";
import MatrixInput from "../MatrixInput";
import MatrixInputSize from "../MatrixSizeInput";
import renderLatexMatrix from "../../utils/LaTeX/renderLatexMatrix";
import { Navbar } from "../../Home/Header";

import {
  Parameters,
  Button,
  TableStyle,
  Error,
  Results,
  Inputs,
  Column,
  Question,
} from "../../Home/BigContainer";
import styled from "styled-components";
import { Colors } from "../../rules";
import { column, format, log } from "mathjs";

import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { url } from "../../config";
const MetodosIterativos = ({ name }) => {
  const [matrixASize, setMatrixASize] = useState({
    rows: 4,
    columns: 4,
  });
  const [matrixA, setMatrixA] = useState([
    [4, -1, -0, 3],
    [1, 15.5, 3, 8],
    [0, -1.3, -4, 1.1],
    [14, 5, -2, 30],
  ]);
  const [B, setB] = useState([[1, 1, 1, 1]]);
  const [latexMatrixA, setLatexMatrixA] = useState(
    "\\begin{pmatrix}\n 1 & 2 & 3\\\\\n a & b & c\n \\end{pmatrix}"
  );
  const [latexB, setLatexB] = useState(
    "\\begin{pmatrix}\n a\\\\\n b\n \\end{pmatrix}"
  );
  const [latexInitialValueX0, setLatexInitialValueX0] = useState(
    "\\begin{pmatrix}\n a\\\\\n b\n \\end{pmatrix}"
  );
  const [initialValueX0, setInitialValueX0] = useState([[[0], [0], [0], [0]]]);
  const [method, setMethod] = useState(1);
  const [tol, setTol] = useState(1e-7);
  const [normValue, setnormValue] = useState(2);
  const [NMax, setNMax] = useState(100);
  const [wValue, setWValue] = useState(1);
  const [error, setError] = useState(null);
  const [paramSet, setParamSet] = useState(false);
  const [results, setResults] = useState(undefined);
  const [displayHelp, setDisplayHelp] = useState(false);
  const [conclusion, setConclusion] = useState("");
  const [errorType, setErrorType] = useState(1);
  const [methodState, setMethodState] = useState({
    matrixA: "inputSize",
    B: "input",
    initialValueX0: "input",
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    // Verificar que los datos sean correctos
    if (!event.target.tol.value) {
      window.alert("No pueden haber campos vacíos");
      return;
    }
    if (parseInt(event.target.NMax.value) <= 0) {
      window.alert("El número de iteraciones debe ser positivo");
      return;
    }
    if (parseFloat(event.target.tol.value) <= 0) {
      window.alert("La tolerancia debe ser positiva");
      return;
    }
    if (parseInt(event.target.normValue.value) <= 0) {
      window.alert("La norma debe ser positiva");
      return;
    }
    if (parseInt(event.target.errorType.value) < 0) {
      window.alert("El tipo de error debe ser positivo");
      return;
    }
    if (parseInt(event.target.errorType.value) > 1) {
      window.alert("El tipo de error debe ser menor a 2");
      return;
    }
    if (parseInt(event.target.NMax.value) > 100) {
      window.alert("El número de iteraciones debe ser menor a 100");
      return;
    }
    if (parseInt(event.target.NMax.value) <= 0) {
      window.alert("El número de iteraciones debe ser positivo");
      return;
    }
    if (parseInt(event.target.normValue.value) <= 0) {
      window.alert("La norma debe ser positiva");
      return;
    }
    if (parseInt(event.target.errorType.value) < 0) {
      window.alert("El tipo de error debe ser positivo");
      return;
    }
    


    setTol(parseFloat(event.target.tol.value));
    setnormValue(parseInt(event.target.normValue.value));
    setWValue(parseFloat(event.target.wValue && event.target.wValue.value));
    setNMax(parseInt(event.target.NMax.value));
    setErrorType(parseInt(event.target.errorType.value));
    setParamSet(true);
  };
  const fuctionFetch = async () => {
    const data = {
      A: matrixA,
      b: B,
      x0: initialValueX0,
      tol: tol,
      norm: normValue,
      niter: NMax,
      l: method,
      w: wValue,
      tipErr: errorType,
    };
    console.log(data);
    try {
      setLoading(true);
      setResults(null);
      const response = await axios.post(`${url}/linear/iterativos`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = response.data;
      setResults(responseData);

      if (responseData["mes_err"].length == 0) {
        setConclusion(responseData["mes"]);
      } else {
        setError(responseData["mes_err"]);
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    setError(null);
    setLatexMatrixA(renderLatexMatrix(matrixA));
    setLatexB(renderLatexMatrix(B));
    setLatexInitialValueX0(renderLatexMatrix(initialValueX0));
    console.log("A");
    if (
      methodState.matrixA === "matrix" &&
      methodState.B === "matrix" &&
      methodState.initialValueX0 === "matrix" &&
      paramSet
    ) {
      try {
        fuctionFetch();
      } catch (e) {
        setError(e + "");
      }
    } else {
      setResults(undefined);
    }
  }, [
    matrixA,
    B,
    methodState,
    paramSet,
    NMax,
    initialValueX0,
    method,
    normValue,
    tol,
    wValue,
    errorType,
  ]);
  console.log(results);
  return (
    <>
      <Navbar />
      <ParametersMatrix>
        {!paramSet ? (
          <React.Fragment>
            <form onSubmit={handleSubmit}>
              <label>
                Método{"  "}
                <select
                  name="method"
                  value={method}
                  onChange={(event) => setMethod(parseInt(event.target.value))}
                >
                  <option value={1}>Gauss-Seidel</option>
                  <option value={2}>Jacobi</option>
                  <option value={3}>SOR</option>
                </select>
              </label>
              {method === 3 && (
                <label>
                  W valor (Parámetro de relajación)
                  <input
                    type="number"
                    name="wValue"
                    step={0.01}
                    min={0}
                    max={2}
                    defaultValue={wValue}
                  />
                </label>
              )}
              <label>
                Tolerancia
                <input
                  type="text"
                  name="tol"
                  defaultValue={tol}
                  style={{
                    border: "1px solid #000",
                    borderRadius: "20px",
                    width: "90px",
                    height: "35px",
                  }}
                />
              </label>
              <label>
                Norma {"  "}
                <select name="normValue" defaultValue={normValue}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>inf</option>
                </select>
              </label>
              <label>
                Tipo de error {"  "}
                <select name="errorType" defaultValue={1}>
                  <option value={1}>Absoluto</option>
                  <option value={0}>Relativo</option>
                </select>
              </label>
              <label>
                Iteraciones (max 100)
                <input
                  type="number"
                  name="NMax"
                  defaultValue={100}
                  style={{
                    border: "1px solid #000",
                    borderRadius: "20px",
                    width: "90px",
                    height: "35px",
                  }}
                />
              </label>
              <Button>Confirmar parámetros</Button>
            </form>
          </React.Fragment>
        ) : (
          <Column>
            <ul>
              <li>Tolerancia : {tol}</li>
              <li>
                Tipo de error: {errorType === 1 ? "Absoluto" : "Relativo"}
              </li>
              <li>Norma : {normValue === 4 ? "Inf":normValue}</li>
              <li>Iteraciones : {NMax}</li>
              <li>
                Métodos :{" "}
                {method === 1
                  ? "Jacobi"
                  : method === 2
                  ? "Gauss-Seidel"
                  : "SOR"}
              </li>
              {method === 3 && (
                <li>W valor (Parámetro de la relajación) : {wValue}</li>
              )}
            </ul>
            <Button onClick={() => setParamSet(false)}>
              Cambiar parámetros
            </Button>
          </Column>
        )}
      </ParametersMatrix>
      <Inputs>
        {methodState.matrixA === "inputSize" ? (
          <MatrixInputSize
            matrixSize={matrixASize}
            setMatrixSize={(object) => setMatrixASize(object)}
            setMethodState={(object) => setMethodState(object)}
            methodState={methodState}
          />
        ) : methodState.matrixA === "inputMatrix" ? (
          <Column>
            <MatrixInput
              type={"A"}
              matrix={matrixA}
              matrixSize={matrixASize}
              setMatrix={(matrix) => setMatrixA(matrix)}
              setMethodState={(value) => setMethodState(value)}
            />
            <Button
              onClick={() => {
                setMethodState((prevState) => ({
                  ...prevState,
                  matrixA: "inputSize",
                }));
              }}
            >
              Cambiar el tamaño de la matriz
            </Button>
          </Column>
        ) : (
          methodState.matrixA === "matrix" && (
            <Column>
              <BlockMath math={"A = " + latexMatrixA} />
              <Button
                onClick={() => {
                  setMethodState((prevState) => ({
                    ...prevState,
                    matrixA: "inputMatrix",
                  }));
                }}
              >
                Cambiar A
              </Button>
            </Column>
          )
        )}
        {methodState.initialValueX0 === "input" ? (
          <MatrixInput
            type={"initialValueX0"}
            matrix={initialValueX0}
            matrixSize={{ ...matrixASize, columns: 1 }}
            setMatrix={(matrix) => setInitialValueX0(matrix)}
            setMethodState={(value) => setMethodState(value)}
          />
        ) : (
          methodState.initialValueX0 === "matrix" && (
            <Column>
              <BlockMath math={"x0 = " + latexInitialValueX0} />
              <Button
                onClick={() => {
                  setMethodState((prevState) => ({
                    ...prevState,
                    initialValueX0: "input",
                  }));
                }}
              >
                Cambiar x0
              </Button>
            </Column>
          )
        )}
        {methodState.B === "input" ? (
          <MatrixInput
            type={"B"}
            matrix={B}
            matrixSize={{ ...matrixASize, columns: 1 }}
            setMatrix={(matrix) => setB(matrix)}
            setMethodState={(value) => setMethodState(value)}
          />
        ) : (
          methodState.B === "matrix" && (
            <Column>
              <BlockMath math={"b = " + latexB} />
              <Button
                onClick={() => {
                  setMethodState((prevState) => ({
                    ...prevState,
                    B: "input",
                  }));
                }}
              >
                Cambiar B
              </Button>
            </Column>
          )
        )}
      </Inputs>
      {loading && <p>Calculando...</p>}
      {results && !error ? (
        <Results>
          <BlockMath math={"T = " + renderLatexMatrix(results["mt"], 10)} />
          <BlockMath
            math={
              "C = " +
              renderLatexMatrix(
                results["mc"][0].map((valor) => [valor]),
                10
              )
            }
          />
          <p>
            <strong>Radio espectral</strong> :{" "}
            {results["radioEspectral"] &&
              format(results["radioEspectral"], {
                notation: "fixed",
                precision: 6,
              })}
          </p>
          {!error ? (
            <TableStyle>
              <table>
                <thead>
                  <tr>
                    <th>Iteración (i)</th>
                    <th>Error</th>
                    <th> Xn </th>
                  </tr>
                </thead>
                <tbody>
                  {results &&
                    Array.from({ length: results["iter"] }).map((_, index) => {
                      return (
                        <tr key={index}>
                          <td>{index}</td>
                          {results["error"].map((columna, columnIndex) => (
                            <td key={columnIndex}>
                              {format(columna[index], {
                                notation: "fixed",
                                precision: 10,
                              })}
                            </td>
                          ))}
                          <td>
                            {results["x"][index] && (
                              <BlockMath
                                math={renderLatexMatrix(
                                  results["x"][index].map((valor) => [valor]),
                                  10
                                )}
                              />
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <p> {conclusion} </p>
            </TableStyle>
          ) : (
            <React.Fragment>
              <Error>{error}</Error>
            </React.Fragment>
          )}
        </Results>
      ) : (
        error && (
          <Results>
            <Error>{error}</Error>
          </Results>
        )
      )}
      <Question
        onClick={() => setDisplayHelp(!displayHelp)}
        active={displayHelp}
      >
        Help
        <FontAwesomeIcon
          icon={displayHelp ? "arrow-alt-circle-up" : "arrow-alt-circle-down"}
        />
      </Question>
      {displayHelp && (
        <React.Fragment>
          <p>En SOR si w = 1 es como el método de Gauss-Seidel.</p>
          <p>
            En SOR, si 0 menos w menos 1 tenemos métodos de sub-relajación (usados en
            sistemas Gauss-Seidel no convergentes).
          </p>
          <p>
            En SOR,Y si 1 menos w menos 2, tenemos métodos de relajación excesiva (usados para
            "aumentar" la velocidad de algunos métodos).
          </p>
          <p>El vector inicial no es demasiado importante.</p>
          <p>el determinante de la matriz no puede ser 0.</p>
          <p>La matriz no puede tener un 0 en la diagonal principal</p>
          <p>El número de iteraciones debe ser positivo.</p>
          <p>La tolerancia debe ser positiva..</p>
        </React.Fragment>
      )}
    </>
  );
};

const ParametersMatrix = styled(Parameters)`
  display: flex;
  justify-content: center;
  form {
    display: grid;
    grid-template-rows: 75px;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    grid-template-columns: 200px 200px 200px 200px;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    @media (max-width: 990px) {
      grid-template-columns: 200px 200px 200px;
    }
    @media (max-width: 790px) {
      grid-template-columns: 200px 200px;
    }
    @media (max-width: 600px) {
      grid-template-columns: 200px;
    }
  }
  select {
    border: 2px solid ${Colors.primary.ocean.default};
  }
`;

export { MetodosIterativos };
