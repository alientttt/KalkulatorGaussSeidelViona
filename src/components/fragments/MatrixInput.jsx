import { useState } from "react";

export default function MatrixInput({ onSubmit }) {
  const [n, setN] = useState(3);
  const [A, setA] = useState(Array(3).fill(Array(3).fill(0)));
  const [B, setB] = useState(Array(3).fill(0));
  const [X, setX] = useState(Array(3).fill(0));
  const [tol, setTol] = useState(0.001);

  const handleChangeN = (val) => {
    const newN = parseInt(val);
    setN(newN);
    setA(Array(newN).fill().map(() => Array(newN).fill(0)));
    setB(Array(newN).fill(0));
    setX(Array(newN).fill(0));
  };

  const handleMatrixChange = (i, j, val) => {
    const newA = A.map((row, rowIndex) =>
      row.map((cell, colIndex) => (rowIndex === i && colIndex === j ? parseFloat(val) : cell))
    );
    setA(newA);
  };

  const handleVectorChange = (setter, index, val) => {
    setter((prev) => prev.map((v, i) => (i === index ? parseFloat(val) : v)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ A, B, X, tol, n });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Ordo Matriks (n):</label>
        <input
          type="number"
          value={n}
          min={2}
          onChange={(e) => handleChangeN(e.target.value)}
          className="ml-2 border p-1"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Matrix A:</p>
          {A.map((row, i) => (
            <div key={i} className="flex gap-2">
              {row.map((val, j) => (
                <input
                  key={j}
                  type="number"
                  step="any"
                  value={val}
                  onChange={(e) => handleMatrixChange(i, j, e.target.value)}
                  className="w-14 p-1 border"
                />
              ))}
            </div>
          ))}
        </div>
        <div>
          <p className="font-semibold">Vector B dan Solusi Awal X:</p>
          {B.map((_, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="number"
                step="any"
                value={B[i]}
                onChange={(e) => handleVectorChange(setB, i, e.target.value)}
                className="w-14 p-1 border"
              />
              <input
                type="number"
                step="any"
                value={X[i]}
                onChange={(e) => handleVectorChange(setX, i, e.target.value)}
                className="w-14 p-1 border"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <label>Toleransi:</label>
        <input
          type="number"
          step="any"
          value={tol}
          onChange={(e) => setTol(parseFloat(e.target.value))}
          className="ml-2 border p-1"
        />
      </div>

      <button type="submit" className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">
        Hitung
      </button>
    </form>
  );
}
