// Imports:
import Signin from "./SignIn";
import Signup from "./SignUp";
import styles from '../styles/Login.module.css'

// Component:
function Login() {
  return (
    <div className={styles.main}>
      
        <div className={styles.elon} >
         
        </div>
        <div className={styles.rightpart}>
          <div className={styles.tweet}></div>
          <div className={styles.party}>
            <h1>See what's happening</h1>
            
            <h2>Join Hackatweet today.</h2>
            
            <button className={styles.button}>
              <Signup />
              </button>
              <p>Already have an account ?</p>
              <button className={styles.button}>

              <Signin />
              </button>
            
          </div>
        </div>
      
    </div>
  );
}

export default Login;