import React, { useState } from "react";
import {
  MediaContainer,
  Parameters,
  Eval,
  TableStyle,
  Button,
  Error,
  LinkGraph,
  Results,
  Question,
} from "../../Home/BigContainer";

import { parse, format } from "mathjs";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar } from "../../Home/Header";
import axios from "axios";
import { url } from "../../config";

const Secante = ({ name }) => {
  const [functionText, setFunctionText] = useState("log(sin(x)^2 + 1)-(1/2)");
  const [initialValueX0, setInitialValueX0] = useState(0.5);
  const [initialValueX1, setInitialValueX1] = useState(1);

  const [displayHelp, setDisplayHelp] = useState(false);
  const [tol, setTol] = useState(1e-7);
  const [iter, setIter] = useState(100);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [conclusion, setConclusion] = useState("");
  const [loading, setLoading] = useState(false);
  const [tipErr, setTipErr] = useState(1);

  const handleSubmit = async (event) => {
    // verificar que no haya campos vacíos
    if (
      !event.target.functionText.value ||
      !event.target.initialValueX0.value ||
      !event.target.initialValueX1.value ||
      !event.target.tol.value ||
      !event.target.maxCount.value
    ) {
      window.alert("No pueden haber campos vacíos");
      return;
    }

    if (parseInt(event.target.maxCount.value) > 100) {
      window.alert("El número de iteraciones debe ser menor a 100");
      return;
    }

    if (parseFloat(event.target.tol.value) < 0) {
      window.alert("La tolerancia debe ser positiva");
      return;
    }
    
    event.preventDefault();
    setData(null);
    setError(null);
    setConclusion("");
    try {
      parse(event.target.functionText.value);
      setFunctionText(event.target.functionText.value);
      setInitialValueX0(event.target.initialValueX0.value);
      setInitialValueX1(event.target.initialValueX1.value);
      setTol(event.target.tol.value);
      setIter(event.target.maxCount.value);
      setTipErr(event.target.errorType.value);
      setError(null);

      const data = {
        func: event.target.functionText.value,
        x0: parseFloat(event.target.initialValueX0.value),
        x1: parseFloat(event.target.initialValueX1.value),
        niter: parseInt(event.target.maxCount.value),
        tol: parseFloat(event.target.tol.value),
        tipErr: parseInt(event.target.errorType.value),
      };
      try {
        setLoading(true);
        const response = await axios.post(`${url}/non-linear/secante`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const responseData = response.data;
        setData(responseData);

        if (responseData["mes_err"].length == 0) {
          setConclusion(responseData["mes"]);
        } else {
          setError(responseData["mes_err"]);
        }
      } catch (e) {
        setError(e.toString());
      }
    } catch (e) {
      setError(e.toString());
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <MediaContainer width={"900px"}>
        <Parameters width={"900px"}>
          <p>
            <strong>Parámetros</strong>
          </p>
          <p className="mb-3">
            Asegurate que la función sea continua para el intervalo dado. Para
            eso puedes graficar la función:{" "}
            <a
              className="text-alert-text"
              href={"/graficar?function=" + encodeURIComponent(functionText)}
              target="_blank"
              rel="noopener noreferrer"
            >
              f(x)
            </a>{" "}
          </p>
          <form onSubmit={handleSubmit}>
            <label>
              Función f
              <input
                type="text"
                name="functionText"
                defaultValue={functionText}
                style={{
                  border: "1px solid #000",
                  borderRadius: "20px",
                  width: "250px",
                  height: "35px",
                }}
              />
            </label>
            <label>
              Valor inicial (x0)
              <input
                type="text"
                name="initialValueX0"
                defaultValue={initialValueX0}
                style={{
                  border: "1px solid #000",
                  borderRadius: "20px",
                  width: "250px",
                  height: "35px",
                }}
              />
            </label>
            <label>
              Valor inicial (x1)
              <input
                type="text"
                name="initialValueX1"
                defaultValue={initialValueX1}
                style={{
                  border: "1px solid #000",
                  borderRadius: "20px",
                  width: "250px",
                  height: "35px",
                }}
              />
            </label>
            <label>
              Tolerancia
              <input
                type="text"
                name="tol"
                defaultValue={tol}
                style={{
                  border: "1px solid #000",
                  borderRadius: "20px",
                  width: "250px",
                  height: "35px",
                }}
              />
            </label>
            <label style={{ display: "flex", flexDirection: "column" }}>
              Tipo de error
              <select name="errorType" id="errorType" defaultValue={tipErr}>
                <option value={1}>Absoluto</option>
                <option value={0}>Relativo</option>
              </select>
            </label>
            <label>
              Iteraciones (maximo 100)
              <input
                type="text"
                name="maxCount"
                defaultValue={iter}
                style={{
                  border: "1px solid #000",
                  borderRadius: "20px",
                  width: "250px",
                  height: "35px",
                }}
              />
            </label>
            <Button>Ejecutar</Button>
          </form>
        </Parameters>
        <Eval>
          <p>
            <strong>{name}</strong>
          </p>
          {!error ? (
            <TableStyle>
              <table>
                <thead>
                  <tr>
                    <th>Iteración(i)</th>
                    <th>xi</th>
                    <th>f(xi)</th>
                    <th>E</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan={4}>Loading...</td>
                    </tr>
                  )}
                  {data &&
                    Array.from({ length: Object.entries(data)[0][1] }).map(
                      (_, index) => (
                        <tr key={index}>
                          <td>{index}</td>
                          {Array.isArray(data.xn) &&
                            data.xn.map((columna, columnIndex) => (
                              <td key={columnIndex}>
                                {format(columna[index], {
                                  notation: "fixed",
                                  precision: 10,
                                })}
                              </td>
                            ))}

                          {Array.isArray(data.fm) &&
                            data.fm.map((columna, columnIndex) => (
                              <td key={columnIndex}>
                                {format(columna[index], {
                                  notation: "fixed",
                                  precision: 10,
                                })}
                              </td>
                            ))}

                          {Array.isArray(data.err_array) &&
                            data.err_array.map((columna, columnIndex) => (
                              <td key={columnIndex}>
                                {format(columna[index], {
                                  notation: "exponential",
                                  precision: 4,
                                })}
                              </td>
                            ))}
                        </tr>
                      )
                    )}
                </tbody>
              </table>
              <p> {conclusion} </p>
            </TableStyle>
          ) : (
            <Results>
              <Error>{error}</Error>
              <Link to={"/help"}>
                <FontAwesomeIcon icon={"question-circle"} /> Help Page
              </Link>
            </Results>
          )}
        </Eval>
      </MediaContainer>
      <Question
        onClick={() => setDisplayHelp(!displayHelp)}
        active={displayHelp}
      >
        Help
      </Question>
      {displayHelp && (
        <React.Fragment>
          <p>
            El método de Newton es generalmente más rápido que los otros métodos. Si el
            derivada se acerca a cero, el método pierde su velocidad porque es
            Es posible que se trate de un caso de raíz múltiple.
          </p>
          <p>Asegúrese de que la función tenga una raíz.</p>
          <p>El valor inicial es muy, muy importante.</p>
          <p>La tolerancia debe tener un valor positivo.</p>
          <p>El número de iteración debe ser positivo.</p>
        </React.Fragment>
      )}
    </>
  );
};

export { Secante };
