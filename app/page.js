'use client'
import React, { useState } from 'react';
import "./globals.css";

export default function Home() {
  const [rows, setRows] = useState([Array(5).fill("")]);
  const [status, setStatus] = useState([Array(5).fill("")]); // Estado para armazenar o status de cada letra (correta/incorreta)
  
  const rightText = ['A', 'L', 'T', 'A', 'R'];

  // Manipula a alteração de valor de um input específico
  const handleInputChange = (rowIndex, inputIndex, value) => {
    const newRows = [...rows];
    newRows[rowIndex][inputIndex] = value.toUpperCase();
    setRows(newRows);
  };

  // Função chamada ao enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    const lastRow = rows[rows.length - 1];
    const newStatus = [...status];

    // Verifica letra por letra
    for (let i = 0; i < rightText.length; i++) {
      if (lastRow[i] === rightText[i]) {
        newStatus[rows.length - 1][i] = 'correct'; // Letra correta
        
      } else {
        newStatus[rows.length - 1][i] = 'incorrect'; // Letra incorreta
      }
    }

    setStatus(newStatus);

    // Adiciona uma nova linha de inputs vazios e o status para a nova linha
    setRows([...rows, Array(5).fill("")]);
    setStatus([...newStatus, Array(5).fill("")]);
  };

  return (
    
    <div className="container">
      <h4 className="big-green-text">Acerte a palavra</h4>
      <form className="term-form" onSubmit={handleSubmit}>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((letter, inputIndex) => (
              <input
                key={inputIndex}
                type="text"
                maxLength="1"
                value={letter}
                onChange={(e) => handleInputChange(rowIndex, inputIndex, e.target.value)}
                className={`letter-input ${
                  status[rowIndex][inputIndex] === 'correct' ? 'correct' : 
                  status[rowIndex][inputIndex] === 'incorrect' ? 'incorrect' : ''
                }`}
                autoFocus={rowIndex === rows.length - 1 && inputIndex === 0} // Foca no primeiro input da nova linha
              />
            ))}
          </div>
        ))}
        <button type="submit" className="invisible-button"></button>
      </form>
    </div>
    

  );
}
