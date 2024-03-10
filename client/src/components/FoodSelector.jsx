import React, {useState, useEffect} from 'react';
import { foods } from '../nutritions-data';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
//import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MealDisplay from './MealDisplay';


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
                     value={Number(consumedQuantity)} 
                     onChange={e=>setConsumedQuantity(e.target.value)}
                     min={1}
                     max={800}
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

         <MealDisplay 
            meal={consumedFoods} 
            setMeal={setConsumedFoods}
         />
      </div>
   );
}

export default FoodSelector;
