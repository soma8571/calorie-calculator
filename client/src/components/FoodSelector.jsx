import React, {useState, useEffect} from 'react';
import { foods } from '../nutritions-data';

function FoodSelector() {

   const [selectedFood, setSelectedFood] = useState("");
   const [consumedFoods, setConsumedFoods] = useState([]);
   const [consumedQuantity, setConsumedQuantity] = useState(0);

   useEffect(() => {
      if (selectedFood !== "") console.log(selectedFood);
   }, [selectedFood]);

   useEffect(()=> {
      console.log(consumedFoods);
   }, [consumedFoods])

   function renderNutritionOptions() {
      let options = [];
      options.push(<option key="empty" value=""></option>);
      const realOptions = foods.map((food, ind) => (
         <option key={ind} value={food.id}>
         {food.name}
         </option>
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
            <td>{sumProtein.toFixed(1)} g</td>
            <td>{sumFat.toFixed(1)} g</td>
            <td>{sumCh.toFixed(1)} g</td>
            <td>{sumCal.toFixed(1)} kc</td>
         </tr>;
      return summaryRow;
   }

   function renderConsumedFoods() {
      const consumedFoodsRows = consumedFoods.map((food, ind) => 
         <tr key={ind}>
            <td>{food.name}</td>
            <td>{food.protein} g</td>
            <td>{food.fat} g</td>
            <td>{food.carbohydrate} g</td>
            <td>{food.calories} kc</td>
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
         const consumedFoodObj = {...selectedFoodObj};
         for (let key in consumedFoodObj) {
            if (key !== "id" && key !== "name") {
               consumedFoodObj[key] = (consumedFoodObj[key] * (consumedQuantity /100)).toFixed(1);
            }
         }
         setConsumedFoods(prev => [...prev, consumedFoodObj]);
         setConsumedQuantity(0);
      }
   }

   return (
      <div className="food-selector">
         <div className="select-container">
            <h2>Étel kiválasztása</h2>
            <select
               id="nutritionSelect"
               value={selectedFood}
               onChange={(e) => setSelectedFood(e.target.value)}
            >
               {renderNutritionOptions()}
            </select>
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
               <form onSubmit={e=>handleSubmit(e)}>
                  <input 
                     type="number" 
                     name="quantity" 
                     id="quantity" 
                     placeholder='Mennyiség (g)'
                     value={consumedQuantity}
                     onChange={e=>setConsumedQuantity(e.target.value)}
                     required
                  />
                  <input type="submit" value="Fogyasztottam" />
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
