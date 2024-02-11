import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [formData, setFormData] = useState({firstname: '', lastname: '', city: ''});

  const [records, setRecords] = useState([]);

  const [isEditing, setIsEditing] = useState(false);

  const [editingId, setEditingId] = useState(null);


  useEffect(() => {
    fetchData();
  }, [])




  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      //Update the record
      fetch(`https://db-infocapture-default-rtdb.asia-southeast1.firebasedatabase.app/user/${editingId}.json`, {
        method: 'PUT',
        header: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      }).then(()=> {
        
        setIsEditing(false);
        setEditingId(null);
        setFormData({firstname: '', lastname: '', city: ''});
        fetchData();
      })

    } else {
       //adding Record
       
        fetch('https://db-infocapture-default-rtdb.asia-southeast1.firebasedatabase.app/user.json', {
          method: 'POST',
          header: {'Content-Type': 'application/json'},
          body: JSON.stringify(formData)
        })
        fetchData();
      }
    }

   

  
  const fetchData = () => {
    fetch('https://db-infocapture-default-rtdb.asia-southeast1.firebasedatabase.app/user.json').then(response => response.json()).then(data => {
      const loadedRecords = [];
      for (const key in data) {
        loadedRecords.push(
          {
            id: key,
            ...data[key]
          }
        )
      }
      setRecords(loadedRecords);
    })
  }
  

  const handleEdit = (record) => {
    //...
    setFormData({firstname: record.firstname, lastname: record.lastname, city: record.city});
    setIsEditing(true)
    setEditingId(record.id)
 
  }

  const handleDelete = (id) => {
    //...
    fetch(`https://db-infocapture-default-rtdb.asia-southeast1.firebasedatabase.app/user/${id}.json`, {
      method: 'DELETE',
    })
  }

  const handleInputChange = (e) => {
    //...
    const {name, value} = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value}))
  }


  return (
    <>
      <div className="App">


        <div className="form-container">
          <div><h2>InfoCapture</h2></div>

          <form onSubmit={handleSubmit}>

            <input 
            type="text" 
            name="firstname" 
            value={formData.firstname}
            onChange={handleInputChange}
            placeholder='Enter your firstname' 
            required/>

            <input 
            type="text" 
            name="lastname" 
            value={formData.lastname}
            onChange={handleInputChange}
            placeholder='Lastname' 
            required/>

            <input 
            type="text" 
            name="city" 
            value={formData.city}
            onChange={handleInputChange}
            placeholder='City' 
            required/>

            {
              isEditing ? (

              <button className='updateBtn' type="submit">Update Record</button>
              
              ):(

              <button className='addBtn' type="submit">Add Record</button>

              )
            }

          </form>

          
        </div>

        <div className="table-container">
          <h2>DigiPunk World Citizens</h2>
          <h4 className='notification'>A new record has been added</h4>
          <table>
            <thead> 
                <tr>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>City</th>
                  <th>Actions</th>
                </tr>
            </thead>
            <tbody>
              {records.map(record =>(
                <tr key={record.id}>
                  <td>{record.firstname}</td>
                  <td>{record.lastname}</td>
                  <td>{record.city}</td>
                  <td>
                      <i class="fa-solid fa-pen-to-square editBtn myBtn" onClick={() => handleEdit(record)}></i>
                      <i class="fa-solid fa-rectangle-xmark delBtn myBtn" onClick={() => handleDelete(record.id)}></i>
                  </td>
                </tr>
              ))}
                
            </tbody>
          </table>

        </div>
        
        <div className="footer">
          ©  {new Date().getFullYear()} InfoCapture. All rights reserved.
        </div>


      </div>
    </>
  );
}

export default App;
