import { useState } from "react";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";

export default function Stars({ defaultHowMany = 0, disabled, onChange }) {
  const [howMany, setHowMany] = useState(defaultHowMany);
  const starAmount = [1, 2, 3, 4, 5];
  function handleStarClick(n) {
    if (disabled) {
      return;
    }
    setHowMany(n);
    onChange(n);
  }
  return (
    <div className=" inline-flex gap-1 items-center">
      {starAmount.map((n) => (
        <div key={n}>
          <button
            disabled={disabled}
            onClick={() => handleStarClick(n)}
            className="cursor-pointer p-0 border-0 inline-block bg-transparent text-green-700 disabled:cursor-default"
          >
            {howMany >= n ? <StarIcon /> : <StarOutlineIcon />}
          </button>
        </div>
      ))}
    </div>
  );
}
