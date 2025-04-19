import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddTaskForm from './components/AddTaskForm'
import Button from './components/Button'
import TaskList from './components/TaskList'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import applogo from './assets/app-logo.png'


function App() {
  const [tasks, setTasks] = useState([])
  const [showTaskform, setShowtaskform] = useState(false)

  useEffect(()=>{
    
    const fetchTasks = async () => {
      try{
        const res = await fetch("http://localhost:5000/tasks")
        const data = await res.json()
        setTasks(data)
        console.log(data);
      }
      catch(error){console.error("Error fetching data",error)}
    }

    fetchTasks()
  },[])

  const updateTaskInState = (updatedTask) => {
    setTasks((prevTasks) =>
        prevTasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
        )
    );
};

  const handleShowTaskForm = () => {
    setShowtaskform(!showTaskform)
  }

  const handledeleteTask = async(id) => {
    
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'DELETE'
    });

    setTasks(prevTask => prevTask.filter(task => task.id !== id))
  }


  return (
    <>
      <div className="logo">
        <img src={applogo} alt="React Logo" style={{width: '70px'}}/>
      </div>
      <br />
      <h3>ToDo App</h3>
      <br />
      
        
      <Button text={showTaskform ?  "Close" : "New Task"} 
      color={showTaskform ? "#bc544b" : "#4863a0"} onClick={()=>handleShowTaskForm()}/>

      <br />
      <br />
      {showTaskform && <AddTaskForm tasks={tasks} setTasks={setTasks} 
      showTaskform={showTaskform} setShowtaskform={setShowtaskform} />}
      <br />
      {!showTaskform && (tasks.length > 0 ? (<TaskList tasks={tasks} 
      onDelete={handledeleteTask} setTasks={setTasks} updateTaskInState={updateTaskInState}/>) : (<p>No Tasks to show</p>))}

      <ToastContainer position="top-center" autoClose={3000}/>
      
    </>
  )
}

export default App
