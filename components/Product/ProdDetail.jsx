import React, { useEffect, useState } from "react";
import ProductReview from "./ProdReview";
import ProdInfo from "./ProdInfo";
import axios from "axios";
import Stars from "../Stars";
import Spinner from "../Spinner";
import useInput from "@app/hooks/use-input";

const ProdDetail = ({ prodId }) => {
  const [active, setActive] = useState(1);
  const [stars, setStars] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  async function onSubmit() {
    axios
      .post("/api/review", {
        title,
        name,
        description,
        stars,
        productId: prodId,
      })
      .then((res) => {
        titleReset();
        nameReset();
        descriptionReset();
        setStars(0);
        loadReviews();
      });
  }

  useEffect(() => {
    loadReviews();
  }, []);

  function loadReviews() {
    setReviewsLoading(true);
    axios.get("/api/review?productId=" + prodId).then((res) => {
      setReviews(res.data);
      setReviewsLoading(false);
    });
  }

  const {
    input: title,
    inputIsValid: titleIsValid,
    inputIsInValid: titleIsInValid,
    inputHandler: titleChangeHandler,
    blurHandler: titleBlurHandler,
    reset: titleReset,
  } = useInput((value) => value.trim().length !== 0);

  const {
    input: name,
    inputIsValid: nameIsValid,
    inputIsInValid: nameIsInValid,
    inputHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput((value) => value.trim().length !== 0);

  const {
    input: description,
    inputIsValid: descriptionIsValid,
    inputIsInValid: descriptionIsInValid,
    inputHandler: descriptionChangeHandler,
    blurHandler: descriptionBlurHandler,
    reset: descriptionReset,
  } = useInput((value) => value.trim().length !== 0);

  let formIsValid = false;
  if (nameIsValid && titleIsValid && descriptionIsValid && stars > 0) {
    formIsValid = true;
  }

  return (
    <div className="flex flex-col m-auto px-2 sm:px-4 md:px-10 xl:px-52 my-10">
      <div className="mb-2"></div>
      <div className="w-full flex">
        {active === 1 ? (
          <div className="w-1/2 bg-white cursor-pointer text-center border-b-4 border-b-green-500">
            商品資訊
          </div>
        ) : (
          <div
            className="w-1/2 text-gray-500 cursor-pointer text-center border-b"
            onClick={() => setActive(1)}
          >
            商品資訊
          </div>
        )}
        {active === 2 ? (
          <div className="w-1/2 bg-white cursor-pointer text-center border-b-4 border-b-green-500">
            商品評價
          </div>
        ) : (
          <div
            className="w-1/2 text-gray-500 cursor-pointer text-center border-b "
            onClick={() => setActive(2)}
          >
            商品評價
          </div>
        )}
      </div>
      {active === 1 ? (
        <div className="min-h-[800px]">
          <ProdInfo />
        </div>
      ) : null}
      {active === 2 ? (
        <div className="min-h-[800px]">
          <div className="flex flex-col border-b mt-4 mb-4 sm:p-0 p-4">
            <h3 className="text-2xl mb-2">填寫評價</h3>
            <Stars onChange={setStars} />
            <div className="mb-2 mt-2">
              <input
                type="text"
                name="title"
                className="w-full rounded-[7px] border border-zinc-400 bg-transparent px-1 
                          py-1  text-sm font-normal text-blue-gray-700 outline-0
                          transition-all focus:border-1 focus:border-slate-600
                          focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 sm:w-60 mb-1"
                placeholder="標題"
                value={title}
                onChange={titleChangeHandler}
                onBlur={titleBlurHandler}
              />
              {titleIsInValid && (
                <div className="flex">
                  <p className="text-red-600 font-semibold text-sm">
                    請填寫標題
                  </p>
                </div>
              )}
            </div>
            <div className="mb-2">
              <input
                type="text"
                name="name"
                className="w-full rounded-[7px] border border-zinc-400 bg-transparent px-1 
                          py-1 text-sm font-normal text-blue-gray-700 outline-0
                          transition-all focus:border-1 focus:border-slate-600
                          focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 sm:w-60 mb-1"
                placeholder="名稱"
                value={name}
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
              />
              {nameIsInValid && (
                <div className="flex">
                  <p className="text-red-600 font-semibold text-sm">
                    請填寫名字
                  </p>
                </div>
              )}
            </div>
            <div className="mb-2">
              <textarea
                placeholder="評價"
                type="description"
                className="mb-1 p-2 border text-sm border-zinc-400 focus:border-1 focus:border-slate-600 box-border font-light text-blue-gray-700 outline-0 focus:outline-0 rounded-[7px] px-1 py-1 w-full"
                value={description}
                onChange={descriptionChangeHandler}
                onBlur={descriptionBlurHandler}
              ></textarea>
              {descriptionIsInValid && (
                <div className="flex">
                  <p className="text-red-600 font-semibold text-sm">
                    請填寫評論
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={onSubmit}
              disabled={!formIsValid}
              className="border bg-lime-400 py-1.5 px-5 text-black transition-alltext-center text-sm cursor-pointer w-full h-full right-0 hover:bg-lime-500 disabled:bg-slate-50 disabled:cursor-not-allowed mb-4 mt-4"
            >
              送出評價
            </button>
          </div>
          {reviewsLoading && <Spinner />}
          {reviews.length === 0 && <p>搶先評價，成為首位評價此產品的人</p>}
          {reviews.length > 0 &&
            reviews.map((review) => (
              <ProductReview
                authorName={review.name}
                title={review.title}
                createAt={new Date(review.createdAt).toLocaleDateString(
                  "zh-TW"
                )}
                comment={review.description}
                star={review.stars}
                key={review._id}
              />
            ))}
        </div>
      ) : null}
    </div>
  );
};

export default ProdDetail;
