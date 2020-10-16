import React, { useEffect, useState } from "react";
import { BehaviorSubject, Observable } from "rxjs";
import useCep from "./useCep";

import "./App.css";

const subject$ = new BehaviorSubject("");

function App() {
  const [value, setValue] = useState();
  const [ceps, setCeps] = useState();
  const getCep = useCep(subject$);

  useEffect(() => {
    const subscription = getCep.subscribe(
      (suggestions) => {
        console.log(suggestions);
        setCeps(suggestions || []);
      },
      (error) => {
        console.log(error);
        let message = error.response ? error.response.error : "try again";
        alert(message);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleChange = (event) => {
    let value = event.target.value;
    setValue(value);
    subject$.next(value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-sarch">
          <h2 className="App-tile"> Pesquise seu endereço </h2>
          <input
            className="App-input"
            onChange={(event) => handleChange(event)}
            placeholder="start typing"
          />
        </div>
        <div className="App-items">
          {ceps &&
            ceps.map(({ cep, uf, cidade, bairro, logradouro }) => (
              <div key={cep} className="App-cep">
                {cep} - {uf} - {cidade} - {bairro} - {logradouro}
              </div>
            ))}
        </div>
      </header>
    </div>
  );
}

export default App;
