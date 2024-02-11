
import './App.css';

function App() {

  const handleSubmit = () => {
    //...
  }




  return (
    <>
      <div className="App">


        <div className="form-container">
          <div><h2>InfoCapture</h2></div>
          <form onSubmit={handleSubmit}>
            <input type="text" name="firstname" placeholder='Enter your firstname' required/>
            <input type="text" name="lastname" placeholder='Lastname' required/>
            <input type="text" name="city" placeholder='City' required/>
            <button className='addBtn'>Add Record</button>
            <button className='updateBtn'>Update Record</button>

          </form>
        </div>

        <div className="table-container">
          <h2>DigiPunk World Citizens</h2>
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
                <tr>
                  <td>Jerome</td>
                  <td>Morales</td>
                  <td>Davao</td>
                  <td>
                      <i class="fa-solid fa-pen-to-square editBtn myBtn"></i>
                      <i class="fa-solid fa-rectangle-xmark delBtn myBtn"></i>
                  </td>
                </tr>
                <tr>
                  <td>Mark</td>
                  <td>Anderson</td>
                  <td>New York</td>
                  <td>
                      <i class="fa-solid fa-pen-to-square editBtn myBtn"></i>
                      <i class="fa-solid fa-rectangle-xmark delBtn myBtn"></i>
                  </td>
                </tr>
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
