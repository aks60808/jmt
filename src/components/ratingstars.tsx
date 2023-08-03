import React, { Dispatch, SetStateAction } from "react";

interface RatingStarsProps {
  rating: number;
  fixed: boolean;
  hoverHandler?: Dispatch<SetStateAction<number | null>>;
  hoverRating?: number | null;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  fixed,
  hoverHandler,
  hoverRating,
}) => {
  const handleMouseOver = (index: number) => {
    hoverHandler(index);
  };

  const handleMouseLeave = () => {
    hoverHandler(null);
  };

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`h-6 w-6 fill-current ${
            (hoverRating ?? rating) > index
              ? "text-yellow-500"
              : "text-gray-400"
          }`}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          onMouseOver={!fixed ? () => handleMouseOver(index + 1) : undefined}
          onMouseLeave={!fixed ? () => handleMouseLeave : undefined}
        >
          <path
            fillRule="evenodd"
            d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
          />
        </svg>
      ))}
      {/* <span className="ml-2">{hoverRating ?? rating}/5</span> */}
    </div>
  );
};

export default RatingStars;
