import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import { addTodo } from '../actions/todo';
import { changePage } from '../actions/page'
import Logo from './Logo';
import { IaddTodoBody } from '../interfaces';

interface Props {
  addTodo: (body: IaddTodoBody) => Promise<void>;
  changePage: (page: string) => void;
};

const AddTodo = ({addTodo, changePage} : Props) => {

  const convertDate = (unformattedDate : Date) => {
    return unformattedDate.getFullYear() + '-' 
      + (unformattedDate.getMonth() + 1) + '-' 
      + unformattedDate.getDate();
  };

  const [todo, setTodo] = useState('');
  const [dueDate, setDueDate] = useState(convertDate(new Date()));

  const [todoError, setTodoError] = useState(false);
  const [dueDateError, setDueDateError] = useState(false);

  const [anyError, setAnyError] = useState(false);
  
  useEffect(() => {
    if (!todo) {
      setTodoError(true);
    } else {
      setTodoError(false);
    }
  }, [todo]);

  useEffect(() => {
    const re = /^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/;
    if (!re.test(dueDate)) {
      setDueDateError(true)
    } else {
      setDueDateError(false);
    };
  }, [dueDate]);

  useEffect(() => {
    if (!todoError && !dueDateError) {
      setAnyError(false);
    } else {
      setAnyError(true);
    };
  }, [todoError, dueDateError]);

  const handleTodoChange = (e: any) =>{
    const reTodo = e.target.value.replace(/[^a-zA-Z0-9 .,]/, '');
    setTodo(reTodo);
  };
  
  const handleDueDateChange = (date : Date | null) => {
    if (date !== null && !isNaN(date.getTime())) {
      setDueDate(convertDate(date));
    } else {
      setDueDate(convertDate(new Date()));
    };
  };

  const ShowButtons = () => {
    return (
      <div className="form-buttons">
        {!anyError ?
          <button 
            className="green"
            onClick={() => addTodo({todo, dueDate})}
          >
            Add It!
          </button>
          : null  
        }
        <button 
          className="red"
          onClick={() => changePage('home')}
        >
          Cancel
        </button>
      </div>
    );
  };

  const handleSubmitTodo = () => {
    if (anyError) {
      return;
    } else {
      addTodo({todo, dueDate});
    };
  }

  return (
    <>
      <Logo />
      <div className="minusLogo">
        <h1>Add A Todo</h1>
        <div className="form-box">
          <label>Todo:</label>
          <input
            className={todoError ? 'error' : ''}
            value={todo}
            onChange={handleTodoChange}
            onKeyDown={e => e.code === "Enter" ? handleSubmitTodo() : null}
          />
          <label>Due Date:</label>
          <DatePicker
            className='input'
            dateFormat='dd/MM/yyyy'
            onChange={handleDueDateChange}
            selected={new Date(dueDate)}          
          />
          <ShowButtons />
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = {
  addTodo,
  changePage
};

export default connect(null, mapDispatchToProps)(AddTodo);