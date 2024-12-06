import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonIcon } from '@ionic/react';
import { arrowBackCircle, basketOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from '../toast';
import { loginUser } from '../firebaseConfig';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory(); // Initialize useHistory

    async function login() {
        const res = await loginUser(username, password);
        if (!res) {
            toast('Error logging in with your credentials');
        } else {
            toast('You have logged in!');
            history.push('/MainPage'); // Redirect to MainPage after successful login
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={'success'}>
                    {/* Back button aligned to the left */}
                    <IonButton
                        onClick={() => history.goBack()} // Navigate back to the previous page
                        fill="clear"
                        slot="start"
                        style={{ width: 'auto', height: 'auto' }}
                    >
                        <IonIcon color="dark" size="large" icon={arrowBackCircle} />
                    </IonButton>

                    {/* Centered title */}
                    <IonTitle className="ion-text-center">SHOPVENTORY</IonTitle>

                    {/* Basket icon aligned to the right */}
                    <IonButton
                        fill="clear"
                        slot="end"
                        style={{ width: 'auto', height: 'auto' }}
                    >
                        <IonIcon icon={basketOutline} color="dark" size="large" />
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <h1 className="ion-text-center">Login</h1>
            <IonContent className="ion-padding">
                <IonInput
                    placeholder="Username"
                    onIonChange={(e: any) => setUsername(e.target.value)}
                />
                <IonInput
                    type="password"
                    placeholder="Password"
                    onIonChange={(e: any) => setPassword(e.target.value)}
                />
                <IonButton onClick={login} color={'success'}>Login</IonButton>
                <p className="ion-text-center">
                    Don't have an account yet? <Link to="/register">Register</Link>
                </p>
            </IonContent>
        </IonPage>
    );
};

export default Login;
