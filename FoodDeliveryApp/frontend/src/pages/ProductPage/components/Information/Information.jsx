import styles from "./information.module.css";

const Information = () => {
  return (
    <section className={styles.information}>
      <div className={styles.content}>
        <div className={styles.deliveryInformation}>
          <img
            className={styles.tracking}
            src="/tracking.png"
            alt="tracking"
          />
          <img src="/deliveryInfo.png" alt="deliveryinfo" />
        </div>
        <div className={styles.contactInformation}>
          <img src="/idverified.png" alt="idverified" />
          <h1>Contact information</h1>
          <p className={styles.description}>
            If you have allergies or other dietary restrictions,
            please contact the restaurant. The restaurant will provide
            food-specific information upon request.
          </p>
          <p>Phone number</p>
          <p>+934443-43</p>
          <p>Website</p>
          <p>http://mcdonalds.uk/</p>
        </div>
        <div className={styles.operationalInformation}>
          <img 
          className = {styles.clock}
          src="/clock.png" alt="clock" />
          <h1>Operational Times</h1>
          <img src="/operationInfo.png" alt="operationinfo" />
        </div>
      </div>
    </section>
  );
};

export default Information;
