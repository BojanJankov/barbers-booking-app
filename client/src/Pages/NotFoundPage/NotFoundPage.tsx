import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark text-font p-6">
      <div className="text-center space-y-6">
        <h1 className="text-7xl font-extrabold text-light">404</h1>
        <p className="text-2xl sm:text-3xl font-semibold">
          Oops! Page not found
        </p>
        <p className="text-lg sm:text-xl text-border">
          The page you are looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-3 bg-light text-font rounded-lg hover:bg-border transition-all shadow-md text-base sm:text-lg cursor-pointer"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
