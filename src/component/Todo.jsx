import { useEffect, useRef, useState } from 'react'
import TodoItems from '../TodoItems'
import todo_icon from '../assets/todo_icon.png'
const Todo = () => {
  const [items, setItems] = useState(localStorage.getItem('todos')? JSON.parse(localStorage.getItem('todos')) : [])
  const inputRef = useRef();

  function toggle(id){
    setItems((prevTodos)=>{
      return prevTodos.map((todo)=>{
        if(todo.id === id){
          return {
            ...todo,
            isComplete: !todo.isComplete
          }
        }
        return todo
      })
    })
  }
  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(items))
  },[items])

  function add(){
    const inputText = inputRef.current.value.trim();
    if(inputText === ""){
      return null
    }
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false
    }
    setItems((prev)=>[...prev, newTodo])
    inputRef.current.value = ""
  }

  function deleteTodo(id){
    setItems((prev)=>{
      return prev.filter((todo)=> todo.id !== id)
    })
  }

  return (
    <div className="bg-white  place-self-center w-11/12 max-w-md max-h-max flex flex-col p-7 min-h-[550px] rounded-xl shadow-lg">
      
      <div className="flex items-center mt-7 gap-2">
        <img src={todo_icon} alt="" className='w-8' />
        <h1 className="font-semibold text-3xl">To-Do List</h1>
      </div> 

      <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input required
        ref={inputRef} 
        className='bg-transparent flex flex-1 h-14 pl-6 pr-2 border-0 outline-none placeholder:text-slate-600' type="text" placeholder='Add your task' />
        <button onClick={add}
        className='bg-orange-600/80 rounded-full w-32 h-14 border-none text-white text-lg font-medium cursor-pointer'>Add</button>
      </div>

      <div>
        {items.map((item, index)=>{
          return (
            <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}/>
          )
        }
         )}
      </div>
      <footer className='place-self-center' >
        <h2 className=' text-sm text-slate-400/30 font-sans '>@Kartik Malviya</h2>
      </footer>
    </div>
  ) 
}

export default Todo