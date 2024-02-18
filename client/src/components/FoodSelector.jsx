import React, {useState, useEffect} from 'react';
import { foods } from '../nutritions-data';

function FoodSelector() {

   const [selectedFood, setSelectedFood] = useState("");

  useEffect(() => {
    if (selectedFood !== "") console.log(selectedFood);
  }, [selectedFood]);

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
        <tr>
          <td key={ind}>{item.protein} g</td>
          <td key={ind}>{item.fat} g</td>
          <td key={ind}>{item.carbohydrate} g</td>
          <td key={ind}>{item.calories} kc</td>
        </tr>
      ));
    return dataCells;
  }

  return (
   <div className="food-selector">
      <div className="select-container">
         <label htmlFor="nutritionSelect">Étel:</label>
         <select
            id="nutritionSelect"
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
         <form>
            <input 
               type="number" 
               name="quantity" 
               id="quantity" 
               placeholder='Mennyiség (g)'
            />
            <input type="button" value="Fogyasztottam" />
         </form>
      </div>
   </div>
  )
}

export default FoodSelector;
