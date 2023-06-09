import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer/Footer";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import AllSpots from "./components/AllSpots";
import SpotShow from "./components/SpotShow/SpotShow";
import ManageSpots from "./components/ManageSpots/ManageSpots";
import ManageReviews from "./components/ManageReviews/ManageReviews";
import ManageBookings from "./components/ManageBookings/ManageBookings";
import UpdateSpotForm from "./components/UpdateSpotForm/UpdateSpotForm";
import CreateNewSpotForm from "./components/CreateNewSpotForm/CreateNewSpotForm";
import './App.css';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="whole-site">
      <Navigation isLoaded={isLoaded} />
        {isLoaded && <Switch>
            <Route exact path="/"><AllSpots /></Route>
            <Route path="/spots/new"><CreateNewSpotForm /></Route>
            <Route path="/spots/current"><ManageSpots /></Route>
            <Route path="/spots/:spotId/edit"><UpdateSpotForm /></Route>
            <Route path="/spots/:spotId"><SpotShow /></Route>
            <Route path="/reviews/current"><ManageReviews /></Route>
            <Route path="/bookings/current"><ManageBookings /></Route>
            <PageNotFound />
          </Switch>}
        <Footer />
    </div>
  );
}

export default App;
