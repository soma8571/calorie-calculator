import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function NewFood() {

  const foodStructure = {
    food_name: "",
    protein_content: 0,
    fat_content: 0,
    ch_content: 0,
    calories: 0,
  }
  const [food, setFood] = useState(foodStructure);

  useEffect(()=>{
    console.log(food);
  }, [food])
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    let temp = {...food, [name]: Number(value)}
    //console.log(temp);
    setFood(temp);

    /* setFood(prev => {
      return {...prev, [name]: Number(value)}
    }); */
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ok");

  }

  return (
    <div className='newfood'>
      <form onSubmit={e=>handleSubmit(e)}>
        <TextField
          required
          id="newfood-name"
          name="food_name"
          label="Étel név"
          value={food.food_name}
          onChange={e=>handleChange(e)}
        />
        <TextField
          required
          id="newfood-protein"
          name="protein-content"
          label="Fehérje"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={food.protein_content}
          onChange={e=>handleChange(e)}
        />
        <TextField
          required
          id="newfood-fat"
          name="fat-content"
          label="Zsír"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={food.fat_content}
          onChange={e=>handleChange(e)}
        />
        <TextField
          required
          id="newfood-ch"
          name="ch-content"
          label="Szénhidrát"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={food.ch_content}
          onChange={e=>handleChange(e)}
        />
        <TextField
          id="newfood-cal"
          name="calories"
          label="Kalória"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          value={food.calories}
          onChange={e=>handleChange(e)}
        />
        <Button 
          variant='contained'
          type='submit'
        >
          Étel mentése
        </Button>
      </form>
    </div>
  )
}

export default NewFood;
