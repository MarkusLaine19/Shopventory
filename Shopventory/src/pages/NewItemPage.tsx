import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonInput,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonModal,
  IonList,
} from '@ionic/react';
import { arrowBackCircle, basketOutline, informationCircle } from 'ionicons/icons';
import { useState } from 'react';
import { db } from '../firebaseConfig';
import { doc, setDoc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useHistory } from 'react-router-dom';

const NewItemPage: React.FC = () => {
  const [itemName, setItemName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const history = useHistory();

  const handleCreateItem = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert('You must be logged in to create an item.');
      return;
    }

    const userId = user.uid;
    const listId = 'default';

    if (!itemName.trim() || !selectedCategory) {
      alert('Please provide both an item name and a category.');
      return;
    }

    try {
      const itemId = Date.now().toString(); // Generate unique item ID
      const itemRef = doc(db, `users/${userId}/lists/${listId}/items/${itemId}`);

      await setDoc(itemRef, {
        name: itemName,
        category: selectedCategory,
        createdAt: new Date(),
      });

      alert('Item created successfully!');
      setItemName('');
      setSelectedCategory('');
    } catch (error) {
      console.error('Error creating item:', error);
      alert('Failed to create item.');
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
        <h1>Create New Item</h1>
        <IonItem>
          <IonInput
            placeholder="Enter item name"
            value={itemName}
            onIonInput={(e: any) => setItemName(e.target.value)}
          />
        </IonItem>
        <IonItem>
          <IonSelect
            placeholder="Select Category"
            value={selectedCategory}
            onIonChange={(e: any) => setSelectedCategory(e.target.value)}
          >
            <IonSelectOption value="food">Foods</IonSelectOption>
            <IonSelectOption value="drink">Drinks</IonSelectOption>
            <IonSelectOption value="games">Games</IonSelectOption>
            <IonSelectOption value="clothes">Clothes</IonSelectOption>
            <IonSelectOption value="electronics">Electronics</IonSelectOption>
            <IonSelectOption value="other">Other</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonButton expand="block" color={'success'} onClick={handleCreateItem}>
          Create New Item
        </IonButton>

        {/* Info Button */}
        <IonButton
          fill="clear"
          onClick={() => setShowInfoModal(true)}
          style={{ marginTop: '1rem' }}
        >
          <IonIcon icon={informationCircle} color="success" size="large" />
        </IonButton>

        {/* Info Modal */}
        <IonModal isOpen={showInfoModal} onDidDismiss={() => setShowInfoModal(false)}>
          <IonHeader>
            <IonToolbar color="success">
              <IonTitle>Create New Item Info</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem>
                Enter the name of the item you want to create in the input field.
              </IonItem>
              <IonItem>
                Select the appropriate category for your item from the dropdown menu.
              </IonItem>
              <IonItem>Press "Create New Item" to add the item to your inventory.</IonItem>
            </IonList>
            <IonButton color="success" expand="block" onClick={() => setShowInfoModal(false)}>
              Close
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default NewItemPage;
