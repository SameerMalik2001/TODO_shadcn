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
        <TableHead className="w-[100px]"><Checkbox checked={checkAllState} onCheckedChange={(e)=> checkAll(e)} className=''></Checkbox></TableHead>
        <TableHead className="w-[100px]">#</TableHead>
        <TableHead>TEXT</TableHead>
        <TableHead className="text-right">Created Date</TableHead>
        <TableHead className="text-right">Updated Date</TableHead>
        <TableHead className="text-center">Operations</TableHead>
        <TableHead className="text-center">Delete</TableHead>
      </TableRow>
    </TableHeader>
  )
}

export default TableHeadTodo