import type {Meta, StoryObj} from '@storybook/react';
import React, {ChangeEvent, useCallback} from "react";
import {ReduxStoreProviderDecorator} from "../state/reduxStoreProviderDecorator";
import {TaskWithRedux} from "./TaskWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {TaskType} from "../Todolist";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import {EditableSpan} from "../EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {action} from "@storybook/addon-actions";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TaskWithRedux> = {
    title: 'TODOLISTS/TaskWithRedux',
    component: TaskWithRedux,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof TaskWithRedux>;

const InitialTask = () => {
    let task = useSelector<AppRootStateType, TaskType> ( state => state.tasks['todolistId1'][0])
    let todolistId = 'todolistId1'

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
        <IconButton onClick={action('removeTask')}>
            <Delete/>
        </IconButton>
    </div>
}

export const TaskWithReduxStory: Story = {
    render: () => <InitialTask />
};

