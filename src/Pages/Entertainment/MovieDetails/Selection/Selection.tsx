import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
// import TicketBooking from "../TicketBooking";
import useEntertainmentData from "../../../../Hooks/EntertainmentHook/useEntertainmentData";
import { motion } from "framer-motion";
import useAuth from "../../../../Hooks/useAuth";
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

export function Selection() {
  const { userInfo, darkMode } = useAuth() as any;
  const { halls, movies } = useEntertainmentData() as any;
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [selectedTime, setSelectedTime] = useState(null);
  const [selected, setSelected] = useState<Date | undefined>(new Date());
  const [days, setDays] = useState<any[]>([
    { label: "Today", date: new Date() },
    { label: "Tomorrow", date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) },
  ]);
  const [calendar, setCalendar] = useState(false);
  const [dayName, setDayName] = useState("Today");

  const timeSlots = ["11:00 AM", "01:30 PM", "5:30 PM", "8:00 PM"];
  const movie = movies.find((movie: any) => movie._id == id || movie.id == id);
  console.log(movie);

  const [formData, setFormData] = useState<any>({
    name: userInfo?.name || "user",
    email: userInfo?.email || "",
    phone: userInfo?.phone || "",
    cineplex: "",
    priceperticket: 0,
    address: userInfo?.address || "",
    movieName: movie?.original_title || movie?.name || movie?.title || "",

    // totalPrice: (formData?.priceperticket * Number(formData?.seats) * 1.05)
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDaySelect = (selectedDay: any) => {
   
    setDayName(selectedDay.label || selectedDay);
    setFormData((prev: any) => ({
      ...prev,
      day: selectedDay.label || selectedDay,
      date: selectedDay.date || selectedDay,
    }));
  };

  const handleTimeSelection = (time: any) => {
    setSelectedTime(time);
    setFormData((prevData: any) => ({
      ...prevData,
      time: time,
    }));
  };



  useEffect(() => {
    getNextNDays(7);
    const selectedHall = halls.filter((h: any) => h.name == formData.cineplex)[0];
    console.log(selectedHall?.price);

    if (selectedHall) {
      setFormData((prevData: any) => ({
        ...prevData,
        priceperticket: selectedHall.price,
      }));
    }
  }, [formData.cineplex, halls]);

  function getNextNDays(n = 7) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date();
    const nextDays: any[] = [
      {
        label: "Today",
        date: today.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      },
      {
        label: "Tomorrow",
        date: new Date(
          today.getTime() + 1 * 24 * 60 * 60 * 1000
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      },
    ];

    for (let i = 2; i < n; i++) {
      const nextDate = new Date();
      nextDate.setDate(today.getDate() + i);

      const dayName = days[nextDate.getDay()];
      // If you want to include formatted date, uncomment:
      const formattedDate = nextDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      nextDays.push({
        label: dayName,
        date: formattedDate,
      });
    }
    setDays(nextDays);
    console.log(nextDays);
  }

  const handleCheckout = async () => {
    console.log("checkoutData");
    const checkoutData = {
      ...formData,
      name: userInfo?.name,
      email: userInfo?.email,
      phone: userInfo?.phone,
      address: userInfo?.address,
      ticketType:"entertainment",
      price: parseFloat(
        (formData?.priceperticket * Number(formData.seats) * 1.05).toFixed(2)
      ),
      product: formData?.movieName,
      unitPrice: formData?.priceperticket,
      charge: parseFloat(
        (formData?.priceperticket * Number(formData.seats) * 0.05).toFixed(2)
      ),
      productCategory: movie?.category,
      eventId: movie?._id || movie?.id,
      quantity: Number(formData.seats),
      status: "pending",
      paymentMethod: "card",
      date: new Date().toISOString(),
    };
    

    const res = await axiosSecure.post("/order", checkoutData);
    if (res.data) {
      window.location.replace(res.data.url);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);
    axiosSecure.post("/movie_tickets", formData).then(() => {
      Swal.fire({
        title: "Ticket Booked!",
        text: ` Booking Confirmed for ${movie.title}!`,
        icon: "success",
      });

      setFormData({
        date: "",
        time: "",
        seats: [],
      });
    });
  };

  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const seatsPerRow = 12;

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const handleSelectSeat = (seat: string) => {
    setSelectedSeats((prev) => {
      const updatedSeats = prev.includes(seat)
        ? prev.filter((s) => s !== seat) // Remove seat if already selected
        : [...prev, seat]; // Add seat if not selected
  
      // Update form data using updatedSeats
      setFormData((prevData: any) => ({
        ...prevData,
        selectedSeats: updatedSeats,
        seats: updatedSeats.length,
      }));
  
      return updatedSeats; // Important: return the new selected seats
    });
  };
  
  return (
    <div className="flex relative flex-col items-center  gap-4 p-6 rounded-2xl shadow-md w-full mx-auto">
      {/* Display the days array if needed */}
      <div>
        {days.length > 0 && (
          <div className="mt-4 flex gap-3">
            <div className="flex gap-2 flex-wrap ">
              {days.map((day, index) => (
                <div
                  onClick={() => handleDaySelect(day)}
                  key={index}
                  
                  className={`px-3 py-1 text-sm rounded-full cursor-pointer transition-all duration-300 ${
                    dayName === (day.label || day)
                      ? "bg-green-700 text-white"
                      : "bg-blue-100 text-green-800 hover:bg-green-700 hover:text-white"
                  }`}
                >
                  {day.label || day}
                </div>
              ))}
            </div>
             <button
              onClick={() => setCalendar(!calendar)}
              className="px-3 cursor-pointer transition-all duration-600 hover:bg-green-700 bg-main text-white rounded-full text-sm"
            >
              Choose Date
            </button>
          </div>
        )}
      </div>

      <div
        className={`rounded-lg border absolute right-15 z-20 backdrop-blur-3xl  border-gray-200 p-2 ${
          calendar ? "transition-all duration-500 " : "hidden "
        } `}
      >
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          styles={{
            caption: { color: "#008236", fontWeight: "600" },
            head_cell: { color: "#6b7280" },
            cell: { borderRadius: "8px", padding: "8px" },
            day_selected: {
              backgroundColor: "#3b82f6",
              color: "white",
              fontWeight: "bold",
            },
            day_today: {
              border: "1px solid #3b82f6",
            },
          }}
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col gap-2">
        {/* <label className="text-lg font-semibold text-gray-700">
          Select Cineplex
        </label> */}
        <select
          name="cineplex"
          value={formData.cineplex}
          onChange={handleChange}
          className="w-full p-3 rounded-xl text-center bg-green-100 text-green-900 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
          required
        >
          <option value="" disabled>Select Cineplex</option>

          {halls?.map((hall: any) => (
            <option key={hall.id || hall.name} value={hall.name}>
              {hall.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {timeSlots.map((time, index) => (
            <motion.button
              key={index}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-2xl  transition-all duration-300 font-medium text-sm `}
              onClick={() => handleTimeSelection(time)}
            >
              <div
                className={`px-6 py-2 border border-main ${
                  selectedTime === time ? " text-white bg-main shadow-md" : " "
                }`}
              >
                <p className="text-sm md:text-xl">{time}</p>
                <p className="text-gray-500">Big Screen</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap">
        {/* Seat Formation */}
        <div className="flex flex-col items-center md:p-6  md:scale-100">
          <div className="mb-4 text-xl font-bold">Screen</div>
          <div className="border w-full mb-8 h-2 bg-gray-300 rounded"></div>

          <div className="grid gap-4">
            {rows.map((row) => (
              <div key={row} className="flex justify-center gap-2">
                {Array.from({ length: seatsPerRow }, (_, index) => {
                  const seat = `${row}${index + 1}`;
                  const isSelected = selectedSeats.includes(seat);
                  return (
                    <button
                      key={seat}
                      onClick={() => handleSelectSeat(seat)}
                      className={`w-5 h-5 md:w-10 md:h-10 text-white  rounded-md text-xs md:text-sm ${
                        isSelected ? "bg-green-500" : "bg-gray-700"
                      } hover:bg-gray-500`}
                    >
                      {seat}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold">Selected Seats:</h2>
            <div className="mt-2">{selectedSeats.join(", ") || "None"}</div>
          </div>
        </div>

        <section className="px-4 md:px-8 lg:px-16">
          <div
            className={`${
              darkMode
                ? "text-white bg-gray-500/20 backdrop-blur-3xl"
                : "bg-green-300/20 backdrop-blur-3xl"
            } p-6 md:p-8 rounded-lg shadow-lg max-w-4xl mx-auto mt-10`}
          >
            <h2 className="text-lg md:text-2xl font-bold text-center mb-6">
              🎟 Book Your Ticket
            </h2>

            <p className="text-center text-base md:text-lg mb-6">
              Movie: <span className="font-semibold">{movie?.name}</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-2 md:space-y-6">
              {/* User Info */}
              <div
                className={`p-4 md:p-6 rounded-lg overflow-auto ${
                  darkMode ? "bg-dark-background" : "bg-gray-50"
                }`}
              >
                <h4 className="text-lg font-semibold mb-4 text-supporting">
                  Your Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "Full Name", value: userInfo?.name },
                    { label: "Email", value: userInfo?.email },
                    { label: "Phone", value: userInfo?.phone },
                    { label: "Address", value: userInfo?.address },
                  ].map((item, idx) => (
                    <div key={idx}>
                      <p className="text-sm text-gray-500">{item.label}</p>
                      <p className="font-medium">
                        {item.value || "Not provided"}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-sm text-supporting">
                  * To edit information, visit{" "}
                  <a href="/dashboard/profile">
                    <span className="text-green-600 font-medium underline cursor-pointer">
                      Profile page
                    </span>
                  </a>
                </div>
              </div>

              {/* Ticket Price */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Price per Ticket
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.priceperticket}
                  placeholder="Ticket Price"
                  className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-neutral-500"
                  disabled
                />
              </div>

              {/* Order Summary */}
              <div
                className={`p-4 md:p-6 rounded-lg ${
                  darkMode ? "bg-dark-background" : "bg-gray-50"
                }`}
              >
                <h4 className="text-lg font-semibold mb-4 text-supporting">
                  Order Summary
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm md:text-base">
                    <span>
                      Ticket Price ({formData.seats} × Tk{" "}
                      {formData.priceperticket})
                    </span>
                    <span className="font-medium">
                      Tk{" "}
                      {(
                        formData.priceperticket * Number(formData.seats)
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base">
                    <span>Service Fee (5%)</span>
                    <span className="font-medium">
                      Tk{" "}
                      {(
                        formData.priceperticket *
                        Number(formData.seats) *
                        0.05
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-gray-300 pt-3 mt-3 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-supporting">
                      Tk{" "}
                      {(
                        formData.priceperticket *
                        Number(formData.seats) *
                        1.05
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="relative group">
                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={
                    !userInfo?.name ||
                    !userInfo?.email ||
                    !userInfo?.phone ||
                    !userInfo?.address ||
                    !formData?.priceperticket ||
                    !formData?.time ||
                    !formData?.date
                  }
                  className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 ezy-button-primary transition ${
                    !userInfo?.name ||
                    !userInfo?.email ||
                    !userInfo?.phone ||
                    !userInfo?.address
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <FaBangladeshiTakaSign />
                  Proceed to Checkout
                </button>

                {/* Tooltip */}
                {(!userInfo?.name ||
                  !userInfo?.email ||
                  !userInfo?.phone ||
                  !userInfo?.address) && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    Please update your full information to checkout
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-b-0 border-gray-800"></div>
                  </div>
                )}
              </div>

              <p className="text-center text-xs md:text-sm text-gray-500 mt-3">
                Secure payment processing powered by Stripe
              </p>
            </form>
          </div>
        </section>
      </div>

      {/* <TicketBooking></TicketBooking> */}
    </div>
  );
}
