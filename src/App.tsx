import { useRoutes } from "react-router-dom";
import { Toast } from "./components";
import { routes } from "./config";

const App = () => {
  const routesEl = useRoutes(routes);
  return (
    <div className="mb-16">
      <Toast />
      {routesEl}
    </div>
  );
};

export default App;
