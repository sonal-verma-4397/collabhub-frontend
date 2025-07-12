import { Link } from "react-router-dom";
import { APP_NAME } from "../../../../data/constants";

// -------------------- HEADER ---------------------
export default function Header() {
  return (
    <header className="px-[15vw] py-2">
      <Link to={"/"} className="text-2xl font-bold">
        {APP_NAME}
      </Link>
    </header>
  );
}
