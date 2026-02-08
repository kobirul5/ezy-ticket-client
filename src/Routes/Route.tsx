import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Events from "../Pages/Events/Events";
import Travel from "../Pages/Travel/Travel";
import Error from "../Pages/Error/Error";
import LoginPage from "../Pages/Authentication/LoginPage";
import RegisterPage from "../Pages/Authentication/RegisterPage";
import EventDetails from "../Pages/Events/EventDetails";
import Pricing from "../Pages/Pricing/Pricing";
import BusReservationPage from "../Pages/Travel/BusReservationPage";
import TravelBusTicketPage from "../Pages/Travel/TravelBusTicketPage";
import BusTicketCancellation from "../components/shared/BusTicketCancellation";
import MyWishList from "../Pages/MyWishList/MyWishList";
import Contact from "../Pages/Contact/Contact";
import Dashboard from "../Layout/Dashboard";
import TravelSelectSet from "../Pages/Travel/TravelSelectSet";
import AddEvents from "../Pages/Dashboard/Events/AddEvents";
import PrivateRoute from "./PrivateRoute";
import ManageEvents from "../Pages/Dashboard/Admin/ManageEvents";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import Profile from "../Pages/Dashboard/Profile/Profile";
import PaymentSuccess from "../Pages/PaymentSuccess/PaymentSuccess";
import PaymentFail from "../Pages/PaymentFail/PaymentFail";
import MyAddedEvents from "../Pages/Dashboard/Events/MyAddedEvents";
import CreateBus from "../Pages/Dashboard/Travel/CreateBus";
import UpdateBus from "../Pages/Dashboard/Travel/UpdateBus";
import CreateTravelLocation from "../Pages/Dashboard/Travel/CreateTravelLocation";
import ManageReviews from "../Pages/Dashboard/Travel/ManageReviews";
import MyBusServices from "../Pages/Dashboard/Travel/MyBusServices";
import SoldTickets from "../Pages/Dashboard/Travel/SoldTickets";
import Payment from "../components/Payment/Payment";
import ManageEventReview from "../Pages/Dashboard/Events/ManageEventReview";
import TravelPaymentSuccess from "../Pages/Travel/TravelPaymentSuccess";
import Page404 from "../Pages/Page404/Page404";
import TicketSold from "../components/Dashboard/TicketSold";
import TicketBought from "../Pages/Dashboard/User/TicketBought";


const Route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <LoginPage></LoginPage>,
      },
      {
        path: "/register",
        element: <RegisterPage></RegisterPage>,
      },
      {
        path: "/payment/success/:tran_id",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "/payment/fail/:tran_id",
        element: <PaymentFail></PaymentFail>,
      },
      // --------------Travel route start----------
      {
        path: "/travel",
        element: <Travel />,
      },
      {
        path: "/travel/bus-ticket-book",
        element: <TravelBusTicketPage />,
      },
      {
        path: "/travel/bus-reservation",
        element: <BusReservationPage />,
      },
      {
        path: "/travel/bus-set/:tran_id",
        element: <TravelSelectSet />,
      },
      {
        path: "/travel/Bus-Ticket-Cancellation-policy",
        element: <BusTicketCancellation />,
      },
      {
        path: "/strip-payment",
        element: <Payment />,
      },
      {
        path: "/travel-payment-success/:tran_id",
        element: <TravelPaymentSuccess />,
      },
      // ------------travel route end-------------

      //-------------Events route start-----------
      {
        path: "/events",
        element: <Events></Events>,
      },
      {
        path: "/eventdetailspublic/:eventId",
        element: <EventDetails></EventDetails>,
      },
      //-------------event route end---------------
      //my wishlists
      {
        path: "/mywishlist",
        element: <MyWishList></MyWishList>,
      },
      {
        path: "/pricing",
        element: <Pricing></Pricing>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
       </PrivateRoute>
    ),
    errorElement: <Error></Error>,
    children: [
      // ---------Users and Common route start ------------
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "manageUsers",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path:"ticket-bought",
        element:<TicketBought></TicketBought>
      },
      {
        path:"ticketSold",
        element: <TicketSold></TicketSold>
      },
      // ------------Events route start----------

      {
        path: "addEvent",
        element: <AddEvents></AddEvents>,
      },
      {
        path: "manageEventReview",
        element: <ManageEventReview></ManageEventReview>,
      },
      {
        path: "manageEvents",
        element: <ManageEvents></ManageEvents>,
      },
      {
        path: "myAddedEvents",
        element: <MyAddedEvents></MyAddedEvents>,
      },
      // -----------Events route ends------------

      //add bus service page, review manage, added by susanto
      {
        path: "add-bus-service",
        element: <CreateBus></CreateBus>,
      },
      {
        path: "update-bus-service/:id",
        element: <UpdateBus />,
      },
      {
        path: "create-travel-location",
        element: <CreateTravelLocation />,
      },
      {
        path: "manageReview",
        element: <ManageReviews />,
      },
      {
        path: "MyBusServices",
        element: <MyBusServices />,
      },
      {
        path: "SoldTickets",
        element: <SoldTickets />,
      },
    ],
  },
  {
    path: "*",
    element: <Page404></Page404>
  }
]);

export default Route;
