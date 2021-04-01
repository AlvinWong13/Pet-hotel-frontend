import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ManageOwners() {
  const dispatch = useDispatch();
  
  const owners = useSelector(state => state.ownerReducer)

  const [newOwner, setNewOwner] = useState('');

  useEffect(() => {
    dispatch({
      type: 'FETCH_OWNERS'
    })
  }, []);
console.log(owners);

const addOwner = e => {
  e.preventDefault();
  
  dispatch({
    type: 'ADD_OWNER',
    payload: { name: newOwner }
  })
  
  setNewOwner('');
}

const deleteOwner = id => {
  dispatch({
    type: 'DELETE_OWNER',
    payload: id
  })
}
  
  return (
  <div>
    <h2>Manage Owners</h2>
    <h3>Add Owner</h3>
    <form onSubmit={addOwner}>
      <input
        type="text"
        placeholder="Owner Name"
        value={newOwner}
        onChange={(event) => setNewOwner(event.target.value)}
      />
      <button>Add Owner</button>
    </form>

    <br />

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Number of Pets</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {owners.map((owner) => {
          return(
            <tr key={owner.id}>
              <td>{owner.name}</td>
              <td>{owner.count}</td>
              <td><button onClick={() => deleteOwner(owner.id)}>Delete</button></td>
            </tr>
          )
        })}

      </tbody>
    </table>
  </div>)
}

export default ManageOwners;