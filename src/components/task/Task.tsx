import styles from './Task.module.css'
import { Circle, Trash, CheckCircle } from 'phosphor-react'
import { useState } from 'react';

interface TaskProps {

    uid: string,
    content: string,
    onRemoveTask: () => void;
    onStateChange: (checked: boolean, uid: string) => void;
    onSizeCheckTasksChange: () => void;
}

export function Task({ uid, content, onRemoveTask, onStateChange, onSizeCheckTasksChange }: TaskProps) {

    const [checked, setChecked] = useState<boolean>(false);

    function handleUpdateTask() {
        
        setChecked((previousChecked) => {
            const newChecked = !previousChecked;
            onStateChange(newChecked, uid);
            onSizeCheckTasksChange();
            
            return newChecked;
        });
    }

    function handlePressCompleteButton() {
        handleUpdateTask();
    }

    function handlePressDeleteButton() {
        handleUpdateTask();
        onRemoveTask();
    }

    return (
        <>
            <div className={checked === true ? styles.task_wrapper_verified : styles.task_wrapper}>
                <button onClick={handlePressCompleteButton} className={styles.task_complete_button} >
                    <CheckCircle className={styles.task_complete_button_icon} display={checked === true ? "flex" : "none"} size={17.45} />
                    <Circle className={styles.task_complete_button_icon} display={checked === false ? "flex" : "none"} size={17.45} />
                </button >
                <p>{content}</p>
                <button onClick={handlePressDeleteButton} className={styles.task_delete_button}>
                    <Trash className={styles.task_delete_button_icon} size={14} />
                </button>
            </div>
        </>);
}
