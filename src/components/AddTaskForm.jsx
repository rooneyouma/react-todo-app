import React, { useState } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import { toast } from 'react-toastify';
  

const AddTaskForm = ({tasks,setTasks, showTaskform, setShowtaskform}) => {

    const handleDateChange = (momentDate) => {
        setDate(momentDate);
    };

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [date, setDate] = useState(null);


    const addTask = async(task) => {
        try {
            const res = await fetch("http://localhost:5000/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(task),
            })

            const data = await res.json()

            setTasks([...tasks, data])
            toast.success("Task Added Successfully!")
        }catch(error){
            console.error("Error adding Task!",error)
            toast.error('Failed to add Task')
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();


        const newTask = {
            title,
            desc,
            date:date.format('DD-MM-YYYY HH:mm'),
            completed: false,
        }

        addTask(newTask)

        setTitle('')
        setDesc('')
        setDate(null)

        setShowtaskform(!showTaskform)



    }



  return (
    <>
        <div className="border border-2 border-light rounded p-4 shadow-sm mx-auto" style={{ maxWidth: '700px' }}>
            <h3 className="text-center mb-4">Add Task</h3>
        <form className="container mt-4" onSubmit={handleSubmit}>
            <div className="mb-3 row">
                <label htmlFor="exampleInputText1" className="col-sm-4 col-form-label">Task Title</label>
                <div className="col-sm-11">
                    <input type="text" className="form-control" 
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    id="exampleInputText1"/>
                </div>
            </div>

            <div className="mb-3 row">
                <label htmlFor="exampleInputText1" className="col-sm-4 col-form-label">Description</label>
                <div className="col-sm-11">
                    <textarea type="text" className="form-control" 
                    value={desc} 
                    onChange={(e)=>setDesc(e.target.value)}
                    id="exampleInputText1"/>
                </div>
            </div>

            <div className="mb-3 row">
                <label htmlFor="js-id-date-end" className="col-sm-4 col-form-label">Due Date</label>
                <div className="col-sm-11">            
                <Datetime
                id="datetimepicker"
                value={date}
                onChange={handleDateChange}
                isValidDate={(current) => {
                    return current.isSameOrAfter(moment(), 'day');
                  }}
                inputProps={{ className: 'form-control' }}
                />
                </div>
            </div>
            <br />

            <button type="submit" className="btn rounded-3 shadow-sm px-4" style={{backgroundColor: '#4863a0'}}>
                Done
            </button>
        </form>
        </div>

    </>
  )
}

export default AddTaskForm