import React, { useEffect, useState } from 'react'
import { TODOTYPE } from '../types/types'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import TableHeadTodo from './TableHeadTodo'
import { Checkbox } from '@/components/ui/checkbox'
import { formatDate } from '@/lib/utils'
import { toast } from 'sonner'


interface TablePartType {
  Todos: TODOTYPE[];
  setInputValue: (value: string) => void;
  completionUpdate: (e: string | boolean, id: string) => void;
  setTodos: Function;
  setEditID: Function;
  checkAllState: boolean;
  setCheckAllState: Function;
}

const isAllTodoChecked = (todos: TODOTYPE[]): boolean => {
  return todos.filter((todo: TODOTYPE) => todo.completed === false)?.length === 0
}

const TablePart = ({ Todos, setInputValue, completionUpdate, setTodos, setEditID, checkAllState, setCheckAllState }: TablePartType) => {
  useEffect(() => {
    if (isAllTodoChecked(Todos)) {
      if(Todos.length > 0) {
        setCheckAllState(true);
      } else {
        setCheckAllState(false);
      }
    }
  }, [Todos.map((todo) => todo.completed).join(",")])

  const EditMode = (id: string) => {
    if (id) {
      let tempTodo = [...Todos]
      tempTodo.map((todo: TODOTYPE) => {
        if (todo?.id === id) {
          setInputValue(todo.text)
          setEditID(todo.id)
          return todo
        }
      })
      setTodos(tempTodo)

    }
  }

  const deleteTodo = (id: string) => {
    if (id) {
      let tempTodo = [...Todos]
      const res = tempTodo.filter((todo: TODOTYPE) => {
        return todo.id !== id
      })
      setTodos(res)
      localStorage.setItem('todos', JSON.stringify(res))
      toast('Todo deleted successfully!')
    }
  }

  const checkAll = (e: string | boolean) => {
    if (typeof e === 'boolean') {
      setCheckAllState(e)
      const temp: TODOTYPE[] = [...Todos]
      temp.map((todo: TODOTYPE) => {
        todo.completed = e
        return todo
      })
      setTodos(temp)
      localStorage.setItem('todos', JSON.stringify(temp))
    }
  }


  return (
    <div className='my-3'>
      <Table>
        <TableCaption>Your TODOs</TableCaption>
        <TableHeadTodo checkAll={checkAll} checkAllState={checkAllState} setCheckAllState={setCheckAllState} />
        <TableBody>
          {
            Todos?.map((todo: TODOTYPE, index: number) => {
              return (
                <TableRow key={todo?.id} className={`${todo.completed ? 'opacity-50 ' : ''}`}>
                  <TableHead className="w-[100px]"><Checkbox className='' checked={todo.completed ? true : false} onCheckedChange={(e) => completionUpdate(e, todo?.id)}></Checkbox></TableHead>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{todo?.text}</TableCell>
                  <TableCell className="text-right">{formatDate(todo?.createdAt)}</TableCell>
                  <TableCell className="text-right">{formatDate(todo?.updatedAt)}</TableCell>
                  <TableCell onClick={() => todo.completed ? undefined : EditMode(todo?.id)} className={`${todo.completed ? 'cursor-default' : "cursor-pointer hover:bg-gray-200"} text-center `}>
                    ✏️
                  </TableCell>
                  <TableCell onClick={() => todo.completed ? undefined : deleteTodo(todo.id)} className={`${todo.completed ? 'cursor-default' : "cursor-pointer hover:bg-gray-200"} text-center `}>
                    ❌
                  </TableCell>
                </TableRow>
              )
            })
          }

        </TableBody>
      </Table>

    </div>
  )
}

export default TablePart