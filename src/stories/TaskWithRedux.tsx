import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {ChangeEvent, memo, useCallback} from "react";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import {EditableSpan} from "../EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TaskType} from "../Todolist";

export type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const TaskWithRedux = memo(({task, todolistId}:TaskPropsType ) => {

    const dispatch = useDispatch()

    const removeTask = () => {
        const action = removeTaskAC(task.id, todolistId);
        dispatch(action)
    }

    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const action = changeTaskStatusAC(task.id, e.currentTarget.checked, todolistId);
        dispatch(action)
    }

    const changeTaskTitle = useCallback((newTitle: string) => {
        const action = changeTaskTitleAC(task.id, newTitle, todolistId);
        dispatch(action);
    }, [dispatch, task.id, todolistId])

    return <div className={task.isDone ? 'is-done' : ''}>
        <Checkbox
            checked={task.isDone}
            color={'primary'}
            onChange={changeStatus}

        />
        <EditableSpan value={task.title} onChange={changeTaskTitle}/>
        <IconButton onClick={removeTask}>
            <Delete/>
    </IconButton>
</div>
})