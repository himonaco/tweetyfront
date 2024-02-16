// Imports:
import Signin from "./SignIn";
import Signup from "./SignUp";

// Component:
function Login() {
  return (
    <div>
      <main>
        <div>
          <img
            src="/twitter-white.png"
            alt="White large Twitter logo"
            
          />
        </div>
        <div>
          <div>
            <img
              src="/twitter-white.png"
              alt="White Twitter logo"
              
            />
          </div>
          <div>
            <h1>See what's happening</h1>
            <br />
            <h2>Join Hackatweet today.</h2>
            <div>
              <Signup />
              <p>Already have an account ?</p>
              <Signin />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;