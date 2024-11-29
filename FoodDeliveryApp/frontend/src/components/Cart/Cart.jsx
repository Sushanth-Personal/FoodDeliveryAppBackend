import useCart from "../../customHook/useCart";
import styles from "./cart.module.css";
import { useUserContext } from "../../Contexts/UserContext";
import { useRef } from "react";
import useDragToScroll from "../../customHook/useDragToScroll";
const Cart = () => {
  const { loading, error } = useCart();
  const { cartItems } = useUserContext();
  const { deleteFromCart } = useCart();
  const {
    listRef,
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    handleMouseLeave,
  } = useDragToScroll();
  const cartRef = useRef(null);

  if (loading) return <p>Loading cart data...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleDelete = async (item) => {
    console.log("productid", item);
    deleteFromCart(item);
  };

  return (
    <section ref={cartRef} className={styles.cart}>
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
          <ul
            ref={listRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <li key={item._id}>
                  <div className={styles.quantity}>
                    {item.quantity}x
                  </div>
                  <div className={styles.content}>
                    <p>₹{item.price}</p>
                    <h1>{item.productName}</h1>
                  </div>
                  <img
                    role="button"
                    onClick={() => handleDelete(item)}
                    className={styles.remove}
                    src="/Remove.png"
                    alt="Remove Item"
                  />
                </li>
              ))
            )}
          </ul>
        </div>
        <div className={styles.summary}>
          <div className={styles.costs}>
            <p>Sub Total: </p>
            <p>Discounts:</p>
            <p>Delivery Fee:</p>
          </div>
          <div className={styles.values}>
            <p>₹230.00</p>
            <p>-₹3.00</p>
            <p>₹3.00</p>
          </div>
        </div>
        <div className={styles.totalContainer}>
          <div className={styles.total}>
            <p>Total to pay</p>
            <p className={styles.totalValue}>₹227.00</p>
          </div>
          <div className={styles.button}>
            <p>Choose your free item..</p>
            <img
              id="cart-total-downarrow-1"
              src="/down.png"
              alt="downarrow"
            />
          </div>
          <div className={styles.button}>
            <p>Apply Coupon Code here</p>
            <img
              id="cart-total-rightarrow-1"
              src="/right.png"
              alt="rightarrow"
            />
          </div>
        </div>
        <div className={styles.checkoutContainer}>
          <div className={styles.deliveryContainer}>
            <div className={styles.deliver}>
              <img src="/scooter.png" alt="scooter" />
              <h1>Delivery</h1>
              <p>Starts at 17:50</p>
            </div>
            <div className={styles.collection}>
            <img src="/store.png" alt="store" />
              <h1>Collection</h1>
              <p>Starts at 16:50</p>
            </div>
          </div>
          <button className = {styles.checkout}>
            <img src="/rightcheckout.png" alt="rightarrow" />
            Checkout!
            </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
