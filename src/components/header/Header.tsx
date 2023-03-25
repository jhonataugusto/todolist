import styles from './Header.module.css'

import todo_logo from "../../assets/todo_logo.svg"

export function Header() {

    return (

        <>

            <header className={styles.test}>

                <img src={todo_logo} alt="logo da todo list" />
            </header>
        </>
    );
}