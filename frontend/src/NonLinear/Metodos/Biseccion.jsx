import React, { useEffect, useState } from "react";
import {
  Parameters,
  Eval,
  TableStyle,
  Button,
  Error,
  LinkGraph,
  MediaContainer,
  Results,
  Question,
} from "../../Home/BigContainer";
import { format, i, parse } from "mathjs";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar } from "../../Home/Header";
import axios from "axios";
import { url } from "../../config";

const Biseccion = ({ name }) => {
  const [functionText, setFunctionText] = useState("log(sin(x)^2 + 1)-(1/2)");
  const [lowValue, setLowValue] = useState(0);
  const [highValue, setHighValue] = useState(1);
  const [tol, setTol] = useState(1e-7);
  const [iter, setIter] = useState(100);
  const [displayHelp, setDisplayHelp] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [conclusion, setConclusion] = useState("");
  const [loading, setLoading] = useState(false);
  const [tipErr, setTipErr] = useState(1);

  const handleSubmit = async (event) => {
    // vefiricar que no haya campos vacios
    if (!event.target.functionText.value || !event.target.lowValue.value || !event.target.highValue.value || !event.target.tol.value || !event.target.maxCount.value || !event.target.errorType.value) {
      window.alert("No pueden haber campos vacíos");
      return;
    }

    if (event.target.maxCount.value > 100) {
      window.alert("El número de iteraciones debe ser menor a 100");
      return;
    }

    if (event.target.tol.value < 0) {
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
      setLowValue(event.target.lowValue.value);
      setHighValue(event.target.highValue.value);
      setTol(event.target.tol.value);
      setIter(event.target.maxCount.value);
      setTipErr(event.target.errorType.value);
      setError(null);
      const data = {
        func: event.target.functionText.value,
        a: parseFloat(event.target.lowValue.value),
        b: parseFloat(event.target.highValue.value),
        niter: parseInt(event.target.maxCount.value),
        tol: parseFloat(event.target.tol.value),
        tipErr: parseInt(event.target.errorType.value),
      };
      try {
        setLoading(true);
        setData(null);
        const response = await axios.post(`${url}/non-linear/biseccion`, data, {
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
      <MediaContainer width={"1100px"} className="mt-20">
        <Parameters width={"1100px"}>
          <p className="">
            <strong>Párametros</strong>
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
              Gráficar f(x).
            </a>
          </p>
          <form onSubmit={handleSubmit}>
            <label>
              Función
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
              Valor inferior del intervalo (a)
              <input
                type="text"
                name="lowValue"
                defaultValue={lowValue}
                style={{
                  border: "1px solid #000",
                  borderRadius: "20px",
                  width: "250px",
                  height: "35px",
                }}
              />
            </label>
            <label>
              Valor superior del intervalo (b)
              <input
                type="text"
                name="highValue"
                defaultValue={highValue}
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
            <label style={{display:"flex", flexDirection:"column"}}>
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
            <TableStyle widthTwo={"584px"}>
              <table>
                <thead>
                  <tr>
                    <th>Iteración</th>
                    <th>a</th>
                    <th>xm</th>
                    <th>b</th>
                    <th>f(xm)</th>
                    <th>E</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan="6">Cargando...</td>
                    </tr>
                  )}
                  {data &&
                    Array.from({ length: Object.entries(data)[0][1] }).map(
                      (_, index) => (
                        <tr key={index}>
                          <td>{index}</td>
                          {Array.isArray(data.a) &&
                            data.a.map((columna, columnIndex) => (
                              <td key={columnIndex}>
                                {format(columna[index], {
                                  notation: "fixed",
                                  precision: 10,
                                })}
                              </td>
                            ))}

                          {Array.isArray(data.xm) &&
                            data.xm.map((columna, columnIndex) => (
                              <td key={columnIndex}>
                                {format(columna[index], {
                                  notation: "fixed",
                                  precision: 10,
                                })}
                              </td>
                            ))}

                          {Array.isArray(data.b) &&
                            data.b.map((columna, columnIndex) => (
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

                          {Array.isArray(data.err) &&
                            data.err.map((columna, columnIndex) => (
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
              <p>{conclusion} </p>
            </TableStyle>
          ) : (
            <Results>
              <Error>{error}</Error>
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
              La función debe ser continua y diferenciable, además
              La función específica evaluada en los extremos del intervalo debe tener un
              signo diferente.
            </p>
            <p>El valor de A debe ser menor que b.</p>
            <p>La tolerancia debe tener un valor positivo.</p>
            <p>Ambos valores, a y b, deben existir en la función.</p>
            <p>El número de iteración debe ser positivo.</p>
        </React.Fragment>
      )}
    </>
  );
};

export { Biseccion };
