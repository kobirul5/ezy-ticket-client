import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react'
import useBusStandName from '../Pages/Travel/TravelHooks/useBusStandName';
import useBusState from '../Pages/Travel/TravelHooks/useBusState';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2'

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
  const [allBusData] = useBusState() as [any[]];
  const [filterBus, setFilterBus] = useState<any>();
  const [busPassengerData, setBusPassengerData] = useState<any>();
  const axiosSecure = useAxiosSecure();

  const getBusPaymentData = (data: any, navigate: any) => {
    axiosSecure.post("/payment-bus-ticket", data)
      .then(res => {
        if (res.data.result.insertedId) {
          Swal.fire({
            title: "Payment Successful",
            icon: "success",
            draggable: true
          });
          navigate(`/travel-payment-success/${data.transactionId}`)
        }
      })
      .catch(err => {
        console.error("Payment error:", err);
      });
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
