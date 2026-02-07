import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App"
import { RouterProvider } from "react-router-dom";
import Route from "./Routes/Route.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import TravelProvider from "./Provider/TravelProvider.jsx";
import { store } from "./app/store.js";
import { Provider } from "react-redux";


const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TravelProvider>
            <RouterProvider router={Route} />
            <ToastContainer />
          </TravelProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
