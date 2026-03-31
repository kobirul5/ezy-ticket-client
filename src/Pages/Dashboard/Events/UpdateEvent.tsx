import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "@/Hooks/useAuth";
import {
  FaTicketAlt,
  FaImage,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaArrowLeft,
} from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";
import Swal from "sweetalert2";
import { useUpdateEventMutation } from "@/app/features/event/eventApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const UpdateEvent = () => {
  const { user, userInfo } = useAuth()! as any;
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const [updateEvent, { isLoading }] = useUpdateEventMutation();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  // Attempt to get the event from route state
  const event = location.state?.event;

  useEffect(() => {
    if (!event) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Event data not found. Please navigate from My Added Events.",
      }).then(() => {
        navigate("/dashboard/myAddedEvents");
      });
      return;
    }

    // Pre-fill the form
    const editableFields = [
      "title",
      "eventType",
      "eventCategory",
      "eventDate",
      "eventTime",
      "duration",
      "price",
      "totalTickets",
      "maxTickets",
      "location",
      "details",
      "organizer",
    ];

    editableFields.forEach((field) => {
      if (field in event) {
        // For date formatting
        if (field === "eventDate") {
          const dateValue = new Date(event[field]).toISOString().split("T")[0];
          setValue(field, dateValue);
        } else {
          setValue(field, event[field]);
        }
      }
    });

    if (event.image) {
      setImagePreview(event.image);
    }
  }, [event, setValue, navigate]);

  // Watch image field for preview
  const imageFile = watch("image");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(event?.image || null);
    }
  };

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    const eventData = {
      title: data.title,
      eventType: data.eventType,
      eventCategory: data.eventCategory,
      eventDate: data.eventDate,
      eventTime: data.eventTime,
      duration: data.duration,
      location: data.location,
      details: data.details,
      totalTickets: parseInt(data.totalTickets),
      price: parseFloat(data.price),
      maxTickets: parseInt(data.maxTickets),
      organizer: data.organizer,
    };

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    formData.append("data", JSON.stringify(eventData));

    try {
      await updateEvent({ id, formData }).unwrap();
      Swal.fire({
        icon: "success",
        title: "Event Updated!",
        text: "Your event details have been successfully updated.",
        confirmButtonColor: "#53b17a",
      }).then(() => {
        navigate("/dashboard/myAddedEvents");
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error?.data?.message || "Something went wrong!",
      });
    }
  };

  const inputClass =
    "w-full p-3 rounded-xl border border-gray-200 focus:border-main focus:ring-2 focus:ring-main/20 outline-none transition-all bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md";
  const labelClass =
    "text-sm font-bold text-gray-700 mb-1 flex items-center gap-2";
  const sectionTitleClass =
    "text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b-2 border-main/10 pb-2";

  if (!event) return null; // Avoid rendering if redirecting

  return (
    <div className="min-h-screen bg-gray-50/50 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-main transition-colors mb-6 group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />{" "}
          Back to My Added Events
        </button>

        {/* Header Section */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-main/10 text-main font-medium text-sm mb-4">
            <HiOutlineSparkles className="animate-pulse" />
            <span>Update Existing Event</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
            Modify Your Event
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Update your event details below to keep your audience informed.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Left Column - Main Details */}
          <div className="lg:col-span-8 space-y-8">
            {/* Section 1: Basic Information */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
              <h3 className={sectionTitleClass}>
                <FaInfoCircle className="text-main" /> Basic Information
              </h3>

              <div className="space-y-6">
                <div className="form-control">
                  <label className={labelClass}>
                    Event Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Give your event a catchy title"
                    {...register("title", { required: "Title is required" })}
                    className={`${inputClass} ${errors.title ? "border-red-500 ring-red-500/10" : ""}`}
                  />
                  {errors.title && (
                    <span className="text-xs text-red-500 mt-1">
                      {(errors.title as any).message}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className={labelClass}>Event Type</label>
                    <select
                      {...register("eventType", { required: true })}
                      className={inputClass}
                    >
                      <option value="online">🌐 Online Event</option>
                      <option value="venue">📍 Physical Venue</option>
                    </select>
                  </div>

                  <div className="form-control">
                    <label className={labelClass}>Category</label>
                    <select
                      {...register("eventCategory", { required: true })}
                      className={inputClass}
                    >
                      <option value="adventureTour">🏔️ Adventure Tour</option>
                      <option value="concert">🎸 Concert</option>
                      <option value="theater">🎭 Theater</option>
                      <option value="festivals">🎪 Festivals</option>
                      <option value="party">🎉 Party</option>
                      <option value="sports">⚽ Sports</option>
                      <option value="park">🌳 Park</option>
                      <option value="workshop">🛠️ Workshop</option>
                      <option value="class">🎓 Class</option>
                    </select>
                  </div>
                </div>

                <div className="form-control">
                  <label className={labelClass}>Event Details</label>
                  <textarea
                    rows={6}
                    placeholder="Describe what makes your event special..."
                    {...register("details")}
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Schedule & Location */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
              <h3 className={sectionTitleClass}>
                <FaCalendarAlt className="text-main" /> Schedule & Location
              </h3>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="form-control">
                    <label className={labelClass}>Date</label>
                    <div className="relative">
                      <input
                        type="date"
                        {...register("eventDate", { required: true })}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="form-control">
                    <label className={labelClass}>Start Time</label>
                    <select
                      {...register("eventTime", { required: true })}
                      className={inputClass}
                    >
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">01:00 PM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                      <option value="17:00">05:00 PM</option>
                      <option value="18:00">06:00 PM</option>
                      <option value="19:00">07:00 PM</option>
                      <option value="20:00">08:00 PM</option>
                    </select>
                  </div>
                  <div className="form-control">
                    <label className={labelClass}>Duration</label>
                    <select
                      {...register("duration", { required: true })}
                      className={inputClass}
                    >
                      <option value="1h">1 Hour</option>
                      <option value="2h">2 Hours</option>
                      <option value="3h">3 Hours</option>
                      <option value="4h">4 Hours</option>
                      <option value="5h">5+ Hours</option>
                      <option value="fullDay">Full Day</option>
                    </select>
                  </div>
                </div>

                <div className="form-control">
                  <label className={labelClass}>Location / Meeting Link</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaMapMarkerAlt className="text-gray-400 group-focus-within:text-main transition-colors" />
                    </div>
                    <input
                      type="text"
                      placeholder="Enter address or online link"
                      {...register("location", { required: true })}
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className={labelClass}>Organizer Name</label>
                  <input
                    type="text"
                    placeholder="Who is organizing this?"
                    {...register("organizer", { required: true })}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Media & Tickets */}
          <div className="lg:col-span-4 space-y-8">
            {/* Section 3: Event Media */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
              <h3 className={sectionTitleClass}>
                <FaImage className="text-main" /> Event Media
              </h3>
              <div className="space-y-4">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center group cursor-pointer hover:border-main transition-all">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-6">
                      <FaImage className="text-4xl text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 font-medium font-roboto">
                        Click to upload cover image
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    {...register("image")}
                    onChange={handleImageChange}
                  />
                </div>
                {errors.image && (
                  <span className="text-xs text-red-500 mt-1">
                    {(errors.image as any).message}
                  </span>
                )}
                <p className="text-xs text-gray-400 italic font-roboto">
                  Recommend size: 1200x675px (16:9)
                </p>
              </div>
            </div>

            {/* Section 4: Ticket Settings */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
              <h3 className={sectionTitleClass}>
                <FaTicketAlt className="text-main" /> Ticket Pricing
              </h3>

              <div className="space-y-5">
                <div className="form-control">
                  <label className={labelClass}>Total Capacity</label>
                  <input
                    type="number"
                    placeholder="0"
                    {...register("totalTickets", {
                      required: "Total capacity strongly required",
                      min: 1,
                      validate: (value) =>
                        value >= (event.soldTickets || 0) ||
                        `Total tickets cannot be less than sold tickets (${event.soldTickets || 0})`,
                    })}
                    className={`${inputClass} ${errors.totalTickets ? "border-red-500" : ""}`}
                  />
                  {errors.totalTickets && (
                    <span className="text-xs text-red-500 mt-1">
                      {(errors.totalTickets as any).message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className={labelClass}>Per Customer Max</label>
                  <input
                    type="number"
                    placeholder="5"
                    {...register("maxTickets", { required: true, min: 1 })}
                    className={inputClass}
                  />
                </div>

                <div className="form-control">
                  <label className={labelClass}>Price (BDT)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">
                      ৳
                    </span>
                    <input
                      type="number"
                      placeholder="0.00"
                      {...register("price", { required: true, min: 0 })}
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-2">
                    Enter 0 for free events
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-8 py-4 bg-main hover:bg-green-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-main/30 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>
                    Update Event
                    <HiOutlineSparkles className="text-xl group-hover:rotate-12 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;
