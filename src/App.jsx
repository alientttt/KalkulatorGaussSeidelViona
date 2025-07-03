import { useState } from 'react'
import './App.css'
import IterationTable from './components/fragments/IterationTable'
function gaussSeidel(A, b, x0, tolerance, maxIterations) {
  const n = A.length;
  let x = [...x0];
  let iterations = [];
  let iteration = 0;
  let error = tolerance + 1;

  while (error > tolerance && iteration < maxIterations) {
    let xNew = [...x];
    let maxError = 0;

    for (let i = 0; i < n; i++) {
      let sum = b[i];
      for (let j = 0; j < n; j++) {
        if (j !== i) {
          sum -= A[i][j] * (j < i ? xNew[j] : x[j]);
        }
      }
      xNew[i] = sum / A[i][i]; 
      maxError = Math.max(maxError, Math.abs(xNew[i] - x[i]));
    }

    iterations.push({
      step: iteration + 1,
      x: [...xNew],
      error: maxError
    });

    error = maxError; 
    x = [...xNew];
    iteration++;
  }

  return { solution: x, iterations };
}

function MatrixInput({ matrix, onChange }) {
  return (
    <div className="bg-gradient-to-br from-pink-500/20 to-purple-600/20 backdrop-blur-sm p-6 rounded-2xl border-2 border-pink-400/50 shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 transition-all duration-300">
      <h2 className="text-xl sm:text-2xl mb-4 font-bold text-pink-600">
        Matriks A (3x3) ✨
      </h2>
      {matrix.map((row, i) => (
        <div key={i} className="flex space-x-2 mb-2">
          {row.map((val, j) => (
            <input
              key={j}
              type="number"
              value={val}
              onChange={(e) => onChange(i, j, e.target.value)}
              className="mA w-16 p-2 rounded-xl bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-pink-300 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-200 text-gray-800 font-semibold"
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function VectorInput({ vector, title, onChange }) {
  return (
    <div className="bg-gradient-to-br from-pink-500/20 to-purple-600/20 backdrop-blur-sm p-6 rounded-2xl border-2 border-pink-400/50 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300">
      <h2 className="text-xl sm:text-2xl mb-4 font-bold text-pink-600">
        {title} 🚀
      </h2>
      {vector.map((val, i) => (
        <input
          key={i}
          type="number"
          value={val}
          onChange={(e) => onChange(i, e.target.value)}
          className="mA w-full p-3 mb-2 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all duration-200 text-gray-800 font-semibold"
        />
      ))}
    </div>
  );
}

function ParametersInput({ tolerance, maxIterations, onToleranceChange, onMaxIterationsChange }) {
  return (
    <div className="bg-gradient-to-br from-pink-500/20 to-purple-600/20 backdrop-blur-sm p-6 rounded-2xl border-2 border-pink-400/50 shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 transition-all duration-300">
      <h2 className="text-xl sm:text-2xl mb-4 font-bold text-pink-600">
        Parameters ⚙️
      </h2>
      <div className="mb-4">
        <label className="block text-slate-600 font-semibold shadow-2xl mb-2">Batas Toleransi:</label>
        <input
          type="number"
          value={tolerance}
          onChange={(e) => onToleranceChange(parseFloat(e.target.value) || 0.0001)}
          className="mA w-full p-3 rounded-xl bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-pink-300 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-200 text-gray-800 font-semibold"
        />
      </div>
      <div>
        <label className="block text-slate-600 font-semibold shadow-2xl mb-2">Max Iterasi:</label>
        <input
          type="number"
          value={maxIterations}
          onChange={(e) => onMaxIterationsChange(parseInt(e.target.value) || 100)}
          className="mA w-full p-3 rounded-xl bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-pink-300 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-200 text-gray-800 font-semibold"
        />
      </div>
    </div>
  );
}

function ResultDisplay({ result }) {
  if (!result) return null;
  return (
    <div className="bg-gradient-to-br from-pink-500/20 to-purple-600/20 backdrop-blur-md p-6 rounded-2xl border-2 border-pink-400/60 shadow-xl shadow-purple-500/30 mt-8">
      <h2 className="text-xl sm:text-2xl mb-4 font-bold text-pink-600">
        Results 🎯
      </h2>
      <div className="bg-white/30 p-4 rounded-xl mb-4 border border-pink-600">
        <p className="text-black font-semibold text-lg mA">
          💫 Solution: [{result.solution.map(x => x.toFixed(2)).join(', ')}]
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm sm:text-base bg-black/20 rounded-xl overflow-hidden">
          <thead className="bg-gradient-to-r from-pink-600 to-gray-200">
            <tr>
              <th className="p-3 text-black font-bold">Step</th>
              <th className="p-3 text-black font-bold">x₁</th>
              <th className="p-3 text-black font-bold">x₂</th>
              <th className="p-3 text-black font-bold">x₃</th>
              <th className="p-3 text-black font-bold">Batas Error</th>
            </tr>
          </thead>
          <tbody>
            {result.iterations.map(({ step, x, error }, index) => (
              <tr key={step} className={`${index % 2 === 0 ? 'bg-pink-500/10' : 'bg-purple-500/10'} hover:bg-white/10 transition-colors duration-200`}>
                <td className="mA p-3 text-black font-semibold text-center">{step}</td>
                <td className="mA p-3 text-black font-semibold text-center">{x[0].toFixed(2)}</td>
                <td className="mA p-3 text-black font-semibold text-center">{x[1].toFixed(2)}</td>
                <td className="mA p-3 text-black font-semibold text-center">{x[2].toFixed(2)}</td>
                <td className="mA p-3 text-black font-semibold text-center">{error.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AlgorithmExplanation() {
  return (
    <div className=" bg-white/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-pink-600/50 shadow-lg shadow-purple-500/20 mb-8">
      <h2 className="text-xl sm:text-2xl mb-4 font-bold text-pink-600">
        Penjelasan Singkat 🧠
      </h2>
      <div className="text-sm sm:text-base text-black/90">
        <p className="mb-4 leading-relaxed">
          <strong className="text-pink-400 font-bold">Metode Gauss Seidel</strong> adalah teknik iteratif untuk menyelesaikan persamaan linear 
          <span className="font-mono bg-black/30 px-2 py-1 rounded mx-1">Ax = b</span>, artinya 
          <span className="font-mono bg-black/30 px-2 py-1 rounded mx-1">A</span> adalah matriks, 
          <span className="font-mono bg-black/30 px-2 py-1 rounded mx-1">x</span> adalah variabelnya, dan
          <span className="font-mono bg-black/30 px-2 py-1 rounded mx-1">b</span> matriks dari hasil persamaan.
        </p>
        <h3 className="text-lg font-bold text-pink-600 mb-3">Steps:</h3>
        <div className="space-y-2 text-slate-600">
          <div className="flex items-start">
            <span className="bg-gradient-to-r from-pink-400 to-slate-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
            <p>Input nilai persamaan kedalam bentuk matriks Ax=b</p>
          </div>
          <div className="flex items-start">
            <span className="bg-gradient-to-r from-pink-400 to-slate-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
            <p>Input nilai solusi awal</p>
          </div>
          <div className="flex items-start">
            <span className="bg-gradient-to-r from-pink-400 to-slate-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
            <p>Input nilai batas toleransi</p>
          </div>
          <div className="flex items-start">
            <span className="bg-gradient-to-r from-pink-400 to-slate-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
            <p>Input nilai max iterasi supaya iterasinya tidak terlalu banyak</p>
          </div>
          <div className="flex items-start">
            <span className="bg-gradient-to-r from-pink-400 to-slate-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">5</span>
            <p>Kalkulator ini khusus untuk matriks 3x3 saja</p>
          </div>
          <div className="flex items-start">
            <span className="bg-gradient-to-r from-pink-400 to-slate-200 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">6</span>
            <p>Hasil akhir akan muncul dikolom Result ketika sudah selesai.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [matrixA, setMatrixA] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]);
  const [vectorB, setVectorB] = useState([0, 0, 0]);
  const [initialX, setInitialX] = useState([0, 0, 0]);
  const [tolerance, setTolerance] = useState(0);
  const [maxIterations, setMaxIterations] = useState(0);
  const [result, setResult] = useState(null);

  const handleMatrixAChange = (i, j, value) => {
    const newMatrix = [...matrixA];
    newMatrix[i][j] = parseFloat(value) || 0;
    setMatrixA(newMatrix);
  };

  const handleVectorBChange = (i, value) => {
    const newVector = [...vectorB];
    newVector[i] = parseFloat(value) || 0;
    setVectorB(newVector);
  };

  const handleInitialXChange = (i, value) => {
    const newInitialX = [...initialX];
    newInitialX[i] = parseFloat(value) || 0;
    setInitialX(newInitialX);
  };

  const calculate = () => {
    const { solution, iterations } = gaussSeidel(matrixA, vectorB, initialX, tolerance, maxIterations);
    setResult({ solution, iterations });
  };

  return (
    <div className="min-h-screen bg-[url('./assets/pink-bg.jif')] bg-cover relative overflow-hidden rounded-xl py-6">
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-pink-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-400 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-1/3 w-36 h-36 bg-purple-400 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="container mx-auto p-4 sm:p-8 max-w-4xl relative z-10 fle">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-6xl font-bold bg-pink-600 bg-clip-text text-transparent mb-4 animate-pulse">
            🌟 GAUSS-SEIDEL 🌟
          </h1>
          <p className="text-xl text-pink-400 font-semibold shadow-2xl">
            Metode Numerik Semester 4 ✨
          </p>
        </div>
        
        <AlgorithmExplanation />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <MatrixInput matrix={matrixA} onChange={handleMatrixAChange} />
          <VectorInput vector={vectorB} title="Matriks Hasil (b)" onChange={handleVectorBChange} />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <VectorInput vector={initialX} title="Solusi Awal (x₀)" onChange={handleInitialXChange} />
          <ParametersInput
            tolerance={tolerance}
            maxIterations={maxIterations}
            onToleranceChange={setTolerance}
            onMaxIterationsChange={setMaxIterations}
          />
        </div>
        
        <button
          onClick={calculate}
          className="w-full p-6 text-xl font-bold  bg-pink-400 hover:bg-pink-600 rounded-2xl border-2 border-white/20 text-white/80 shadow-lg shadow-pink-500/50 hover:shadow-pink-500/70 transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          🚀 Kalkulasikan 🚀
        </button>
        
        <ResultDisplay result={result} />
      </div>
    </div>
  );
}

export default App;
