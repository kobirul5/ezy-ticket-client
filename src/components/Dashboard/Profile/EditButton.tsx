import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MdEdit, MdCloudUpload } from "react-icons/md";
import Swal from "sweetalert2";
import { useUpdateProfileMutation } from "@/app/features/user/userApi";

const EditButton = ({ user, refetch }: { user: any, refetch: any }) => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const modalRef = useRef<HTMLDialogElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm();

  // Watch for image file changes to update preview
  const imageFile = watch("image");

  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(imageFile[0]);
    }
  }, [imageFile]);

  // Set initial form values
  useEffect(() => {
    if (user) {
        reset({
            name: user.name || "",
            phone: user.phone || "",
            address: user.address || "",
            email: user.email || ""
        });
        setPreviewImage(user.picture || user.photoURL || null);
    }
  }, [user, reset]);

  // Modal functions using ref
  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
      reset(); // Reset form on close
      setPreviewImage(user?.picture || user?.photoURL || null);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      
      const userData = {
        name: data.name,
        phone: data.phone,
        address: data.address
      };

      formData.append("data", JSON.stringify(userData));
      
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      const res = await updateProfile(formData).unwrap();

      if (res.success) {
        refetch(); // Refetch profile data
        await Swal.fire({
          title: "Updated!",
          text: "Profile updated successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });
        closeModal();
      }
    } catch (error: any) {
      console.error(error);
      Swal.fire({
        title: "Error!",
        text: error?.data?.message || "Failed to update profile.",
        icon: "error",
      });
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="ezy-button-primary mt-8 flex items-center gap-2"
      >
        <MdEdit className="text-xl" />
        Edit Profile
      </button>

      <dialog ref={modalRef} id="updateProfile" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box w-11/12 max-w-3xl bg-white p-8 rounded-2xl shadow-2xl">
          <div className="flex justify-between items-center mb-6">
             <h3 className="font-bold text-2xl text-gray-800">Edit Profile</h3>
             <button onClick={closeModal} className="btn btn-sm btn-circle btn-ghost text-gray-500 hover:bg-gray-100">✕</button>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Side: Image Upload */}
                <div className="flex flex-col items-center gap-4">
                    <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-gray-200 shadow-inner group">
                        {previewImage ? (
                            <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                                <span className="text-4xl">?</span>
                            </div>
                        )}
                        <label className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <MdCloudUpload className="text-white text-3xl" />
                            <span className="text-white text-xs font-medium mt-1">Change Photo</span>
                             <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                {...register("image")}
                            />
                        </label>
                    </div>
                    <p className="text-sm text-gray-500 text-center">Click image to upload new photo</p>
                </div>

                {/* Right Side: Form Fields */}
                <div className="md:col-span-2 space-y-4">
                    {/* Name Field */}
                    <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-medium text-gray-700">Full Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        {...register("name", { required: "Name is required" })}
                        className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                    {errors.name && (
                        <span className="text-error text-sm mt-1">{errors.name.message as string}</span>
                    )}
                    </div>

                    {/* Email Field (Read Only) */}
                    <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-medium text-gray-700">Email</span>
                    </label>
                    <input
                        type="email"
                        disabled
                        {...register("email")}
                        className="input input-bordered w-full bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Phone Field */}
                        <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium text-gray-700">Phone Number</span>
                        </label>
                        <input
                            type="tel"
                            placeholder="+1234567890"
                            {...register("phone", { required: "Phone Number is required" })}
                            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                        {errors.phone && (
                            <span className="text-error text-sm mt-1">{errors.phone.message as string}</span>
                        )}
                        </div>

                         {/* Address Field */}
                        <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium text-gray-700">Address</span>
                        </label>
                        <input
                            type="text"
                            placeholder="New York, USA"
                            {...register("address", {required: "Address is required"})}
                            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                        {errors.address && (
                            <span className="text-error text-sm mt-1">{errors.address.message as string}</span>
                        )}
                        </div>
                    </div>
                </div>
             </div>


            {/* Buttons */}
            <div className="modal-action mt-8 border-t pt-6">
              <button
                type="button"
                onClick={closeModal}
                className="btn btn-ghost hover:bg-gray-100"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ezy-button-primary-sm min-w-[120px]"
                disabled={isLoading}
              >
                {isLoading ? <span className="loading loading-spinner loading-sm"></span> : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
            <button onClick={closeModal}>close</button>
        </form>
      </dialog>
    </>
  );
};

export default EditButton;