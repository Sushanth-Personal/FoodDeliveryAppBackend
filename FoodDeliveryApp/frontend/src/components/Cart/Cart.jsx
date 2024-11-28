import {useEffect} from "react";
import useCart from "../../customHook/useCart";
import styles from "./cart.module.css";
import {useUserContext} from "../../Contexts/UserContext";
const Cart = () => {
  const { cartData, loading, error } = useCart();
  const {cartItems} = useUserContext();
 

  if (loading) return <p>Loading cart data...</p>;
  if (error) return <p>Error: {error}</p>;



  return (
    <section className={styles.cart}>
      <div className={styles.copyLink}>
        <img src="/share.png" alt="Share Cart" />
        <p>Share this cart with your friends</p>
        <button>Copy link</button>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.header}>
          <img src="/basket.png" alt="Basket Icon" />
          <p>My Basket</p>
        </div>
        <div className={styles.cartItems}>
          <ul>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <li key={item._id}>
                  <div className={styles.quantity}>{item.quantity}x</div>
                  <div className={styles.content}>
                    <p>₹{item.price}</p>
                    <h1>{item.productName}</h1>
                  </div>
                  <img
                    className={styles.remove}
                    src="/Remove.png"
                    alt="Remove Item"
                  />
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Cart;
