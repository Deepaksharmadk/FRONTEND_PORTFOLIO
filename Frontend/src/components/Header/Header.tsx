import { Link } from "react-router-dom";
import { ModeToggle } from "../Theme/mode-toggle";
import { Button } from "../ui/button";
function Header() {
  //  console.log(a)
  return (
    <div className="flex px-3 py-2 justify-end items-center">
      <div className="text-blue-400 flex">
        <div className="text-blue-400">
          <Button variant="outline" className="mr-5">
            <Link className="text-sm" to="/sign-up">
              Login
            </Link>
          </Button>
        </div>
        <div className="text-blue-400">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

export default Header;
