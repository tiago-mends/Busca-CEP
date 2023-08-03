import "./App.css";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

import api from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === "") {
      alert("Preencha algum número de CEP!");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch {
      alert("Ops, erro ao buscar.");
      setInput("");
    }
  }

  return (
    <div className="container">
      <div className="header">
        <p className="logo">Busca CEP</p>
      </div>
      <div className="main">
        <div className="containerInput">
          <div>
            <FiSearch size={19} color="#B742FF" className="icon" />
            <input
              type="number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite seu CEP..."
            />
          </div>
          <button onClick={handleSearch}>Buscar</button>
        </div>

        {Object.keys(cep).length > 0 && (
          <div className="resultsArea">
            <h2>CEP: {cep.cep}</h2>
            <span>Rua: {cep.logradouro}</span>
            <span>Bairro: {cep.bairro}</span>
            <span>
              Cidade: {cep.localidade}/{cep.uf}
            </span>
          </div>
        )}
      </div>

      <div className="imgLeft" />
      <div className="imgRight" />
    </div>
  );
}

export default App;
