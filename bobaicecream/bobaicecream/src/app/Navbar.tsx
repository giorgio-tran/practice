import styles from './page.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <a href="/">
        BOBA &times; ICE CREAM
      </a>
      <a href="#">
        OUR STORY
      </a>
    </nav>
  )
}

export default Navbar;
