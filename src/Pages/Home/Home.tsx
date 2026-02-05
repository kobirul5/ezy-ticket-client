import HomeBanner from "./HomeComponents/HomeBanner";
import HomeCategory from "./HomeComponents/HomeCategory";
import EventSection from "./HomeComponents/EventSection";
import TravelSection from "./HomeComponents/TravelSection";
import Testimonials from "./HomeComponents/Testimonials";
import AboutUs from "./HomeComponents/AboutUs";
import EventSectionBanner from "./HomeComponents/EventSectionBanner";

const Home = () => {

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="min-h-screen relative">
      <HomeBanner />

      {/* Reusable Home Category Component */}
      <HomeCategory />

      {/* Other Sections */}
      <TravelSection />
      <EventSectionBanner />
      <EventSection />
      {/* <AboutUs></AboutUs> */}
      <Testimonials />
    </div>
  );
};

export default Home;
