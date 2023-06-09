import { csrfFetch } from "./csrf";

// Action type constants
const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const CREATE_SPOT = 'spots/CREATE_SPOT';
const DISPLAY_SPOT = 'spots/DISPLAY_SPOT';
const DELETE_SPOT = 'spots/DELETE_SPOT';
const UPDATE_SPOT = 'spots/UPDATE_SPOT';

// Action creators
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
});

export const createSpot = (spot) => ({
    type: CREATE_SPOT,
    spot
});

export const displaySpot = (spot) => ({
    type: DISPLAY_SPOT,
    spot
});

export const deleteSpot = (spotId) => ({
    type: DELETE_SPOT,
    spotId
});

export const editSpot = (spot) => ({
    type: UPDATE_SPOT,
    spot
});

// Thunk action creators

// Get all spots thunk
export const getAllSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const spots = await response.json();
        dispatch(loadSpots(spots));
    }
};

// Create a spot thunk
export const createNewSpotThunk = (payload) => async (dispatch) => {
    const {
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        spotImages
    } = payload;

    const newSpot = {
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    };

    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newSpot)
    });

    if (response.ok) {
        const spot = await response.json();

        for (let i = 0; i < spotImages.length; i++) {
            const image = spotImages[i];
            await csrfFetch(`/api/spots/${spot.id}/images`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(image)
            });
        }

        dispatch(createSpot(spot)); // this line updates the state
        return spot; // this sends the new spot to the frontend

    } else {
        const errResponse = await response.json();
        return errResponse;
    }
};

// Display a spot's details thunk
export const displaySpotThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const spot = await response.json();
        dispatch(displaySpot(spot));

        return spot;
    } else {
        const errResponse = await response.json();
        return errResponse;
    }
};

// Delete a spot thunk
export const deleteSpotThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        dispatch(deleteSpot(spotId));
    }
};

// Edit a spot thunk
export const editSpotThunk = (payload) => async (dispatch) => {
    const {
        id,
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    } = payload;

    const newSpot = {
        id,
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    };

    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newSpot)
    });

    if (response.ok) {
        const spot = await response.json();

        dispatch(editSpot(spot)); // this line updates the state
        return spot; // this sends the new spot to the frontend

    } else {
        const errResponse = await response.json();
        return errResponse;
    }
};


// Spots reducer
const initialState = { allSpots: {}, singleSpot: null };
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS: {
            const newState = {...state, allSpots: {...state.allSpots}};
            action.spots.Spots.forEach(spot => { // normalizing my spots data
                newState.allSpots[spot.id] = spot
            });
            return newState;
        }
        case CREATE_SPOT: {
            const newState = {...state, allSpots: {...state.allSpots}};
            newState.allSpots[action.spot.id] = action.spot;
            return newState;
        }
        case DISPLAY_SPOT: {
            const newState = {...state, singleSpot: {...state.singleSpot}};
            newState.singleSpot = action.spot;
            return newState;
        }
        case DELETE_SPOT: {
            const newState = {...state, allSpots: {...state.allSpots}};
            delete newState.allSpots[action.spotId];
            return newState;
        }
        case UPDATE_SPOT: {
            const newState = {...state, allSpots: {...state.allSpots}};
            newState.allSpots[action.spot.id] = action.spot;
            return newState;
        }
        default:
            return state;
    }
}

export default spotsReducer;
