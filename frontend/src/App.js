import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "./components/Header";
import Footer from "./components/Footer";

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import CentreEditScreen from "./screens/CentreEditScreen";
import ItemsScreen from "./screens/ItemsScreen";
import ItemEditScreen from "./screens/ItemEditScreen";
import UserScreen from "./screens/UserScreen";
import UserEditScreen from "./screens/UserEditScreen";
import PriceScreen from "./screens/PriceScreen";

import AboutUsScreen from "./screens/AboutUsScreen";
import ProductScreen from "./screens/ProductScreen";
import AdminScreen from "./screens/AdminScreen";

import "./index.css";
import { Container } from "react-bootstrap";

const App = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <>
      {userInfo ? (
        <>
          <Router>
            <Header />
            <Container>
              <main className="py-3">
                <Switch>
                  <Route exact path="/" component={LoginScreen} />

                  <Route path="/about" component={AboutUsScreen} />
                  <Route path="/home" component={HomeScreen} />
                  <Route path="/centre/:id/edit" component={CentreEditScreen} />
                  <Route path="/items" component={ItemsScreen} />
                  <Route path="/item/:id/edit" component={ItemEditScreen} />
                  <Route path="/users" component={UserScreen} />
                  <Route path="/user/:id/edit" component={UserEditScreen} />
                  <Route path="/price" component={PriceScreen} />

                  <Route path="/admin" component={AdminScreen} />
                  <Route path="/product/:id" component={ProductScreen} />
                </Switch>
              </main>
            </Container>
            <Footer />
          </Router>
          {/* {userInfo.isAdmin ? (
            
          //) : (
          // <div>Not a Admin</div>
          //)
        } */}
        </>
      ) : (
        <Router>
          <LoginScreen />
        </Router>
      )}
    </>
  );
};

export default App;
