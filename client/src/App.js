import { Container } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./Home";
import Search from "./Search";
import { HashRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <div className="app">
        <Container>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/search" component={Search} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
