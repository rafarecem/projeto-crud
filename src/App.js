import React, { useState } from 'react';
import './App.css';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [produtoAtual, setProdutoAtual] = useState({ nome: "", descricao: "", preco: "" });
  const [indiceEdicao, setIndiceEdicao] = useState(null);

  const adicionarProduto = () => {
    if (!produtoAtual.nome.trim() || !produtoAtual.descricao.trim() || !produtoAtual.preco.trim()) return;

    if (indiceEdicao !== null) {
      const produtosAtualizados = produtos.map((produto, index) => (
        index === indiceEdicao ? produtoAtual : produto
      ));
      setProdutos(produtosAtualizados);
      setIndiceEdicao(null);
    } else {
      setProdutos([...produtos, produtoAtual]);
    }

    setProdutoAtual({ nome: "", descricao: "", preco: "" });
  };

  const editarProduto = (index) => {
    setProdutoAtual(produtos[index]);
    setIndiceEdicao(index);
  };

  const deletarProduto = (index) => {
    setProdutos(produtos.filter((_, i) => i !== index));
  };

  const handlePrecoChange = (e) => {
    const valor = e.target.value;
    if (!isNaN(valor) || valor === "") {
      setProdutoAtual({ ...produtoAtual, preco: valor });
    }
  };

  return (
    <div className="App">
      <h1>CRUD de Produtos</h1>
      <div className="input-container">
        <input
          type="text"
          value={produtoAtual.nome}
          onChange={(e) => setProdutoAtual({ ...produtoAtual, nome: e.target.value })}
          placeholder="Nome do produto"
        />
        <input
          type="text"
          value={produtoAtual.descricao}
          onChange={(e) => setProdutoAtual({ ...produtoAtual, descricao: e.target.value })}
          placeholder="Descrição do produto"
        />
        <input
          type="text"
          value={produtoAtual.preco}
          onChange={handlePrecoChange}
          placeholder="Preço do produto"
        />
        <button onClick={adicionarProduto} className="btn-add">
          {indiceEdicao !== null ? "Atualizar" : "Adicionar"}
        </button>
      </div>
      <ul className="item-list">
        {produtos.map((produto, index) => (
          <li key={index} className="item">
            <span className="item-text">
              <strong>Nome:</strong> {produto.nome} <br />
              <strong>Descrição:</strong> {produto.descricao} <br />
              <strong>Preço:</strong> R$ {produto.preco}
            </span>
            <button onClick={() => editarProduto(index)} className="btn-edit">Editar</button>
            <button onClick={() => deletarProduto(index)} className="btn-delete">Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
