import styles from "./NavBar.module.css";
const NavBar = () => {
  return (
    <nav >
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src="public\undraw_calendar_8r6s.svg" alt="" className={styles.imglogo} />
        </div>
        <div className={styles.spanStile}>
        <span className={styles.mi_span}>Mis Turnos</span>
        <span className={styles.mi_span}>Agendar Turno</span>
        <span className={styles.mi_span}>Sobre Nosotros</span>
        </div>
        <div className={styles.labelImgStilo}>
            <label htmlFor="">Juan Carlos Perez</label>
          <img src="public\undraw_male-avatar_zkzx.svg" alt="" className={styles.avatar} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
