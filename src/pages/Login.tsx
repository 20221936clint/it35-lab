import { 
  IonAvatar,
  IonButton,
  IonCol,
  IonContent, 
  IonGrid, 
  IonHeader, 
  IonInput, 
  IonInputPasswordToggle, 
  IonPage, 
  IonRow, 
  IonTitle, 
  IonToolbar, 
  useIonRouter,
  useIonAlert,
  useIonToast
} from '@ionic/react';
import { useState } from 'react';

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast();

  const doLogin = () => {
    if (email === '20221936@nbsc.edu.ph' && password === '20221936') {
      presentToast({
        message: 'Login Successful!',
        duration: 2000,
        color: 'success'
      });
      navigation.push('/it35-lab/app', 'forward', 'replace');
    } else if (email === '' || password === '') {
      presentAlert({
        header: 'Login Failed',
        message: 'Please enter email and password!',
        buttons: ['OK']
      });
    } else {
      presentToast({
        message: 'Wrong combination of Email and Password!',
        duration: 2000,
        color: 'danger'
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <div style={{ textAlign: 'center', marginTop: '10%' }}>
          <IonAvatar style={{ margin: '0 auto 10px', display: 'block', width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden' }}>
            <img 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              alt="Silhouette of a person's head" 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5HmQCbPMJc3NiRlv1q9JC-zDKJX4sdXjJbA&s" 
            />
          </IonAvatar>
          <IonGrid>
            <IonRow>
              <IonCol size="12" style={{ marginTop: '10px', textAlign: 'left' }}>
                <IonInput 
                  label="Email" 
                  type="email" 
                  value={email} 
                  onIonInput={(e) => setEmail(e.detail.value!)}
                  required
                  style={{ textAlign: 'left' }}
                />
                <IonInput 
                  label="Password" 
                  type="password" 
                  value={password} 
                  onIonInput={(e) => setPassword(e.detail.value!)}
                  required
                  style={{ textAlign: 'left' }}
                >
                  <IonInputPasswordToggle slot="end" />
                </IonInput>
                <IonButton onClick={doLogin} expand="full">Login</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
