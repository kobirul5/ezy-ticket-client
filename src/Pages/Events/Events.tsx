import useAuth from "@/Hooks/useAuth";
import AllEvents from "@/components/Events/AllEvents/AllEvents";
import EventBanner from "@/components/Events/EventBanner";
// import EventCards from "@/components/Events/EventCards";
import EventInfo from "@/components/Events/EventInfo";
// import EventReview from "@/components/Events/EventReview";
import TopEvents from "@/components/Events/TopEvents";

const Events = () => {
  const { darkMode } = useAuth() as any;

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
    <div
      className={`${darkMode
        ? "bg-dark-background text-dark-primary"
        : "bg-background text-black"
        } `}
    >
      <EventBanner scrollToSection={scrollToSection}></EventBanner>
      {/* <EventCards></EventCards> */}
      <TopEvents></TopEvents>
      <AllEvents></AllEvents>
      <EventInfo></EventInfo>
    </div>
  );
};

export default Events;
