import { 
  IonAvatar,
    IonButton,
    IonButtons,
      IonCol,
      IonContent, 
      IonGrid, 
      IonHeader, 
      IonInput, 
      IonInputPasswordToggle, 
      IonMenuButton, 
      IonPage, 
      IonRow, 
      IonTitle, 
      IonToolbar, 
      useIonRouter
  } from '@ionic/react';
  
  const Login: React.FC = () => {
    const navigation = useIonRouter();

    const doLogin = () => {
        navigation.push('/it35-lab/app','forward','replace');
    }
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding'>
        
        <div
          style={{
            marginTop: '25%',
          }}
        >
          <IonGrid style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}>
            <IonRow >
              
              <IonCol size="8">
                <IonAvatar style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <img 
                  style={{
                    width:'100px',
                    objectFit:'cover',
                  }}
                  alt="Silhouette of a person's head" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5HmQCbPMJc3NiRlv1q9JC-zDKJX4sdXjJbA&s" />
                </IonAvatar>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonInput label="Username" >
          </IonInput>
          <IonInput type="password" label="Password" value="truth-hurts">
            <IonInputPasswordToggle  slot="end"></IonInputPasswordToggle>
          </IonInput>
          <IonButton onClick={() => doLogin()} expand="full">
            Login
          </IonButton>
        </div>
            
        </IonContent>
      </IonPage>
    );
  };
  
  export default Login;
  