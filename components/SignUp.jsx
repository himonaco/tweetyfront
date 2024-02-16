import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../reducers/user';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import { Button, Modal, Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';



function SignUp() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.value);

  const [firstname, setFirstname] = useState('');
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSignUp = () => {
    fetch('http://localhost:3000/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstname: firstname, username: signUpUsername, password: signUpPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(signIn({ username: signUpUsername, token: data.token }));
          toast.success('Successfully toasted!');
          router.push('/Home');

          setFirstname('');
          setSignUpUsername('');
          setSignUpPassword('');
        } else {
          toast.error(`You're toasted🔥!, Try again`);
        }
      });
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Button onClick={handleOpen}>SignUp</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <Image src="/tweet.png" alt="tweetlogo" width={60} height={60} />
            <h1>SignUp for your account</h1>
          </div>
          <div>
          <input
              type="text"
              placeholder="Firstname"
              value={firstname}
              onChange={(event) => setFirstname(event.target.value)}
            />
            <br></br>
            <input
              type="text"
              placeholder="Username"
              value={signUpUsername}
              onChange={(event) => setSignUpUsername(event.target.value)}
            />
            <br></br>
            <input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={(event) => setSignUpPassword(event.target.value)}
            />
            <br></br>
            <button onClick={handleSignUp}>Sign Up</button>
          </div>
          <Toaster />
         
        </Box>
      </Modal>
    </div>
  );
}

export default SignUp;
