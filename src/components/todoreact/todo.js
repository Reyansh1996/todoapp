import React , { useState , useEffect } from 'react';
import "./style.css";



const getlocalData= ()=>{
  const list= localStorage.getItem("todolist");
  if(list){
    return JSON.parse(list);
  }
  else{
      return [];
    }
  
}
const Todo = () => {

  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getlocalData());
  const [iseditItem , seteditItem] = useState("");
  const [togglebutton , settogglebutton] = useState(false);
  const addItem = () =>{
    if ( !inputData ) {
      alert('Please add something');
    } else if(inputData && togglebutton){
      setItems(items.map(( curElm) => {
        if(curElm.id === iseditItem){
              return {...curElm , name: inputData};
        }
        return curElm;
      })
      );
      setInputData([]);
      seteditItem(null);
      settogglebutton(false);
    }
    
    else{
      const myNewData={
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items , myNewData]);
      setInputData("");
    }
  };

  const edititem= (index) =>{
      const edit_items= items.find((curElm) =>{
        return curElm.id === index
      });
      setInputData(edit_items.name);
      seteditItem(index);
      settogglebutton(true);
  };
  const deleteItem= (index) =>{
    const updatedItem = items.filter((curElm) => {
      return curElm.id !== index;
    });
    setItems(updatedItem);
  };

  const removeall = () =>{
    setItems([]);
  };
      
   useEffect(() =>{
     localStorage.setItem("todolist" , JSON.stringify(items));
   } , [items]);

  return (
    
     <>
   <div className='main-div'>

     <div className='child-div'>
       <figure>
         <img src="./images/todo.svg" alt="Todopictures" />
         <figcaption>Add Your List Here</figcaption>
       </figure>
       <div className='addItems'>
         <input type="text"
         placeholder='😊 Add Item'
         className='form-control'
        value={inputData}
         onChange={(event) => setInputData(event.target.value)}
         />
         
         {togglebutton ? (<i className="far fa-edit add-btn" onClick={addItem}></i>) : 
         (<i className="fa fa-plus add-btn" onClick={addItem}></i>)}
         
       </div>

       <div className='showItems'>
         {items.map((curElm, index) => {
           return(
            <div className='eachItem'>
            <h3>{curElm.name}</h3>
            <div className='todo-btn'>
            <i className="far fa-edit add-btn" onClick={() => edititem(curElm.id)}></i>
            <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(curElm.id)}></i>
 
            </div>
            </div>
           );

         })}
        
         
       </div>
       <div className='showItems'>
         <button className='btn effect04' data-sm-link-text="Remove All"
         onClick={removeall}
         ><span> CHECK</span></button>
       </div>
     </div>
   </div>
  
   </>
  )
}

export default Todo;
