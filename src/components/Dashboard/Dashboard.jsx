import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Dashboard() {
  const dispatch = useDispatch();
  
  const pets = useSelector(state => state.petReducer)
  const owners = useSelector(state => state.ownerReducer)

  const [newPet, setNewPet] = useState({
    owner: '',
    name: '',
    breed: '',
    color: '',
  });

  useEffect(() => {
    dispatch({
      type: 'FETCH_PETS'
    })

    dispatch({
      type: 'FETCH_OWNERS'
    })
  }, []);

  const addPet = (evt) => {
    evt.preventDefault();
    console.log(newPet)

    dispatch({
      type: 'ADD_PET',
      payload: newPet
    })
  } // end addPet

  const handleChange = (value, key) => {
    setNewPet({...newPet, [key]: value})
  } // end handleChange
  
  const handleDelete = (id) => {
    dispatch({
      type: 'DELETE_PET',
      payload: id
    });
  }

  

  return (
    <div>
      <h2>Pod 1 Rules</h2>

      <form onSubmit={addPet}>
        <input 
          type="text" 
          placeholder="Pet's Name" 
          value={newPet.name} 
          onChange={(event) => handleChange(event.target.value, 'name')} 
          required/>
        <input 
          type="text" 
          placeholder="Pet's Breed" 
          value={newPet.breed} 
          onChange={(event) => handleChange(event.target.value, 'breed')} 
          required/>
        <input 
          type="text" 
          placeholder="Pet's Color"
          value={newPet.color} 
          onChange={(event) => handleChange(event.target.value, 'color')}  
          required/>

        <select onChange={(event) => handleChange(event.target.value, 'owner')}>
          {owners.map((owner) => {
            return (
              <option 
                key={owner.id} 
                value={owner.id}
                >
                {owner.name}
              </option>)
          })}
        </select>

        <button>Submit</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Owner</th>
            <th>Pet</th>
            <th>Breed</th>
            <th>Color</th>
            <th>Checked In</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {pets.map((pet) => {
            return(
              <tr key={pet.id}>
                <td>{pet.owner}</td>
                <th>{pet.name}</th>
                <th>{pet.breed}</th>
                <th>{pet.color}</th>
                <th>{pet.checkin ? <>{pet.checkin}</> : <>No</>}</th>
                <th><button onClick={() => handleDelete(pet.id)}>Delete</button></th>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard