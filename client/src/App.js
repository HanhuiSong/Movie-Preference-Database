import { Container } from "@material-ui/core";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./Home";
import Search from "./Search";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Auth from './components/Authentication/Auth';


function App() {

  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <GoogleOAuthProvider clientId='821129021985-6kfmqt89isj43rkt1el7plcbnrpcijca.apps.googleusercontent.com'>
      <Router>
        <Header />
        <div className="app">
          <Container>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/search" component={Search} />
              <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to='/' />)} />
            </Switch>
          </Container>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
