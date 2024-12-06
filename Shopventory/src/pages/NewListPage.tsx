import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonRadioGroup,
  IonRadio,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonList,
} from '@ionic/react';
import { arrowBackCircle, basketOutline, informationCircle } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { getAuth } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';

const NewListPage: React.FC = () => {
  const [listType, setListType] = useState('shopping');
  const [listName, setListName] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false); // Modal state
  const history = useHistory();

  const createNewList = async () => {
    if (!listName.trim()) {
      alert('Please provide a list name');
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      alert('User not logged in!');
      return;
    }

    try {
      const userId = user.uid;
      const listsRef = collection(db, `users/${userId}/lists`);
      const newListRef = doc(listsRef);
      await setDoc(newListRef, {
        name: listName,
        type: listType,
        createdAt: new Date(),
      });
      alert('New list created successfully!');
      history.push('/ListsPage');
    } catch (error) {
      console.error('Error creating list:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'success'}>
          <IonButton
            onClick={() => history.goBack()} // Go back to the previous page
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
        <h1>Create New List</h1>
        <IonRadioGroup value={listType} onIonChange={(e) => setListType(e.detail.value)}>
          <IonItem>
            <IonRadio color={'success'} value="shopping" slot="start" />
            <IonLabel>Shopping</IonLabel>
          </IonItem>
          <IonItem>
            <IonRadio color={'success'} value="inventory" slot="start" />
            <IonLabel>Inventory</IonLabel>
          </IonItem>
        </IonRadioGroup>
        <IonItem>
          <IonInput
            placeholder="List name"
            value={listName}
            onIonInput={(e: any) => setListName(e.target.value)}
          />
        </IonItem>
        <IonButton onClick={createNewList} color="success">
          Create New List
        </IonButton>

        {/* Info Button */}
        <IonButton
          fill="clear"
          onClick={() => setShowInfoModal(true)}
          style={{ marginTop: '1rem', marginBottom: '1rem' }}
        >
          <IonIcon icon={informationCircle} color="success" size="large" />
        </IonButton>

        {/* Info Modal */}
        <IonModal isOpen={showInfoModal} onDidDismiss={() => setShowInfoModal(false)}>
          <IonHeader>
            <IonToolbar color={'success'}>
              <IonTitle>Create New List Info</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem>Select the type of list: Shopping or Inventory.</IonItem>
              <IonItem>Provide a unique name for your list.</IonItem>
              <IonItem>Press "Create New List" to save it.</IonItem>
              <IonItem>
              Shopping lists are for tracking items to purchase, where you can strike through items as you complete them. 
              Inventory lists are for managing items you own.
              </IonItem>
            </IonList>
            <IonButton color={'success'} expand="block" onClick={() => setShowInfoModal(false)}>
              Close
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default NewListPage;
