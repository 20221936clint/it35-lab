import { 
  IonAlert,
  IonAvatar,
  IonButton,
  IonContent, 
  IonInput, 
  IonInputPasswordToggle,  
  IonPage,  
  IonToast,  
  useIonRouter
} from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import ReCAPTCHA from 'react-google-recaptcha';

const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => {
  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={onClose}
      header="Notification"
      message={message}
      buttons={['OK']}
    />
  );
};

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Ref for ReCAPTCHA component
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      ion-content {
        --background: transparent;
        background-image: url('https://www.icegif.com/wp-content/uploads/2023/10/icegif-441.gif');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }

      .login-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.65);
        padding: 30px;
        border-radius: 20px;
        backdrop-filter: blur(6px);
        box-shadow: 0 0 20px aqua;
        max-width: 90%;
        margin: 25% auto 0 auto;
      }

      .login-avatar {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        overflow: hidden;
        border: 5px solid aqua;
        box-shadow: 0 0 12px aqua;
        margin-bottom: 20px;
      }

      .login-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }

      .login-header {
        font-size: 28px;
        font-weight: bold;
        color: white;
        text-shadow: 0 0 8px aqua;
        text-align: center;
        margin-bottom: 20px;
      }

      .login-password-input {
        margin-top: 10px;
      }

      ion-input {
        width: 100%;
        --background: #111;
        --color: white;
        --placeholder-color: #aaa;
        --highlight-color-focused: aqua;
        --border-color: aqua;
        --padding-start: 16px;
        --padding-end: 16px;
        margin-bottom: 10px;
        border-radius: 10px;
      }

      .login-input {
        --color: aqua;
        --placeholder-color: rgba(0, 255, 255, 0.5);
        --highlight-color-focused: aqua;
        --border-color: aqua;
        color: aqua;
        margin-bottom: 16px;
        font-size: 16px;
        --padding-start: 12px;
        --padding-end: 12px;
        --padding-top: 14px;
        --padding-bottom: 14px;
        transition: all 0.3s ease;
        border-radius: 12px;
        box-shadow: 0 0 10px rgba(0, 255, 255, 0.2);
      }

      .login-input:hover {
        box-shadow: 0 0 20px rgba(0, 255, 255, 0.6);
        transform: scale(1.02);
        border-color: cyan;
      }

      .login-input:focus-within {
        box-shadow: 0 0 25px rgba(0, 255, 255, 0.8);
        border-color: deepskyblue;
      }

      .register-text {
        margin-top: 20px;
        text-align: center;
        color: white;
        font-size: 16px;
        font-weight: 400;
      }

      .register-text a {
        color: aqua;
        text-decoration: none;
        font-weight: 600;
        transition: color 0.3s ease, text-shadow 0.3s ease;
      }

      .register-text a:hover {
        color: #00ffff;
        text-shadow: 0 0 10px aqua;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Called after reCAPTCHA challenge is completed
  const onReCAPTCHAChange = async (token: string | null) => {
    if (!token) {
      setAlertMessage('Please complete the reCAPTCHA.');
      setShowAlert(true);
      return;
    }

    // After successful reCAPTCHA, try login
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setAlertMessage(error.message);
      setShowAlert(true);
      recaptchaRef.current?.reset(); // reset reCAPTCHA on error so user can retry
      return;
    }

    setShowToast(true);
    setTimeout(() => {
      navigation.push('/it35-lab/app', 'forward', 'replace');
    }, 1500);
  };

  // When user clicks login, execute reCAPTCHA first
  const handleLoginClick = () => {
    if (!email || !password) {
      setAlertMessage('Please enter both email and password.');
      setShowAlert(true);
      return;
    }

    recaptchaRef.current?.execute();
  };

  return (
    <IonPage>
      <IonContent className='ion-padding'>
        <div style={{
          display: 'flex',
          color: 'aqua',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '25%'
        }}>
          <IonAvatar className="login-avatar">
            <img
              src="https://media.tenor.com/6q7V5ioLF2QAAAAM/monster-level20-sparkles-my-singing-monsters.gif"
              alt="User Avatar"
            />
          </IonAvatar>
          <h1 style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'White',
            font: 'cloister black',
          }}>USER LOGIN</h1>
          <IonInput
            label="Email"
            labelPlacement="floating"
            fill="outline"
            type="email"
            placeholder="Enter Email"
            value={email}
            onIonChange={e => setEmail(e.detail.value!)}
          />
          <IonInput
            style={{ marginTop: '10px' }}
            fill="outline"
            type="password"
            placeholder="Password"
            value={password}
            onIonChange={e => setPassword(e.detail.value!)}
          >
            <IonInputPasswordToggle slot="end" />
          </IonInput>
        </div>

        {/* Visible ReCAPTCHA above Login button */}
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6LfGqksrAAAAABJydC5ifxBhX8e8RyxyrryXPnXE" // Your actual site key here
          onChange={onReCAPTCHAChange}
        />

        <IonButton onClick={handleLoginClick} expand="full" shape='round'>
          Login
        </IonButton>

        <IonButton routerLink="/it35-lab/register" expand="full" fill="clear" shape='round'>
          Don't have an account? Register here
        </IonButton>

        <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Login successful! Redirecting..."
          duration={1500}
          position="top"
          color="primary"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
  