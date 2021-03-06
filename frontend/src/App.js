import React from 'react';
import { BrowserRouter, Link, Route} from 'react-router-dom';
import AccueilScreen from './screens/AccueilScreen';
import PizzaScreen from './screens/PizzaScreen';
import PanierScreen from './screens/PanierScreen';
import { useDispatch, useSelector } from 'react-redux';
import { deconnexion } from './actions/user';
import ConnexionScreen from './screens/ConnexionScreen';
import InscriptionScreen from './screens/InscriptionScreen';
import LivraisonAdresseScreen from './screens/LivraisonAdresseScreen';
import PaiementScreen from './screens/PaiementScreen';
import CommandeScreen from './screens/CommandeScreen';
import CommandeFinalScreen from './screens/CommandeFinalScreen';
import CommandeHistoryScreen from './screens/CommandeHistoryScreen';
import UserScreen from './screens/UserScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import PizzaListScreen from './screens/PizzaListScreen';
import PizzaEditScreen from './screens/PizzaEditScreen';
import CommandeListScreen from './screens/CommandeListScreen';
import ContactScreen from './screens/ContactScreen';
import CarteScreen from './screens/CarteScreen';

function App() {

    const panier = useSelector(state => state.panier);
    const {panierItems} = panier;

    const userConnexion = useSelector(state => state.userConnexion);
    const {userInfo} = userConnexion;

    const dispatch = useDispatch();
    const deconnexionHandler = () => {
      dispatch(deconnexion());
    };


  return (
      <BrowserRouter> 
    <div className="grid-container">
    <header className="row">
        <div>
            <Link className="entreprise" to="/"> S&A_pizzeria</Link>
        </div>

        <div>
          <Link to="/carte">Carte</Link>
          <Link to="/contact">Contact</Link>
            <Link to="/panier"> Panier
                {panierItems.length > 0 && (
                    <span className="badge"> 
                        {panierItems.length}
                    </span>
                )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.nom} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">

                  <li>
                    <Link to="/profile">Profil</Link>
                  </li>

                  <li>
                    <Link to="/orderhistory">Historique</Link>
                  </li>

                  <li>
                    <Link to="#deconnexion" onClick={deconnexionHandler}>
                      Deconnexion
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/connexion">Connexion</Link>
            )}


            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Tableau de bord</Link>
                  </li>
                  <li>
                    <Link to="/pizzalist">Pizzas</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Commandes</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Clients</Link>
                  </li>
                </ul>
              </div>
            )}
        </div>
   
    </header>
    <main>
        <Route path='/carte' component={CarteScreen}></Route>
        <Route path='/contact' component={ContactScreen}></Route>
        <Route path='/panier/:id?' component={PanierScreen}></Route>
        <Route path='/pizza/:id' component={PizzaScreen} exact></Route>
        <Route path="/pizza/:id/edit" component={PizzaEditScreen} exact></Route>
        <Route path='/connexion' component={ConnexionScreen}></Route>
        <Route path='/inscription' component={InscriptionScreen}></Route>
        <Route path="/shipping" component={LivraisonAdresseScreen}></Route>        
        <Route path="/payment" component={PaiementScreen}></Route>
        <Route path="/placeorder" component={CommandeScreen}></Route>
        <Route path="/order/:id" component={CommandeFinalScreen}></Route>
        <Route path="/orderhistory" component={CommandeHistoryScreen}></Route>
        <PrivateRoute path="/profile" component={UserScreen}></PrivateRoute>        
        <AdminRoute path="/pizzalist" component={PizzaListScreen}></AdminRoute>
        <AdminRoute  path="/orderlist" component={CommandeListScreen}></AdminRoute>
        <Route path="/" component={AccueilScreen} exact></Route>

   
    </main>
    <footer> 
      5 chemin de l'étoile 74940 Annecy-le-Vieux <br/>
      E-mail : saPizzeria@gmail.com
      <div className="row center">
        @2020-Saphya El Ouahabi & Anaïs Ferrera / INFO734 Polytech Annecy-Chambery 
       </div> 
       
    </footer>
  

</div>

</BrowserRouter>

  );
}

export default App;
