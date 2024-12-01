import styles from "./advertisement.module.css";

const Advertisement = () => {
  return (
    <section className={styles.advertisement}>
      <div className={styles.leftContent}>
        <img
          className={styles.leftBackground}
          src="/leftbackground.png"
          alt="leftbackground"
        />
        <img
          className={styles.gradient}
          src="/gradient.png"
          alt="gradient"
        />
        <div className={styles.caption}>
          Earn more with lower fees
        </div>
        <div className = {styles.content}>
          <h3>Signup as a business</h3>
          <h1>Partner with us</h1>
          <div className={styles.getStarted}>Get Started</div>
        </div>
      </div>
      <div className={styles.rightContent}>
        <img 
        className = {styles.rightBackground}
        src="/rightbackground.png" alt="rightbackground" />
        <img 
        className = {styles.gradient}
        src="/gradient.png" alt="gradient" />
         <div className={styles.caption}>
         Avail exclusive perks
        </div>
        <div className = {styles.content}>
          <h3>Signup as a rider</h3>
          <h1>Ride with us</h1>
          <div className={styles.getStarted}>Get Started</div>
        </div>
      </div>
    </section>
  );
};

export default Advertisement;
