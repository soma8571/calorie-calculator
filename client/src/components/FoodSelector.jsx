import React, {useState, useEffect} from 'react';
import { foods } from '../nutritions-data';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
//import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function FoodSelector() {

   const [selectedFood, setSelectedFood] = useState("");
   const [consumedFoods, setConsumedFoods] = useState([]);
   const [consumedQuantity, setConsumedQuantity] = useState(50);

   useEffect(() => {
      if (selectedFood !== "") console.log(selectedFood);
   }, [selectedFood]);

   useEffect(()=> {
      console.log(consumedFoods);
   }, [consumedFoods])

   function renderNutritionOptions() {
      let options = [];
      options.push(<MenuItem key="empty" value=""></MenuItem>);
      const realOptions = foods.map((food, ind) => (
         <MenuItem key={ind} value={food.id}>
            {food.name}
         </MenuItem>
      ));
      options.push(...realOptions);
      return options;
   }

   function renderNutritionData() {
      const dataCells = foods
         .filter((food) => food.id === Number(selectedFood))
         .map((item, ind) => (
            <tr key={ind}>
               <td key="pr">{item.protein} g</td>
               <td key="fa">{item.fat} g</td>
               <td key="ch">{item.carbohydrate} g</td>
               <td key="kc">{item.calories} kc</td>
            </tr>
         ));
      return dataCells;
   }

   //amikor több elfogyasztott ételünk is van, akkor összesíteni kell ezek makrotápanyag értékeit
   function summarizeMacros() {
      let sumQuantity = consumedFoods.reduce((sum, current) => 
      sum + Number(current.consumed), 0);
      let sumProtein = consumedFoods.reduce((sum, current) => 
         sum + Number(current.protein), 0);
      let sumFat = consumedFoods.reduce((sum, current) => 
         sum + Number(current.fat), 0);
      let sumCh = consumedFoods.reduce((sum, current) => 
         sum + Number(current.carbohydrate), 0);
      let sumCal = consumedFoods.reduce((sum, current) => 
         sum + Number(current.calories), 0);
      const summaryRow = 
         <tr key="summary" className='summary'>
            <td>Összesen:</td>
            <td>{sumQuantity.toFixed(1)} g</td>
            <td>{sumProtein.toFixed(1)} g</td>
            <td>{sumFat.toFixed(1)} g</td>
            <td>{sumCh.toFixed(1)} g</td>
            <td>{sumCal.toFixed(1)} kc</td>
         </tr>;
      return summaryRow;
   }

   function deleteFood(e) {
      const toBeDeleted = e.target.dataset.id; 
      console.log(toBeDeleted);
      const filtered = consumedFoods.filter(food => food.id !== Number(toBeDeleted));
      setConsumedFoods(filtered);
   }

   function renderConsumedFoods() {
      const consumedFoodsRows = consumedFoods.map((food, ind) => 
         <tr key={ind}>
            <td>{food.name}</td>
            <td>{food.consumed}</td>
            <td>{food.protein} g</td>
            <td>{food.fat} g</td>
            <td>{food.carbohydrate} g</td>
            <td>{food.calories} kc</td>
            <td>
               <Button 
                  variant="contained" 
                  color="error"
                  onClick={e=>deleteFood(e)}
                  data-id={food.id}
               >
                  Törlés
               </Button>
            </td>
         </tr>
      );
      consumedFoodsRows.push(summarizeMacros());
      return consumedFoodsRows;
   }

   function handleSubmit(e) {
      e.preventDefault();
      if (consumedQuantity > 0) {
         const temp = foods.filter(item => item.id === Number(selectedFood));
         const selectedFoodObj = temp[0];
         const consumedFoodObj = {
            ...selectedFoodObj, 
            consumed: consumedQuantity,
         };
         for (let key in consumedFoodObj) {
            if (key !== "id" && key !== "name" && key !== "consumed") {
               consumedFoodObj[key] = (consumedFoodObj[key] * (consumedQuantity /100)).toFixed(1);
            }
         }
         setConsumedFoods(prev => [...prev, consumedFoodObj]);
         setConsumedQuantity(50);
      }
   }

   return (
      <div className="food-selector">
         <div className="select-container">
            <h2>Étel kiválasztása</h2>
            <Select
               id="nutritionSelect"
               value={selectedFood}
               onChange={(e) => setSelectedFood(e.target.value)}
               label="Étel"
            >
               {renderNutritionOptions()}
            </Select>
         </div>

         <div className="nutrition-data">
            {selectedFood !== "" && (
               <table>
                  <caption>Tápanyagérték 100g-ra nézve</caption>
                  <thead>
                     <tr>
                        <th>Fehérje</th>
                        <th>Zsír</th>
                        <th>Szénhidrát</th>
                        <th>Kalória</th>
                     </tr>
                  </thead>
                  <tbody>{renderNutritionData()}</tbody>
               </table>
            )}
         </div>

         <div className="consumed">
            {selectedFood !== "" && (
               <>
               <h2>Add meg az ételből elfogyasztott mennyiséget grammban</h2>
               <form>
                  <TextField
                     id="outlined-number"
                     label="Mennyiség"
                     type="number"
                     InputLabelProps={{
                        shrink: true,
                     }}
                     value={consumedQuantity}
                     onChange={e=>setConsumedQuantity(e.target.value)}
                  />
                  <Slider 
                     aria-label="Consumed quantity" 
                     value={consumedQuantity} 
                     onChange={e=>setConsumedQuantity(e.target.value)}
                     min={1}
                     max={300}
                     valueLabelDisplay="auto"
                  />
                  <div>
                  <Button 
                     variant='contained'
                     onClick={e=>handleSubmit(e)}
                  >
                     Fogyasztottam
                  </Button>
                  </div>
                  
               </form>
               </>)
            }
         </div>

         <div className="consumed-foods">
            {consumedFoods.length > 0 ?
               (<>
               <h2>Az étkezés adatai</h2>
               <table>
                  <caption>Az elfogyasztott étel(ek) makrói</caption>
                  <thead>
                     <tr>
                        <th>Étel neve</th>
                        <th>Elfogy. menny.</th>
                        <th>Fehérje</th>
                        <th>Zsír</th>
                        <th>Szénhidrát</th>
                        <th>Kalória</th>
                     </tr>
                  </thead>
                  <tbody>{renderConsumedFoods()}</tbody>
               </table>
               </>)
               :
               <p>Még nem adtál hozzá ételt!</p>
            }
         </div>
      </div>
   );
}

export default FoodSelector;
