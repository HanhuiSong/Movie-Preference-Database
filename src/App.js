import { Container } from "@material-ui/core";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./Home";
import Search from "./Search";
import User from "./components/User/index";
import { HashRouter as Router } from "react-router-dom";
import Auth from './components/Authentication/Auth';
import Detail from "./components/Detail";

function App() {

  const savedUser = JSON.parse(localStorage.getItem('profile'));

  return (
    <Router>
      <Header />
      <div className="app">
        <Container>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/detail/:id" component={Detail} />
            <Route path="/search" component={Search} />
            <Route path="/user/:username" component={User} />
            <Route path="/auth" component={() => (!savedUser ? <Auth /> : <Redirect to='/' />)} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
