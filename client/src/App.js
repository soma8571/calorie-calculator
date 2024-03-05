import './App.css';
import FoodSelector from './components/FoodSelector.jsx';
import Layout from './components/Layout.jsx';
import {Routes, Route} from "react-router-dom";
import NewFood from './components/NewFood.jsx';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Layout content={<FoodSelector />} />}
        />
        <Route 
          path="uj-etel"
          element={<Layout content={<NewFood />} />}
        />
      </Routes>
    </div>
  );
}

export default App;
