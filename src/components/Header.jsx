import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

function Header({ greetText, date, token, handleLogout }) {
  return (
    <header
      className="w-full min-h-[60px] bg-cover bg-center bg-no-repeat relative shadow-md flex items-center"
      style={{
        backgroundImage: "url('/src/assets/images/header_img.jpg')",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-white/5 backdrop-blur-[5px]"></div>
      <div className="w-full px-4 lg:px-6 relative z-[5]">
        <div className="flex items-center justify-between text-white py-3">
          <div className="greetings">
            <h3 className="font-semibold text-white [text-shadow:-1px_-1px_0_black,1px_-1px_0_black,-1px_1px_0_black,1px_1px_0_black]">
              {greetText}
            </h3>
          </div>
          <div className="flex flex-wrap justify-center items-center">
            <div className="mr-3 text-center">
              <span className="uppercase text-sm font-semibold text-white [text-shadow:-1px_-1px_0_black,1px_-1px_0_black,-1px_1px_0_black,1px_1px_0_black]">
                {date}
              </span>
            </div>
            <div className="logout">
              {token && (
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 text-sm font-semibold bg-yellow-500 text-black rounded-full mx-3 border border-yellow-500 hover:bg-yellow-600"
                >
                  <FontAwesomeIcon icon={faPowerOff} className="me-2" />
                  Log Out
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

Header.propTypes = {
  greetText: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  token: PropTypes.string,
  handleLogout: PropTypes.func.isRequired,
};
