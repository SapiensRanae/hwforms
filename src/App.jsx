import { useState } from 'react'
import './App.css'

function App() {

    const [item, setItem] = useState({
        name: '',
        description: '',
        price: 0,
    });

    const [savedItem, setSavedItem] = useState({
        name: '',
        description: '',
        price: 0,
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(item);
        setSavedItem(item);
        validatePrice();
        validateText();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem({
            ...item,
            [name]: value,
        });
    }
    const validatePrice = () => {
        if (Number(item.price) <= 0) {
            alert("Price must be greater than 0");
        }

    }

    const validateText= () => {
      if (!item.name || !item.description) {
          alert("Name and description must be filled");
      }
    }
  return (
<>

    <form >
        <input type="text"
               name="name"
        value={item.name}
               onChange={handleChange}
               placeholder="Name"

        />
        <input type="text"
               name="description"
        value={item.description}
               onChange={handleChange}
               placeholder="Description"

        />
        <input type="number"
               name="price"
        value={item.price}
               onChange={handleChange}
               placeholder="Price"
        />
        <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>

    <div>
        <h1>{savedItem.name}</h1>
        <p>{savedItem.description}</p>
        <p>{savedItem.price? savedItem.price : "none items are saved"}</p>
    </div>


</>
  )
}

export default App
