import TravelBanner from "@/components/Travel/TravelBanner"
import FlashDeals from "@/components/Travel/FlashDeals/FlashDeals"
import TravelFAQ from "@/components/Travel/TravelFAQ/TravelFAQ"
import WhyChooseUsTravel from "@/components/Travel/WhyChooseUsTravel"
import BusCompaniesSection from "@/components/Travel/BusCompaniesSection/BusCompaniesSection"
import PopularBusRoutes from "@/components/Travel/BusCompaniesSection/PopularBusRoutes"
import useAuth from "@/Hooks/useAuth"

const Travel = () => {
  const { darkMode } = useAuth() as any
  return (
    <section
      className={`${darkMode ? "bg-[#111111] " : ""} overflow-x-hidden`}
    >
      <TravelBanner />

      <section className="container mx-auto px-4 pt-10 mb-14">
        <FlashDeals />
      </section>
      
      {/* <AddTravelService /> */}
      <BusCompaniesSection></BusCompaniesSection>

      {/* set form */}
      <div id="scroll-section ">
        {/* <TravelUltimateCompanion/> */}
      </div>
      <section className="px-4 mb-20">
        <TravelFAQ />
        {/* TODO: need added premium section */}
        <WhyChooseUsTravel />
      </section>
      {/*<TravelTestimonials/> */}
      <PopularBusRoutes/>

    </section>
  )
}

export default Travel;
