import { useState } from "react";
import Modal from "./Modal";

export default function ContactForm() {
  const [general, setGeneral] = useState(false);
  const [support, setSupport] = useState(false);
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    query: "",
    message: "",
    consent: !checked,
  });

 

  const handleConsent = () => {
    setChecked((prev) => {
      const newValue = !prev;
      if(newValue) {
        setErrors((prevErrors) => ({ ...prevErrors, consent: undefined }));

      }

      return newValue;
    });


  };

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "This field is required";
    if (!formData.lastName) newErrors.lastName = "This field is required";
    if (!formData.email && !formData.email.includes("@"))
      newErrors.email = "Please enter a valid email address";
    if (!formData.query) newErrors.query = "Please select a query type";
    if (!formData.message) newErrors.message = "This field is required";
    if (!checked)
      newErrors.consent =
        "To submit this form, please consent to being contacted";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setShowModal((prev) => !prev);
      
      setTimeout(( )=> {
        setShowModal((prev) => !prev);
      },5000)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
  };

  const toggleQuery = () => {
    const newQuery = general ? "Support" : "General";

    setGeneral(newQuery === "General");
    setSupport(newQuery === "Support");

    setFormData((prev) => ({
      ...prev,
      query: newQuery,
    }));

    setErrors((prevErrors) => ({ ...prevErrors, query: undefined }));
  };

  return (
    <div className="h-screen bg-green-100  flex items-center justify-center ">
      <div>
        {showModal && <Modal />}
        <div className="container mx-auto bg-white w-96 p-8 rounded-lg">
          <h1 className="text-2xl font-bold pb-4">Contact Us</h1>
          <form>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <label htmlFor="firstName" className="pb-2 ">
                  First Name<span className="text-green-800 pl-2">*</span>
                </label>
                <input
                  className={`border px-2 text-black ${
                    errors.firstName ? "border-red-400" : "border-gray-500"
                  } border-gray-500 hover:border-green-500  focus:outline-none focus:ring-1 focus:ring-green-500   rounded-md`}
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                {errors.firstName && (
                  <div className="text-red-400 text-xs pt-1">
                    {errors.firstName}
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName" className="pb-2">
                  Last Name<span className="text-green-800 pl-2">*</span>
                </label>
                <input
                  className={`border px-2 text-black ${
                    errors.firstName ? "border-red-400" : "border-gray-500"
                  } hover:border-green-500  focus:outline-none focus:ring-1 focus:ring-green-500   rounded-md`}
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
                {errors.lastName && (
                  <div className="text-red-400 text-xs pt-1">
                    {errors.lastName}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col py-3">
              <label htmlFor="email" className="pb-2">
                Email<span className="text-green-800 pl-2">*</span>
              </label>
              <input
                className={`border px-2 text-black ${
                  errors.email ? "border-red-400" : "border-gray-500"
                } hover:border-green-500  focus:outline-none focus:ring-1 focus:ring-green-500   rounded-md`}
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <div className="text-red-400 text-xs pt-1">{errors.email}</div>
              )}
            </div>
            <div>
              <label htmlFor="query">
                Query Type<span className="text-green-800 pl-2">*</span>
              </label>
              <div className="flex justify-between  pt-3">
                <label
                  onClick={() => toggleQuery()}
                  className={
                    general
                      ? "bg-green-100/80 border px-4 py-2 border-green-500  rounded-md flex items-center"
                      : " border px-4 py-2 border-gray-500  rounded-md flex items-center"
                  }
                >
                  <span
                    className={`w-3 h-3 ring-2 rounded-full ${
                      !general
                        ? "w-3 h-3 ring-2  ring-gray-400"
                        : "bg-green-400 ring-2 ring-green-500  ring-offset-2 ring-offset-white "
                    }`}
                  ></span>

                  <span className="pl-2 text-xs text-black mb-[1.5px]">
                    General Enquiry
                  </span>
                </label>
                <label
                  onClick={() => toggleQuery()}
                  className={
                    support
                      ? "bg-green-100/80 border px-4 py-2 border-green-500  rounded-md flex items-center"
                      : " border px-4 py-2 border-gray-500  rounded-md flex items-center"
                  }
                >
                  <span
                    className={`w-3 h-3 ring-2 rounded-full ${
                      !support
                        ? "w-3 h-3 ring-2  ring-gray-400"
                        : "bg-green-400 ring-2 ring-green-500  ring-offset-2 ring-offset-white "
                    }`}
                  ></span>
                  <span className="pl-2 text-xs text-black mb-[1.5px]">
                    Support Request
                  </span>
                </label>
              </div>
              {errors.query && (
                <div className="text-red-400 text-xs pt-1">{errors.query}</div>
              )}
            </div>

            <div className="flex flex-col pt-3">
              <label htmlFor="message" className="pb-2">
                Message<span className="text-green-800 pl-2 ">*</span>
              </label>
              <textarea
                className={`border text-black resize-none px-2  ${
                  errors.message ? "border-red-400" : "border-gray-500"
                } hover:border-green-500  focus:outline-none focus:ring-1 focus:ring-green-500   rounded-md`}
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              {errors.message && (
                <div className="text-red-400 text-xs pt-1">
                  {errors.message}
                </div>
              )}
            </div>
            <div className="mt-3">
              <label className="flex items-center">
                <input
                  onChange={handleConsent}
                  value={checked}
                  name="consent"
                  type="checkbox"
                  className="h-3 w-3 border-gray-500 text-green-600 focus:ring-white"
                />
                <span className="pl-2 text-xs">
                  I consent to being contacted by the team
                </span>
                <span className="text-green-800 pl-1 text-xs">*</span>
              </label>
              {errors.consent && (
                <div className="text-red-400 text-xs pt-1">
                  {errors.consent}
                </div>
              )}
            </div>
            <div className="pt-3 text-center">
              <button
                className="bg-green-700/90 text-white px-4 py-2  w-full rounded-md"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
