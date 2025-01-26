import { Checkbox } from '@/components/ui/checkbox'
import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'

interface TableHeadTodoTYPE {
  checkAll: Function;
  checkAllState: boolean;
  setCheckAllState: Function;
}

const TableHeadTodo = ({checkAll, checkAllState, setCheckAllState }:TableHeadTodoTYPE ) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="min-w-[40px]"><Checkbox checked={checkAllState} onCheckedChange={(e)=> checkAll(e)} className=''></Checkbox></TableHead>
        <TableHead className="min-w-[40px]">#</TableHead>
        <TableHead className='min-w-[200px]'>TEXT</TableHead>
        <TableHead className="text-right min-w-[110px]">Created Date</TableHead>
        <TableHead className="text-right min-w-[110px]">Updated Date</TableHead>
        <TableHead className="text-center min-w-[100px]">Operations</TableHead>
        <TableHead className="text-center min-w-[100px]">Delete</TableHead>
      </TableRow>
    </TableHeader>
  )
}

export default TableHeadTodo