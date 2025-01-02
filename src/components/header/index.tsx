import { useNavigate, useLocation } from "react-router-dom";

interface NavigationPage {
  navigateTo: string;
  path: string;
  name: string;
}

const NAVIGATION_PAGES: NavigationPage[] = [
  {
    navigateTo: "/",
    path: "/statistics",
    name: "Chatbot cá nhân",
  },
  {
    navigateTo: "/statistics",
    path: "/",
    name: "Xem thống kê",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentPage = NAVIGATION_PAGES.find(
    (page) => page.path === location.pathname
  );

  const handleNavigation = () => {
    if (currentPage) {
      navigate(currentPage.navigateTo);
    }
  };

  return (
    <header className="bg-secondary text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Chatbot cá nhân</h1>

      {currentPage && (
        <button
          className="px-4 py-2 rounded-lg hover:bg-primary/90 bg-primary text-white"
          onClick={handleNavigation}
        >
          {currentPage.name}
        </button>
      )}
    </header>
  );
};

export default Header;
