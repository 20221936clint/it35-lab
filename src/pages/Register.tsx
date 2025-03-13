import {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonInput,
    IonButton,
    IonItem,
    IonLabel,
    IonAlert,
    IonModal,
    useIonRouter
  } from '@ionic/react';
  import { useState } from 'react';
  
  const Register: React.FC = () => {
    const navigation = useIonRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showModal, setShowModal] = useState(false);
  
    const handleRegister = () => {
      if (!email.endsWith('@nbsc.edu.ph')) {
        setShowAlert(true);
        return;
      }
      if (password !== confirmPassword) {
        setShowAlert(true);
        return;
      }
      setShowModal(true);
    };
  
    const goToLogin = () => {
        navigation.push('/it35-lab', 'back', 'replace');
      };
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Register</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="ion-padding">
          <IonItem>
            <IonLabel position="floating" style={{ fontSize: '14px' }}>Email</IonLabel>
            <IonInput style={{ fontSize: '14px' }} type="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
          </IonItem>
          <IonItem>
            <IonLabel position="floating" style={{ fontSize: '14px' }}>Password</IonLabel>
            <IonInput style={{ fontSize: '14px' }} type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} />
          </IonItem>
          <IonItem>
            <IonLabel position="floating" style={{ fontSize: '14px' }}>Confirm Password</IonLabel>
            <IonInput style={{ fontSize: '14px' }} type="password" value={confirmPassword} onIonChange={(e) => setConfirmPassword(e.detail.value!)} />
          </IonItem>
          <IonButton expand="full" onClick={handleRegister}>Register</IonButton>
          <IonButton expand="full" fill="outline" onClick={goToLogin} style={{ marginTop: '10px' }}>Back to Login</IonButton>
          
          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header="Error"
            message="Passwords do not match or invalid email domain use only @nbsc.edu.ph."
            buttons={['OK']}
          />
          
          <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
            <IonContent className="ion-padding">
              <h2>Confirm Details</h2>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Password:</strong> {password.replace(/./g, '*')}</p>
              <IonButton expand="full" onClick={() => setShowModal(false)}>Confirm</IonButton>
            </IonContent>
          </IonModal>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Register;