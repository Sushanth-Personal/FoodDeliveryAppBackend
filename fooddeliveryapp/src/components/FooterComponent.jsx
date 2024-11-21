import styles from "./styles/footer.module.css";

const FooterComponent = () => {
  return (
    <section className={styles.footer}>
      <div className={styles.upperSection}>
        <div className={styles.footerContent}>
          <div className={styles.downloadSection}>
            <img
              className={styles.logo}
              src="./footerLogo.png"
              alt="logo"
            />
            <img
              className={styles.appstore}
              src="./appStore.png"
              alt="appstore image"
            />
            <h4>
              Company # 490039-445, Registered with House of
              companies.
            </h4>
          </div>
          <div className={styles.subscribeSection}>
            <h1>Get Exclusive Deals in your Inbox</h1>
            <div className={styles.emailSubscribe}>
              <input type="email" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
            <h4>
              we wont spam, read our
              <a href="">email policy</a>
            </h4>
            <div className={styles.socialMedia}>
              <img src="./Facebook.png" alt="facebook" />
              <img src="./Instagram.png" alt="instagram" />
              <img src="./TikTok.png" alt="tiktok" />
              <img src="./Snapchat.png" alt="snapchat" />
            </div>
          </div>
          <div className={styles.legalPages}>
            <ul>
              <li>
                <h1>Legal Pages</h1>
              </li>
              <li>
                <a href="">Terms and conditions</a>
              </li>
              <li>
                <a href="">Privacy</a>
              </li>
              <li>
                <a href="">Cookies</a>
              </li>
              <li>
                <a href="">Modern Slavery Statement</a>
              </li>
            </ul>
          </div>
          <div className={styles.importantLinks}>
            <ul>
              <li>
                <h1>Important Links</h1>
              </li>
              <li>
                <a href="">Get help</a>
              </li>
              <li>
                <a href="">Add your restaurant</a>
              </li>
              <li>
                <a href="">Sign up to deliver</a>
              </li>
              <li>
                <a href="">Create a business account</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.copyright}>
        Order.uk Copyright 2024, All Rights Reserved.
        </div>
        <div className={styles.terms}>
        <ul >
          <li>Privacy Policy</li>
          <li>Terms</li>
          <li>Pricing</li>
          <li>Do not sell or share my personal information</li>
        </ul>                        
        </div>
      </div>
    </section>
  );
};

export default FooterComponent;
