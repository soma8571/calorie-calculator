import React from 'react';
import { Button } from '@mui/material';

function MealDisplay( { meal, setMeal } ) {

    function deleteFood(e) {
        const toBeDeleted = e.target.dataset.id; 
        console.log(toBeDeleted);
        const filtered = meal.filter(food => food.id !== Number(toBeDeleted));
        setMeal(filtered);
    }

    //amikor több elfogyasztott ételünk is van, akkor összesíteni kell ezek makrotápanyag értékeit
    function summarizeMacros() {
        let sumQuantity = meal.reduce((sum, current) => 
        sum + Number(current.consumed), 0);
        let sumProtein = meal.reduce((sum, current) => 
        sum + Number(current.protein), 0);
        let sumFat = meal.reduce((sum, current) => 
        sum + Number(current.fat), 0);
        let sumCh = meal.reduce((sum, current) => 
        sum + Number(current.carbohydrate), 0);
        let sumCal = meal.reduce((sum, current) => 
        sum + Number(current.calories), 0);
        const summaryRow = 
        <tr key="summary" className='summary'>
            <td>Összesen:</td>
            <td>{sumQuantity.toFixed(1)} g</td>
            <td>{sumProtein.toFixed(1)} g</td>
            <td>{sumFat.toFixed(1)} g</td>
            <td>{sumCh.toFixed(1)} g</td>
            <td>{sumCal.toFixed(1)} kc</td>
            <td></td>
        </tr>;
        return summaryRow;
    }

    function renderConsumedFoods() {
        const consumedFoodsRows = meal.map((food, ind) => 
           <tr key={ind}>
              <td>{food.name}</td>
              <td>{food.consumed} g</td>
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

    return (
        <div className="consumed-foods">
            {meal.length > 0 ?
                (<>
                <h2>Az étkezés adatai</h2>
                <table>
                    <caption>Az elfogyasztott étel(ek) makrói</caption>
                    <thead>
                        <tr>
                            <th>Étel neve</th>
                            <th>Mennyiség</th>
                            <th>Fehérje</th>
                            <th>Zsír</th>
                            <th>Szénhidrát</th>
                            <th>Kalória</th>
                            <th>Művelet</th>
                        </tr>
                    </thead>
                    <tbody>{renderConsumedFoods()}</tbody>
                </table>
                </>)
                :
                <p>Még nem adtál hozzá ételt!</p>
            }
        </div>
    )
}

export default MealDisplay;
