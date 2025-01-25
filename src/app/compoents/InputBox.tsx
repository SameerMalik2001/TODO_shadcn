import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react'
import { TODOTYPE } from '../types/types';
import { toast } from 'sonner';

interface InputType {
  Todos: TODOTYPE[];
  setTodos: Function;
  inputValue: string;
  setInputValue: Function;
  editID: string;
  setEditID: Function;
  setCheckAllState: Function;
}

const InputBox = ({setTodos, Todos, inputValue, setInputValue, editID, setEditID, setCheckAllState}: InputType) => {
  
  const [error, setError] = useState<string>('')

  const onChangeText = (value: string) => {
    if(value?.length > 0) {
      setError('')
    } else {
      setError('Please enter a todo.')
      toast('Please enter a todo text!')
    }
    setInputValue(value)
  }

  const onkeydown = (e: React.KeyboardEvent) => {
    if(e.key === 'Enter') {
      addTodo()
    }
  }
  
  const addTodo = () => {
    if(inputValue?.length === 0) {
      toast('Please enter a todo text!')
      setError('Please enter a todo.')
      return
    }

    if(editID?.length === 0) {
      const newTodo: TODOTYPE = {
        id: Math.random().toString(36).substring(2, 9),
        text: inputValue,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        isEditing: false
      }
  
      setTodos([...Todos, newTodo])
      localStorage.setItem('todos', JSON.stringify([...Todos, newTodo]))
      toast('Todo is added successfully!')
    } else {
      const updatedTodos = Todos.map(todo => {
        if(todo.id === editID) {
          return {...todo, text: inputValue, isEditing: false, updatedAt: new Date()}
        }
        return todo
      })
      setTodos(updatedTodos)
      localStorage.setItem('todos', JSON.stringify(updatedTodos))
      toast('Todo is updated successfully!')
      setEditID('')
    }
    
    setCheckAllState(false)
    setInputValue('')
    setError('')
  }

  console.log(inputValue);

  return (
    <div className='flex gap-3'>
      <Input onKeyDown={(e)=> onkeydown(e)} className={`${error ? 'border-[3px] border-red-700' : ''} bg-[#1a0840] text-white`} type='text' value={inputValue} onChange={(e)=>onChangeText(e.target.value)} placeholder='Enter your todo...' ></Input>
      <Button onClick={addTodo} className='bg-[#1a0840] text-white' >{editID?.length === 0 ? "ADD" : "Save"}</Button>
    </div>
  )
}

export default InputBox