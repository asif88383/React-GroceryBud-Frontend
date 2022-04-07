import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({show: false, msg: '', type: ''})

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!name){
      // display alert
      showAlert(true, 'Please enter a name', 'danger')
    }else if(name && isEditing){
      // deal with edit
      setList(
        list.map(item => {
          if(item.id === editID){
            return {...item, title: name}
          }
          return item;
        })
      )
      setIsEditing(false)
      setEditID(null)
      setName('')
      showAlert(true, 'Item updated', 'success')
    }else{
      // show alert
      showAlert(true, 'Item updated', 'success')
      const newItem = {id: new Date().getTime().toString(),
      title: name};
      setName('')
      setList([...list, newItem])
    }
  }

  // show alert
  const showAlert = (show=false, msg='', type='') => { // default values
    setAlert({show, msg, type})   // set the state
  }

  // clear list
  const clearList = () => {
    showAlert(true, 'List cleared', 'success')  // show alert
    setList([])  // clear list
  }

  // delete item
  const deleteItem = (id) => {
    showAlert(true, 'Item deleted', 'danger') // show alert
    setList(list.filter(item => item.id !== id)) // filter list
  }

  // edit item
  const editItem = (id) => {
    const specificItem = list.find(item => item.id === id);  // find the item
    setIsEditing(true);       // set isEditing to true
    setEditID(id);            // set editID to the id
    setName(specificItem.title); // set name to the title
  }

  return (
    <section className='section-center'>
      <form  className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <h3>grocery bud</h3>
        <div className='form-control'>
          <input 
            type='text'
            className='grocery'
            placeholder='enter a grocery item'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'update' : 'add'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          <List items = {list} removeItem={deleteItem} editItem={editItem}/>
          <button className='clear-btn' onClick={clearList}>clear items</button>
        </div>
      )}
    </section>
  )
}

export default App
