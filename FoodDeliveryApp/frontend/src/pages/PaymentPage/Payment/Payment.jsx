import styles from "./payment.module.css";
import OrderPlaced from "./OrderPlaced";
import { useState, useEffect } from "react";
import { useUserContext } from "../../../Contexts/UserContext";

const Payment = () => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { cartTotal} = useUserContext();
  const [selectedCard, setSelectedCard] = useState("");
  const [customCards, setCustomCards] = useState([]);

  // Load cards from sessionStorage
  useEffect(() => {
    const savedCards =
      JSON.parse(sessionStorage.getItem("customCards")) || [];
    setCustomCards(savedCards);
  }, []);

  // Save cards to sessionStorage
  useEffect(() => {
    sessionStorage.setItem(
      "customCards",
      JSON.stringify(customCards)
    );
  }, [customCards]);

  const handleOrderPlaced = () => {
    if(!selectedCard){
      alert("Please select a card");
      return;
    }
    setOrderPlaced(true);
  };

  const handleCardSelection = (cardType) => {
    setSelectedCard(cardType);
  };

  const addNewCard = () => {
    const cardName = prompt("Enter the name of your new card:");
    if (cardName) {
      const newCard = {
        name: cardName,
        icon: cardName[0].toUpperCase(), // Use the first letter as the icon
      };
      setCustomCards([newCard, ...customCards]);
    }
  };
useEffect(() => {
  console.log("orderPlaced", orderPlaced);
}, [orderPlaced]);
  return orderPlaced ? (
    <OrderPlaced />
  ) : (
    <section className={styles.payment}>
      <div className={styles.header}>
        <img
          role="button"
          onClick={() => window.history.back()}
          src="/backarrow.png"
          alt="backarrow"
        />
        <h1>Choose and Pay</h1>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.leftContent}>
          {/* Wallet Section */}
          <div className={styles.borderBox}>
            <div className={styles.wallet}>
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

          {/* Dynamically added cards */}
          {customCards.map((card, index) => (
            <div
              key={index}
              className={styles.cardType}
              onClick={() => handleCardSelection(card.name)}
            >
              <div className={styles.leftCardContent}>
                <div className={styles.iconBackground}>
                  <div className={styles.icon}>{card.icon}</div>
                </div>
                <div className={styles.content}>
                  <h1>{card.name}</h1>
                </div>
              </div>
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={selectedCard === card.name}
                  onChange={() => handleCardSelection(card.name)}
                />
              </div>
            </div>
          ))}

          {/* Maestro Card */}
          <div
            className={styles.cardType}
            onClick={() => handleCardSelection("Maestro")}
          >
            <div className={styles.leftCardContent}>
              <div className={styles.iconBackground}>
                <img src="/Maestro.png" alt="maestro" />
              </div>
              <div className={styles.content}>
                <h1>MaestroCard</h1>
              </div>
            </div>
            <div>
              <input
                type="radio"
                name="paymentMethod"
                checked={selectedCard === "Maestro"}
                onChange={() => handleCardSelection("Maestro")}
              />
            </div>
          </div>

          {/* PayPal Card */}
          <div
            className={styles.cardType}
            onClick={() => handleCardSelection("PayPal")}
          >
            <div className={styles.leftCardContent}>
              <div className={styles.iconBackground}>
                <img src="/Paypal.png" alt="paypal" />
              </div>
              <div className={styles.content}>
                <h1>PayPal</h1>
              </div>
            </div>
            <div>
              <input
                type="radio"
                name="paymentMethod"
                checked={selectedCard === "PayPal"}
                onChange={() => handleCardSelection("PayPal")}
              />
            </div>
          </div>

          {/* Add Debit Card */}
          <div className={styles.cardType} onClick={addNewCard}>
            <div className={styles.leftCardContent}>
              <img src="/addCard.png" alt="addcard" />
              <div className={styles.content}>
                <h1>Add Debit Card</h1>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rightContent}>
          <div className={styles.proceedContainer}>
            <div className={styles.firstRow}>
              <h2>Amount to be paid</h2>
              <p>₹{cartTotal}</p>
            </div>
            <button
              onClick={handleOrderPlaced}
            >
              Proceed Payment
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
