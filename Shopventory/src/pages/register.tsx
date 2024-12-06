import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonIcon } from '@ionic/react';
import { arrowBackCircle, basketOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; // Import useHistory
import { toast } from '../toast';
import { registerUser } from '../firebaseConfig';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const history = useHistory(); // Initialize useHistory

    async function register() {
        if (password !== cpassword) {
            return toast('Passwords do not match');
        }
        if (username.trim() === '' || password.trim() === '') {
            return toast('Username and password are required');
        }

        const res = await registerUser(username, password);
        if (res) {
            toast('You have registered successfully!');
            history.push('/login'); // Redirect to login after successful registration
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
                    <IonTitle className="ion-text-center" style={{ flex: 1 }}>SHOPVENTORY</IonTitle>

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
            <h1 className='ion-text-center'>Register</h1>
            <IonContent className="ion-padding">
                <IonInput placeholder="Username" onIonChange={(e: any) => setUsername(e.target.value)} />
                <IonInput
                    type="password"
                    placeholder="Password"
                    onIonChange={(e: any) => setPassword(e.target.value)}
                />
                <IonInput
                    type="password"
                    placeholder="Confirm Password"
                    onIonChange={(e: any) => setCPassword(e.target.value)}
                />
                <IonButton onClick={register} color={'success'}>
                    Register
                </IonButton>
                <p className='ion-text-center'>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </IonContent>
        </IonPage>
    );
};

export default Register;
