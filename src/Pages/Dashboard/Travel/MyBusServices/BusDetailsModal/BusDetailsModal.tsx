import { IoBus } from "react-icons/io5";

const BusDetailsModal = ({ bus, modalId }: { bus: any, modalId: string }) => {
    if (!bus) return null;
  
    return (
       <div id={modalId}>
         <div className="p-4 bg-white rounded-lg shadow-xl">
            <h3 className="font-bold text-lg flex items-center gap-2"><IoBus/> {bus.busName}</h3>
            <pre className="text-xs overflow-auto">{JSON.stringify(bus, null, 2)}</pre>
         </div>
       </div>
    );
  };
  
  export default BusDetailsModal;
  