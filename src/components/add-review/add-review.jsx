import React, {createRef} from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";
import {Operations} from "../../reducer/data/data";

const AddReview = (props) => {
  const {film, sendComment} = props;
  const {id} = film;
  let rating = null;

  const textRef = createRef();

  return (
    <div className="add-review">
      <form
        action="#"
        className="add-review__form"
        onSubmit={(evt) => {
          evt.preventDefault();
          sendComment({
            text: textRef.current.value,
            rating: Number(rating),
          }, id);
        }}
      >
        <div className="rating">
          <div
            className="rating__stars"
            onChange={(evt) => {
              rating = evt.target.value;
            }}>
            <input className="rating__input" id="star-1" type="radio" name="rating" value="1"/>
            <label className="rating__label" htmlFor="star-1">Rating 1</label>

            <input className="rating__input" id="star-2" type="radio" name="rating" value="2"/>
            <label className="rating__label" htmlFor="star-2">Rating 2</label>

            <input className="rating__input" id="star-3" type="radio" name="rating" value="3"/>
            <label className="rating__label" htmlFor="star-3">Rating 3</label>

            <input className="rating__input" id="star-4" type="radio" name="rating" value="4"/>
            <label className="rating__label" htmlFor="star-4">Rating 4</label>

            <input className="rating__input" id="star-5" type="radio" name="rating" value="5"/>
            <label className="rating__label" htmlFor="star-5">Rating 5</label>
          </div>
        </div>

        <div className="add-review__text">
          <textarea className="add-review__textarea" name="review-text" id="review-text"
            placeholder="Review text" minLength={50} ref={textRef} required/>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>

        </div>
      </form>
    </div>
  );
};

AddReview.propTypes = {
  sendComment: PropTypes.func.isRequired,
  film: PropTypes.object.isRequired,
};

// const mapStateToProps = (state) => ({
//   authorizationStatus: getAuthorizationStatus(state),
//   userInfo: getUserInfo(state),
// });

const mapDispatchToProps = (dispatch) => ({
  sendComment(comment, id) {
    dispatch(Operations.sendComment(comment, id));
  },
});

export {AddReview};

export default connect(null, mapDispatchToProps)(AddReview);
