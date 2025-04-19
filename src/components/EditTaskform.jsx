import React, { useEffect, useState } from 'react'
import Datetime from 'react-datetime';
import moment from 'moment';


const EditTaskform = ({task, setShowEdit, setTasks, updateTaskInState}) => {

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [date, setDate] = useState(null)

    const handleDateChange = (momentDate) => {
        setDate(momentDate);
    };

    useEffect(()=>{
        if(task){
            setTitle(task.title)
            setDesc(task.desc)
            setDate(moment(task.date))
        }
    }, [task])

    

    const handleSubmit = async(e) => {
        e.preventDefault()

        const updatedTask = {
            title,
            desc,
            date:date.format('DD-MM-YYYY HH:mm'),
        }

        try{
            const res = await fetch(`http://localhost:5000/tasks/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask)
            });
            
            if (!res.ok){
                throw new Error('Failed to update task')
                
            }

            const data = await res.json()
            updateTaskInState(data)
        }catch(error){
            console.error('Error updating task!',error)
        }



        setShowEdit(false)
    }

  return (
    <>
            <div className="border border-2 border-light rounded p-4 shadow-sm mx-auto" style={{ maxWidth: '700px' }}>
                <h3 className="text-center mb-4">Edit Task</h3>
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
                    <label htmlFor="exampleInputText2" className="col-sm-4 col-form-label">Description</label>
                    <div className="col-sm-11">
                        <textarea type="text" className="form-control" 
                        value={desc} 
                        onChange={(e)=>setDesc(e.target.value)}
                        id="exampleInputText2"/>
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

export default EditTaskform