import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import OpenModalConfirmDelete from "../ConfirmDeleteModal/OpenModalConfirmDelete";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import OpenModalUpdateReview from "../UpdateReviewModal/OpenModalUpdateReview";
import CreateReviewModal from "../CreateReviewModal/CreateReviewModal";
import "./ReviewsList.css";

const ReviewsList = ({ review }) => {
    const dateCreated = new Date(review.createdAt);
    const month = dateCreated.getMonth();
    const year = dateCreated.getFullYear();

    const history = useHistory();

    const months = {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December"
    };

    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className="each-review clickable" onClick={() => history.push(`/spots/${review.Spot?.id}`)}>
            <h3 className="review-author">
                {review.User?.firstName}
            </h3>
            <p className="date-of-review-line">
                {months[month]}, {year}
                    <div className="review-num-stars">
                        {review.stars}
                    </div>
                    <div className="starrr">
                        <i className="fa-solid fa-star small-star" />
                    </div>
            </p>
            <p>
                {review.review}
            </p>
            {sessionUser && review.User?.id === sessionUser.id && (
                <div className="user-review-options-line">
                    <OpenModalConfirmDelete
                        itemText="Delete Review"
                        review={review}
                        modalComponent={<ConfirmDeleteModal review={review} />}
                    />
                    <OpenModalUpdateReview
                        itemText="Update Review"
                        review={review}
                        modalComponent={<CreateReviewModal spotId={review.spotId} oldReview={review} />}
                    />
                </div>
            )}
        </div>
    )
};

export default ReviewsList;
