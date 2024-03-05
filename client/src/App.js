import './App.css';
import FoodSelector from './components/FoodSelector.jsx';
import Layout from './components/Layout.jsx';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Layout content={<FoodSelector />} />}
        />
        <Route 
          path="/"
          element={<Layout content={<FoodSelector />} />}
        />
      </Routes>
    </div>
  );
}

export default App;
