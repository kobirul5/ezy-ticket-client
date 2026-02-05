import HomeBanner from "../../components/Home/HomeBanner";
import HomeCategory from "../../components/Home/HomeCategory";
import EventSection from "../../components/Home/EventSection";
import TravelSection from "../../components/Home/TravelSection";
import Testimonials from "../../components/Home/Testimonials";
import AboutUs from "../../components/Home/AboutUs";
import EventSectionBanner from "../../components/Home/EventSectionBanner";

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
