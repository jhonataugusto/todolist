import styles from './EmptyTask.module.css'
import { ClipboardText } from 'phosphor-react';

export function EmptyTask() {

    return (

        <>

            <div className={styles.empty_task_wrapper}>

                <div className={styles.empty_task}>

                    <ClipboardText className={styles.empty_task_clipboard_icon} size={56} />

                    <p><strong>Você ainda não tem tarefas cadastradas</strong></p>

                    <p>Crie tarefas e organize seus itens a fazer</p>
                </div>
            </div>
        </>
    );
}