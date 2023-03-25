import styles from './Body.module.css'
import { PlusCircle, ClipboardText } from 'phosphor-react'
import { Task } from '../task/Task';
import { EmptyTask } from '../empty_task/EmptyTask';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Task {
    uid: string,
    content: string,
    checked: boolean,
}

export function Body() {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [text, setText] = useState<string>("");
    const [checkedTasksSize, setCheckedTasksSize] = useState<number>(0);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const formText = event.target.value;
        setText(formText);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const uuid = uuidv4();
        const newTask: Task = { uid: uuid, content: text, checked: false }
        handleAddTask(newTask);
        setText("");
    }

    function handleAddTask(newTask: Task) {
        setTasks([...tasks, newTask]);
    }

    function handleRemoveTask(currentTask: Task) {
        setTasks(tasks.filter(task => task.uid !== currentTask.uid));
    }

    function handleCheckedTasksSize() {
        const newTasks = [...tasks].filter((task) => task.checked === true);
        setCheckedTasksSize(newTasks.length);
        console.log("newTasks")
        console.log(newTasks)
        console.log("tasks")
        console.log(tasks)
    }

    function handleTaskStateChange(newChecked: boolean, currentUid: string) {
        const newTasks = [...tasks];
        const index = newTasks.findIndex((task) => task.uid === currentUid);
        newTasks[index].checked = newChecked;
        setTasks(newTasks);
    }

    return (
        <>
            <div className={styles.body_wrapper}>
                <form onSubmit={handleSubmit} className={styles.add_task_wrapper}>
                    <input type="text"
                        value={text}
                        onChange={handleChange}
                        className={styles.add_task_input}
                        placeholder="Adicione uma nova tarefa"
                        required />
                    <button type="submit" className={styles.add_task_button}>
                        Criar
                        <PlusCircle className={styles.add_task_button_icon} size='15.97' />
                    </button>
                </form>
                <div className={styles.tasks_info_wrapper}>
                    <p className={styles.tasks_created_text}>
                        Tarefas Criadas
                        <span className={styles.tasks_counter}>{tasks.length}</span>
                    </p>
                    <p className={styles.tasks_success_text}>
                        Concluídas
                        <span className={checkedTasksSize > 0  ? styles.tasks_counter_checked : styles.tasks_counter}>{
                            checkedTasksSize > 0 && tasks.length > 0 ? `${checkedTasksSize} de ${tasks.length}` : 0
                        }</span>
                    </p>
                </div>
                <div className={styles.task_wrapper}>
                    {tasks.length === 0 ? (<EmptyTask />) : tasks.map(task => <Task key={task.uid}
                        uid={task.uid}
                        content={task.content}
                        onRemoveTask={() => handleRemoveTask(task)}
                        onStateChange={handleTaskStateChange}
                        onSizeCheckTasksChange={handleCheckedTasksSize} />)}
                </div>
            </div>
        </>
    );
}