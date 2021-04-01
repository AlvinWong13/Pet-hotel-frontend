import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Dashboard() {
  const dispatch = useDispatch();
  
  const pets = useSelector(state => state.petReducer)

  const [newPetName, setNewPetName] = useState('');

  useEffect(() => {
    dispatch({
      type: 'FETCH_PETS'
    })
  }, []);

  console.log(pets)

  return (
    <div>
      <h2>Pod 1 Rules</h2>

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
              <tr>
                <td>{pet.owner}</td>
                <th>{pet.name}</th>
                <th>{pet.breed}</th>
                <th>{pet.color}</th>
                <th>{pet.checkin ? <>{pet.checkin}</> : <>No</>}</th>
                <th><button>Delete</button></th>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard