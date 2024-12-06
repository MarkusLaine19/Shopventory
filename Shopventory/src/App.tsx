import { Redirect, Route, } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

import Register from './pages/register';
import Login from './pages/login';
import MainPage from './pages/MainPage';
import NewListPage from './pages/NewListPage';
import NewItemPage from './pages/NewItemPage';
import ShopListDetailsPage from './pages/ShopListDetailsPage';
import InvListDetailsPage from './pages/InvListDetailsPage';
import ListsPage from './pages/ListsPage';


setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route>
        <Route path="/" component={Home} exact/>
        <Route path="/login" component={Login} exact/>
        <Route path="/register" component={Register} exact/>
        <Route path="/MainPage" component={MainPage} exact/>
        <Route path="/NewListPage" component={NewListPage} exact/>
        <Route path="/NewItemPage" component={NewItemPage} exact/>
        <Route path="/list/:listId" component={ShopListDetailsPage} />
        <Route path="/newlist" component={NewListPage} />
        <Route path="/invlist/:listId" component={InvListDetailsPage} />
        <Route path="/ListsPage" component={ListsPage} exact />


        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
