import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpotsThunk } from "../../store/spots";
import { useHistory } from "react-router-dom";
import SpotCard from "../SpotCard";
import "./ManageSpots.css";

const ManageSpots = () => {

    const spotsObj = useSelector(state => state.spots.allSpots);
    const spotsArr = Object.values(spotsObj);

    const sessionUser = useSelector(state => state.session.user);
    const currUserId = sessionUser.id;
    const currentUserSpots = spotsArr.filter(spot => spot.ownerId === currUserId);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [dispatch]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <div className='manage-spot-page'>
            <div className='manage-spots-header'>
                {currentUserSpots.length ? <h1 className='manage-spots-title'>Manage your spots</h1>
                                        : <h1 className='manage-spots-title'>You currently don't have any spots listed</h1>}
                <button
                    className='create-new-spot-button-ms clickable'
                    onClick={(e) => history.push("/spots/new")}
                >
                    Create a New Spot
                </button>
            </div>
            <div className='curr-user-spots'>
                {currentUserSpots.map(spot => (
                    <SpotCard
                        manage={true}
                        spot={spot}
                        key={spot.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default ManageSpots;
