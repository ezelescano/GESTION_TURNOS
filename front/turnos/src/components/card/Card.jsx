import styles from "./Card.module.css";

const Card = () => {
  return (
    <section className={styles.container}>
      <div className={styles.divh1}>
        <h1>Detalle del Usuario</h1>
      </div>
      <div className={styles.contentData}>
        <div>
          <img src="public\undraw_male-avatar_zkzx.svg" alt="" />
        </div>
        <div className={styles.labels}>
          <label htmlFor="">Nombre y Apellido: </label>
          <label htmlFor="">Email: </label>
          <label htmlFor="">Documento Unico: </label>
        </div>
      </div>
    </section>
  );
};

export default Card;
