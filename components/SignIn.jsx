import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from '../reducers/user';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import Modal from '@mui/material/Modal'; // Add this import
import Box from '@mui/material/Box'; // Add this import
import Typography from '@mui/material/Typography'; // Add this import
import Button from '@mui/material/Button'; // Add this import

function SignIn() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const dispatch = useDispatch();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (!username || !password) {
      toast.error(`You're toasted🔥! Try again`);
      return;
    }

    fetch('http://localhost:3000/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(signIn({ username: username, token: data.token }));
          toast.success(`FUCK YEAH, WE'RE IN! 🔥`);
          router.push('/Home');
        } else {
            toast.error('💩💩💩💩, TRY AGAIN!!!');

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
      <Button onClick={showModal}>SignIn</Button>
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <Image src="/tweet.png" alt="Upside Down Twitter Logo" width={60} height={60} />
            <h1>Login to your account</h1>
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div>
              <input
                type="text"
                placeholder="Username"
                onInput={(input) => setUsername(input.target.value)}
              />
                          <br></br>

              <input
                type="password"
                placeholder="Password"
                onInput={(input) => setPassword(input.target.value)}
              />
                          <br></br>

              <button onClick={() => handleSignIn()}>Sign In</button>
              <Toaster />
            </div>
          </Typography>
         
        </Box>
      </Modal>
    </div>
  );
}

export default SignIn;
