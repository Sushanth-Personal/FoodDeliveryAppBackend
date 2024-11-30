import styles from "./payment.module.css";
import OrderPlaced from "./OrderPlaced";
import { useState } from "react";
import { useUserContext } from "../../../Contexts/UserContext";
const Payment = () => {
  const [orderPlaced, setOrderPlaced] = useState(false);
const {totalSum} = useUserContext();
  const handleOrderPlaced = () => {
    setOrderPlaced(true);
  };

  return (
    orderPlaced ? (
      <OrderPlaced />
    ) : (
      <section className={styles.payment}>
        <header>
          <img
            role="button"
            onClick={() => window.history.back()}
            src="/backarrow.png"
            alt="backarrow"
          />
          <h1>Choose and Pay</h1>
        </header>
        <div className={styles.mainContent}>
          <div className={styles.leftContent}>
            <div className={styles.cardType}>
              <div className={styles.leftCardContent}>
                <div className={styles.iconBackground}>
                  <img src="/wallet.png" alt="wallet" />
                </div>
                <div className={styles.content}>
                  <h1>Wallet</h1>
                  <p>Available balance: ₹300</p>
                </div>
              </div>
              <div>
                <img src="/rightarrow.png" alt="rightarrow" />
              </div>
            </div>
          </div>
          <div className={styles.rightContent}>
            <div className={styles.proceedContainer}>
              <div className={styles.firstRow}>
                <h2>Amount to be paid</h2>
                <p>₹{totalSum}</p>
              </div>
              <button onClick={handleOrderPlaced}>Proceed Payment</button>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default Payment;
