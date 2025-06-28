export default function IterationTable({ A, B, X, tol, n }) {
  const results = [];
  const maxIter = 100;
  let current = [...X];

  for (let iter = 0; iter < maxIter; iter++) {
    const next = [...current];
    let errorMax = 0;

    for (let i = 0; i < n; i++) {
      let sigma = 0;
      for (let j = 0; j < n; j++) {
        if (j !== i) sigma += A[i][j] * next[j];
      }
      const newX = (B[i] - sigma) / A[i][i];
      errorMax = Math.max(errorMax, Math.abs(newX - current[i]));
      next[i] = newX;
    }

    results.push({ iter: iter + 1, values: [...next], error: errorMax });
    if (errorMax < tol) break;
    current = [...next];
  }

  return (
    <div className="mt-6 overflow-auto">
      <h2 className="text-xl font-semibold mb-2">Tabel Iterasi:</h2>
      <table className="table-auto border-collapse border border-gray-400">
        <thead>
          <tr className="bg-pink-200">
            <th className="border px-2">Iterasi</th>
            {X.map((_, i) => (
              <th key={i} className="border px-2">{`x${i + 1}`}</th>
            ))}
            <th className="border px-2">Error Maks</th>
          </tr>
        </thead>
        <tbody>
          {results.map((row, idx) => (
            <tr key={idx} className="text-center">
              <td className="border px-2">{row.iter}</td>
              {row.values.map((val, i) => (
                <td key={i} className="border px-2">{val.toFixed(6)}</td>
              ))}
              <td className="border px-2">{row.error.toExponential(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
