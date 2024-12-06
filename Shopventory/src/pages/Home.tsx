import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon } from '@ionic/react';
import { basketOutline } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  
  return (
    <IonPage>
      <IonHeader className="ion-text-center">
        <IonToolbar color={'success'}>
          <IonTitle>SHOPVENTORY</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-text-center" fullscreen>
        <div className="home-content">
          <h1><strong>Welcome to Shopventory!</strong></h1>
          <IonIcon icon={basketOutline} className="large-icon"  />
          <h6><strong>Effortless shopping list and inventory management in one app</strong></h6>
          
          <div className='button-container'>
            <IonButton expand="block" routerLink='/login' color={'success'}>Login</IonButton>
            <IonButton expand="block" routerLink='/register' color={'success'}>Register</IonButton>
          </div>
        </div>

        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
