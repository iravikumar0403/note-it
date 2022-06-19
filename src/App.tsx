import { useRoutes } from "react-router-dom";
import { Modal, Toast } from "./components";
import { routes } from "./config";

const App = () => {
  const routesEl = useRoutes(routes);
  return (
    <div className="mb-16 md:mb-0">
      <Toast />
      {routesEl}
      <Modal />
    </div>
  );
};

export default App;
