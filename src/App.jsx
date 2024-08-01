import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./styles.css";

import api from './services/api';

function App() {
  const [input, setInput] = useState('');
  const [cepData, setCepData] = useState(null);

  async function handleSearch() {
    if (input === '') {
      alert("Preencha algum CEP!");
      return;
    }

    try {
      const response = await api.get(`${input}/json/`);
      setCepData(response.data);
    } catch {
      alert("Ops, erro ao buscar CEP");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite Seu CEP"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#000" />
        </button>
      </div>
      <main className="main">
        {cepData ? (
          <>
            <h2>CEP: {cepData.cep}</h2>
            <span>Rua: {cepData.logradouro}</span>
            <span>Complemento: {cepData.complemento}</span>
            <span>Bairro: {cepData.bairro}</span>
            <span>Cidade: {cepData.localidade} - {cepData.uf}</span>
          </>
        ) : (
          <span className="titleToSearch">Digite um CEP e Clique em Buscar.</span>
        )}
      </main>
    </div>
  );
}

export default App;
