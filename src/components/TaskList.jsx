import React, { useEffect, useState } from 'react'
import Task from './Task';

const TaskList = ({tasks, setTasks, onDelete, updateTaskInState}) => {
  const [selected, setSelected] = useState('Filter')
  const [filteredTasks, setFilteredTasks] = useState(tasks)

  useEffect(()=>{
    if(selected === 'Completed'){
      setFilteredTasks(tasks.filter(task => task.completed))
    }
    else if(selected ==='Incomplete'){
      setFilteredTasks(tasks.filter(task => !task.completed))
    }
    else{
      setFilteredTasks(tasks)
    }
  },[selected, tasks])

  return (
    <>
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" 
        id="dropdownMenu2" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {selected}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
          <button className="dropdown-item" type="button" onClick={()=>setSelected('All')}>All</button>
          <button className="dropdown-item" type="button" onClick={()=>setSelected('Completed')}>Completed</button>
          <button className="dropdown-item" type="button" onClick={()=>setSelected('Incomplete')}>Incomplete</button>
        </div>
      </div>

      <div className="tasks-container">
          {filteredTasks.length>0 ? (filteredTasks.map((task) => 
          (<Task key={task.id} task={task} tasks={tasks} onDelete={onDelete} setTasks={setTasks} updateTaskInState={updateTaskInState}/>))) : (
            <p>No tasks to show</p>
          )}
      </div>
    </>
  )
}

export default TaskList