import React, {createRef, Fragment} from "react";
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

            {[1, 2, 3, 4, 5].map((it) => {
              return (
                <Fragment key={it}>
                  <input className="rating__input" id={`star-${it}`} type="radio" name="rating" value={it}/>
                  <label className="rating__label" htmlFor={`star-${it}`}>`Rating ${it}`</label>
                </Fragment>
              );
            })}

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
