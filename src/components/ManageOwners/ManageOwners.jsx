import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ManageOwners() {
  const dispatch = useDispatch();
  
  const owners = useSelector(state => state.ownerReducer)

  useEffect(() => {
    dispatch({
      type: 'FETCH_OWNERS'
    })
  }, []);
console.log(owners);
  
  return (
  <div>
    <h2>Manage Owners</h2>

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
              <td>Delete</td>
            </tr>
          )
        })}

      </tbody>
    </table>
  </div>)
}

export default ManageOwners;