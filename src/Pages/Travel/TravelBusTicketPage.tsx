
import travelBannerImage from "../../assets/Travel_image/travel-service/bg-bus.jpg"
import { useGetBusesQuery } from "../../app/features/travel/travelApi";
import BusCard from "../../components/Travel/BusCard";
import BusFilter from "../../components/Travel/TravelTicekBook/BusFilter";
import BusUnavailable from "../../components/Travel/TravelTicekBook/BusUnavailable";
import SelectPlaceTime from "../../components/Travel/TravelTicekBook/SelectPlaceTime";
import useTravelContext from "../../Hooks/TrevalHook/useTravelContext";


const TravelBusTicketPage = () => {
  const { data: allBus, isLoading } = useGetBusesQuery(undefined);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }


  const { filterBus, } = useTravelContext() as any



  return (
    <div className="my-20">
      <div
        className="relative hero min-h-[400px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${travelBannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 "></div>
        <div className="text-center relative z-10 px-5">
          <SelectPlaceTime />
        </div>
      </div>

      {/* select bus */}
      <section className="grid grid-cols-12 my-14 container mx-auto px-5">
        <div className=" col-span-0 lg:col-span-3 hidden lg:flex">

          <BusFilter />
        </div>

        {/* bus card */}

        <div className="col-span-12 lg:col-span-9 flex flex-col gap-10 ">
          {
            filterBus ?
              filterBus?.length < 1 ? <BusUnavailable/> :
                filterBus.map((bus: any, idx: number) => <BusCard key={idx} bus={bus} />)
              :
              allBus?.map((bus: any, idx: number) => <BusCard key={idx} bus={bus} />)
          }
        </div>
      </section>


    </div>
  );
};

export default TravelBusTicketPage;
