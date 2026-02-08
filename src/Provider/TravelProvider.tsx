import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react"
import useBusStandName from "../Pages/Travel/TravelHooks/useBusStandName";
import Swal from "sweetalert2"
import { useGetBusTicketsQuery } from "../app/features/travel/travelApi";
import { useCreateOrderMutation } from "../app/features/order/orderApi";

interface TravelContextType {
  searchData: any;
  setSearchData: Dispatch<SetStateAction<any>>;
  districts: string[];
  allBusData: any[];
  filterBus: any;
  setFilterBus: Dispatch<SetStateAction<any>>;
  busPassengerData: any;
  setBusPassengerData: Dispatch<SetStateAction<any>>;
  getBusPaymentData: (data: any, navigate: any) => void;
}

export const TravelContext = createContext<TravelContextType | null>(null);

const TravelProvider = ({ children }: { children: ReactNode }) => {
  const [searchData, setSearchData] = useState<any>();
  const [districts] = useBusStandName() as [string[]];
  const { data: busTicketResponse } = useGetBusTicketsQuery(undefined);
  const allBusData = busTicketResponse?.data || [];
  const [filterBus, setFilterBus] = useState<any>();
  const [busPassengerData, setBusPassengerData] = useState<any>();
  const [createOrder] = useCreateOrderMutation();

  const getBusPaymentData = async (data: any, navigate: any) => {
    try {
      const res = await createOrder(data).unwrap();
      if (res.result.insertedId) {
        Swal.fire({
          title: "Payment Successful",
          icon: "success",
          draggable: true
        });
        navigate(`/travel-payment-success/${data.transactionId}`)
      }
    } catch (err) {
      console.error("Payment error:", err);
    }
  }


  const travelData: TravelContextType = {
    searchData,
    setSearchData,
    districts,
    allBusData,
    filterBus,
    setFilterBus,
    busPassengerData,
    setBusPassengerData,
    getBusPaymentData
  }

  return (<TravelContext.Provider value={travelData} >{children}</TravelContext.Provider>)
}

export default TravelProvider
