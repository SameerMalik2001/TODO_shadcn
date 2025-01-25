'use client'

import { useEffect, useState } from "react";
import InputBox from "./compoents/InputBox";
import { TODOTYPE } from "./types/types";
import TablePart from "./compoents/TablePart";



export default function Home() {
  const [Todos, setTodos] = useState<TODOTYPE[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [editID, setEditID] = useState<string>('')
  const [checkAllState, setCheckAllState] = useState<boolean>(false)

  useEffect(()=> {
    if(typeof window !== 'undefined') {
      const tempTodos = JSON.parse(localStorage.getItem('todos') || '[]')
      setTodos(tempTodos)
    }
  }, [])

  const completionUpdate = (e: string | boolean, id: string) => {
    if(typeof e === 'boolean' && id) {
      let tempTodo = [...Todos]
     
        setCheckAllState(false)

      tempTodo.map((todo: TODOTYPE)=> {
        if(todo?.id === id) {
          todo.completed = e
          return todo
        }
      })
      setTodos(tempTodo)
      localStorage.setItem('todos', JSON.stringify(tempTodo))
    }
  }

  console.log(Todos);
	return <div className='bg-white min-h-screen w-screen p-10 text-black'>
    <h1 className="font-[500] text-[28px]">TODO APPLICATION</h1>

    <InputBox setCheckAllState={setCheckAllState} editID={editID} setEditID={setEditID} setTodos={setTodos} Todos={Todos} setInputValue={setInputValue} inputValue={inputValue}/>

    <TablePart Todos={Todos} setTodos={setTodos} checkAllState={checkAllState} setCheckAllState={setCheckAllState} setEditID={setEditID} setInputValue={setInputValue} completionUpdate={completionUpdate}/>
  </div>;
}
