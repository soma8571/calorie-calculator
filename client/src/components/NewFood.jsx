import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";

function NewFood() {

  const foodStructure = {
    food_name: "",
    protein_content: "",
    fat_content: "",
    ch_content: "",
    calories: "",
  }
  const [food, setFood] = useState(foodStructure);
  const [isSending, setIsSending] = useState(false);

  useEffect(()=>{
    console.log(food);
  }, [food])

  async function saveFood() {
    const url = `${process.env.REACT_APP_API_URL}/newfood`;
    setIsSending(true);
    try {
      const {data} = await axios.post(url, food);
      console.log(data);
      console.log("Küldés");
    } catch (err) {
      console.log(err);
    } finally {
      
      setTimeout(()=> setIsSending(false), 2000);
    }
  }
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    if (name === "food_name") {
      setFood(prev => {
        return {...prev, [name]: value}
      });
    } else {
      setFood(prev => {
        return {...prev, [name]: Number(value)}
      });
    }
    
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    saveFood();
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
          name="protein_content"
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
          name="fat_content"
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
          name="ch_content"
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
        {isSending ? 
          (<div>Az adatok mentése...</div>)
          :
          (<Button 
          variant='contained'
          type='submit'
          >
            Étel mentése
          </Button>)
        }
      </form>
    </div>
  )
}

export default NewFood;
