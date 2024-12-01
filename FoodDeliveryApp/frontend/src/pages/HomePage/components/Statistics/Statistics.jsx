import styles from "./statistics.module.css";

const Statistics = () => {
  return (
    <section className={styles.statistics}>
      <div className={styles.col}>
        <h1>546+</h1>
        <p>Registered Riders</p>
      </div>
      <div className = {styles.col}>
        <h1>789,900+
        </h1>
        <p>Orders Delivered</p>
      </div>
      <div className = {styles.col}>
        <h1>690+
        </h1>
        <p>Restaurants Partnered</p>
      </div>
      <div className = {styles.col}>
        <h1>17,457+
        </h1>
        <p>Food items</p>
      </div>
    </section>
  );
};

export default Statistics;
