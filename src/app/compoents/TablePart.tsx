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
import { AlertDialogDemo } from '@/components/ui/AleartDialog'
import { Skeleton } from '@/components/ui/skeleton'


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
  const skeleton = [1, 2, 3, 4, 5]
  useEffect(() => {
    if (isAllTodoChecked(Todos)) {
      if (Todos.length > 0) {
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
          {Todos?.length > 0 &&
            Todos?.map((todo: TODOTYPE, index: number) => {
              return (
                <TableRow key={todo?.id}>
                  <TableHead className={`${todo.completed ? 'opacity-50 ' : ''}`}><Checkbox className='' checked={todo.completed ? true : false} onCheckedChange={(e) => completionUpdate(e, todo?.id)}></Checkbox></TableHead>
                  <TableCell className={`${todo.completed ? 'opacity-50 ' : ''} font-medium`}>{index + 1}</TableCell>
                  <TableCell className={`${todo.completed ? 'opacity-50 ' : ''} `}>{todo?.text}</TableCell>
                  <TableCell className={`${todo.completed ? 'opacity-50 ' : ''}  text-right`}>{formatDate(todo?.createdAt)}</TableCell>
                  <TableCell className={`${todo.completed ? 'opacity-50 ' : ''} text-right`}>{formatDate(todo?.updatedAt)}</TableCell>
                  <TableCell onClick={() => todo.completed ? undefined : EditMode(todo?.id)} className={`${todo.completed ? 'cursor-default opacity-50' : "cursor-pointer hover:bg-gray-200"} text-center `}>
                    ✏️
                  </TableCell>
                  <TableCell className={`cursor-pointer hover:bg-gray-200 opacity-100 text-center `}>
                    <AlertDialogDemo deleteTodo={deleteTodo} buttonText='❌' cancelText='Cancel' continueText='Delete' warningMessage='Delete Warning' warningMessageText='The Todo will delete permanenetly from todo application' todoID={todo.id} />
                  </TableCell>
                </TableRow>
              )
            })
          } {
            Todos?.length === 0 && skeleton?.map((item: number, index: number) => {
              return (
                <TableRow key={item}>
                  <TableCell ><Skeleton className="w-[20px] h-[20px] rounded-full" /></TableCell>
                  <TableCell ><Skeleton className="w-[20px] h-[20px] rounded-full" /></TableCell>
                  <TableCell ><Skeleton className="w-[100px] h-[20px] rounded-full" /></TableCell>
                  <TableCell className=''><Skeleton className="w-[150px] h-[20px] rounded-full float-end" /></TableCell>
                  <TableCell className='flaot-right'><Skeleton className="w-[150px] h-[20px] rounded-full float-end" /></TableCell>
                  <TableCell className='pl-[50px]'><Skeleton className="w-[50px] h-[20px] rounded-full " /></TableCell>
                  <TableCell className='pl-[50px]'><Skeleton className="w-[50px] h-[20px] rounded-full " /></TableCell>
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