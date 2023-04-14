import { csrfFetch } from "./csrf";

// Action type constants
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';

// Action creators
export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
});

export const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
});

// Thunk action creators
// Get all reviews for a spot thunk
export const getReviewsForSpotThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const reviewsObj = await response.json();
        const reviews = reviewsObj.Reviews;
        dispatch(loadReviews(reviews));

        return reviews;
    }
};

// Create a review thunk
export const createAReviewThunk = (payload) => async (dispatch) => {
    const { spotId, review, stars } = payload;
    const newReview = { review, stars };

    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newReview)
    });

    if (response.ok) {
        const review = await response.json();
        dispatch(createReview(review));
        return review;
    } else {
        const response = await response.json();
        return response;
    }
};

// Reviews reducer
const initialState = { spot: {}, user: {} };
const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS: {
            const newState = {...state, spot: {}};
            action.reviews.forEach(review => {
                newState.spot[review.id] = review
            });
            return newState;
        }
        case CREATE_REVIEW: {
            const newState = {...state, spot: {...state.spot}};
            newState.spot[action.review.id] = action.review;
            return newState;
        }
        default:
            return state;
    }
}

export default reviewsReducer;
