import styles from './Navbar.module.css';


function Navbar() {

  return (
   <nav className={styles.nav}>
    <header className={styles.LogoContainer}>
      <h1 className={styles.Logo}>Dish Planner</h1>
    </header>
    <ul className={styles.NavButtons}>
      <li>Planner</li>
      <li>Export</li>
      <li>Filter</li>
    </ul>
   </nav> 
  )
}


export default Navbar;