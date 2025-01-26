import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface ALEARTDIALOGTYPE {
  buttonText: string;
  warningMessage: string;
  warningMessageText: string;
  cancelText: string;
  continueText: string;
  deleteTodo: Function;
  todoID: string;
}

export function AlertDialogDemo({buttonText, warningMessage, warningMessageText, cancelText, continueText, deleteTodo, todoID}: ALEARTDIALOGTYPE) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="hover:bg-gray-200" variant="ghost">{buttonText}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{warningMessage}</AlertDialogTitle>
          <AlertDialogDescription>
            {warningMessageText}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteTodo(todoID)}>{continueText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
