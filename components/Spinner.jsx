import { ClipLoader } from "react-spinners";

export default function Spinner() {
  return (
    <div className="flex flex-center mt-4">
      <ClipLoader color={"green"} size={20} />
    </div>
  );
}
