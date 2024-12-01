import styles from "./knowaboutus.module.css";

const KnowAboutUs = () => {
  return (
    <div className={styles.knowAboutUs}>
      <header>
        <div className={styles.leftContent}>Know more about us!</div>
        <div className={styles.rightContent}>
          <ul>
            <li>Frequent Questions</li>
            <li>Who we are?</li>
            <li>Partner Program</li>
            <li>Help & Support</li>
          </ul>
        </div>
      </header>
      <div className={styles.mainContent}>
        <div className={styles.leftContent}>
          <div className={styles.row1}>How does Order.UK work?</div>
          <ul>
            <li>What payment methods are accepted?</li>
            <li>Can I track my order in real-time?</li>
            <li>
              Are there any special discounts orpromotions available?
            </li>
            <li>Is Order.UK available in my area?</li>
          </ul>
        </div>
        <div className={styles.rightContent}>
          <div className = {styles.row1}>
            <div className = {styles.card}>
              <h1>Place an Order!</h1>
              <img src="/orderfood.png" alt="orderfood" />
              <p>Place order through our website or Mobile app</p>
            </div>
            <div className = {styles.card}>
              <h1>Place an Order!</h1>
              <img src="/orderfood.png" alt="orderfood" />
              <p>Place order through our website or Mobile app</p>
            </div>
            <div className = {styles.card}>
              <h1>Place an Order!</h1>
              <img src="/orderfood.png" alt="orderfood" />
              <p>Place order through our website or Mobile app</p>
            </div>
          </div>
          <span>Order.UK simplifies the food ordering process. Browse through our diverse menu, select your favorite dishes, and proceed to checkout. Your delicious meal will be on its way to your doorstep in no time!</span>
        </div>
      </div>
    </div>
  );
};

export default KnowAboutUs;
