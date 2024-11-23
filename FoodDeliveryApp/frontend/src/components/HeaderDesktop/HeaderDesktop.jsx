import styles from "./headerdesktop.module.css";
const HeaderDesktop = () => {
  return (
    <div className={styles.header}>
      <div className={styles.promo}>
        <p>🌟</p>
        Get 5% Off your first order,
        <a href=""> Promo: ORDER5</a>
      </div>

      <div className={styles.location}>
        <img
          src="/Location.png"
          alt="location"
          id="headerdesktop-location-location-1"
        />
        <h3>Regent Street, <span>A4</span>, A4201, London</h3>
        <a>Change Location</a>
      </div>
      <div className={styles.cart}>
        <button>
          <div className={styles.leftSide}>
            <img
              src="/cartIcon.png"
              alt="cart"
              id="headerdesktop-cart-cart-1"
            />
            <h3>My Cart</h3>
          </div>
          
          <div className={styles.rightSide}>

            <div></div>
            <div className = {styles.forwardButton}>
              <img
              src="./Forward Button.png"
              alt="forwardButton"
              id="headerdesktop-cartForwardButton-forwardButton-1"
            />
            </div>
            
          </div>
        </button>
      </div>
    </div>
  );
};

export default HeaderDesktop;
