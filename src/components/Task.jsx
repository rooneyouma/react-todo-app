import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import EditTaskform from "./EditTaskform";

const Task = ({onClick,task,setTasks, onDelete, updateTaskInState}) => {

    const [showedit, setShowEdit] = useState(false)

    const toggleEdit =()=>{
        setShowEdit(!showedit)
    }

    const handleChange = (id) =>{
        setTasks((prevTasks)=>(prevTasks.map((task)=>(task.id === id ? {...task, completed: !task.completed} : task))))
    }


  return (
    <>
        <div className="tasks-container">
            <div className='task-wrapper border border-2 border-light rounded p-4 shadow-sm mx-auto' key={task.id}>

                <h3>{task.title}</h3>
                <p style={{ textDecoration: task.completed ? 'line-through' : 'none' }} >{task.desc}</p>
                <p style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.date}</p>

                <div className="task-check-wrapper">
                    <div className="task-actions">
                        <button className='btn' onClick={toggleEdit}>
                            <FiEdit />
                        </button>
                        <button className='btn'>
                            <FaTrash style={{ color: "#bc544b" }} onClick={()=> onDelete(task.id)}/>
                        </button>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" 
                        checked={task.completed} 
                        onChange={()=>handleChange(task.id)} 
                        id="flexCheckDefault"/>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Complete
                        </label>
                    </div>
                    
                </div>
                <br />
                {showedit && <EditTaskform showedit={showedit} setShowEdit={setShowEdit} task={task} setTasks={setTasks} updateTaskInState={updateTaskInState}/>}
            </div>
        </div>
      </>
    
  )
}

export default Task