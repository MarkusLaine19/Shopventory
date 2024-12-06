import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon } from '@ionic/react';
import { arrowBackCircle, basketOutline } from 'ionicons/icons';
import ExploreContainer from '../components/ExploreContainer';
import { useHistory } from 'react-router-dom';
import './Home.css';

const MainPage: React.FC = () => {
  
  return (
    <IonPage>
      <IonHeader>
  <IonToolbar color={'success'}>
    <IonButton
      onClick={() => history.back()} // Go back to the previous page
      fill="clear"
      slot="start"
      style={{ width: 'auto', height: 'auto' }}
    >
      <IonIcon color="dark" size="large" icon={arrowBackCircle} />
    </IonButton>
    <IonTitle className="ion-text-center">SHOPVENTORY</IonTitle>
    <IonButton
      routerLink="/MainPage"
      fill="clear"
      slot="end"
      style={{ width: 'auto', height: 'auto' }}
    >
      <IonIcon icon={basketOutline} color="dark" size="large" />
    </IonButton>
  </IonToolbar>
</IonHeader>
      <IonContent className="ion-text-center" fullscreen>
        <div className="home-content">
          <h1><strong>Welcome to Shopventory!</strong></h1>
          <IonIcon icon={basketOutline} className="large-icon"  />
          <h6><strong>What do you want to do?</strong></h6>
          
          <div className='button-container'>
            <IonButton expand="block" routerLink='/ListsPage' color={'success'}>View Lists</IonButton>
            <IonButton expand="block" routerLink='/NewListPage' color={'success'}>Create New List</IonButton>
            <IonButton expand="block" routerLink='/NewItemPage' color={'success'}>Create New Item</IonButton>
            <IonButton expand="block" routerLink='/' color={'danger'}>Log out</IonButton>
          </div>
        </div>

        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default MainPage;