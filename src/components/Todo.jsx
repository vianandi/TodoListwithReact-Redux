import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'react-icons-kit';
import { trash } from 'react-icons-kit/feather/trash';
import { edit2 } from 'react-icons-kit/feather/edit2';
import { removeTodo, handleCheckbox } from '../redux/todo/actions';
import styles from './Checkbox.module.css'

export const Todo = ({ handleEditClick, editFormVisibility }) => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.operationsReducer);
  const [filter, setFilter] = useState('all');
  const [buttonActive, setButtonActive] = useState('');

  const handleFilterChange = (filterValue) => {
    setFilter(filterValue);
    setButtonActive(filterValue);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') {
      return !todo.completed;
    } else if (filter === 'completed') {
      return todo.completed;
    } else {
      return true;
    }
  });


  return (
    <div>
      <div className="filter-buttons">
        <button className={buttonActive === 'all' ? 'filter-button-active' : ''} onClick={() => handleFilterChange('all')}>All</button>
        <button className={buttonActive === 'active' ? 'filter-button-active' : ''} onClick={() => handleFilterChange('active')}>Active</button>
        <button className={buttonActive === 'completed' ? 'filter-button-active' : ''} onClick={() => handleFilterChange('completed')}>Completed</button>
      </div>

      {filteredTodos.map((todo) => (
        <div key={todo.id} className="todo-box">
          <div className="content">
            {editFormVisibility === false && (
              <input
              className={styles.checkbox}
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(handleCheckbox(todo.id))}
              />
            )}
            <p style={todo.completed === true ? { textDecoration: 'line-through' } : { textDecoration: 'none' }}>
              {todo.todo}
            </p>
          </div>
          <div className="actions-box">
            {editFormVisibility === false && (
              <>
                <span onClick={() => handleEditClick(todo)}>
                  <Icon icon={edit2} />
                </span>
                <span onClick={() => dispatch(removeTodo(todo.id))}>
                  <Icon icon={trash} />
                </span>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};