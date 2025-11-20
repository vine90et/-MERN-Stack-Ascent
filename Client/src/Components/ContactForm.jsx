import React, { useState } from "react";

const ContactForm = ({ contact, closeContact }) => {
  const [formData, setFormData] = useState({
    fullName: contact?.fullName || "",
    email: contact?.email || "",
    phone: contact?.phone || "",
    subject: contact?.subject || "",
    message: contact?.message || "",
  });

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0  bg-black/50 backdrop-blur-sm z-40"
        onClick={closeContact}
      ></div>

      {/* Modal Wrapper */}
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4" onClick={closeContact} >
        
        {/* Modal Box */}
        <div
          className="bg-white max-w-md w-full  p-6 rounded-xl shadow-xl"
          onClick={(e) => e.stopPropagation()}  // IMPORTANT FIX
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Contact Form</h2>

          <form>
            <div>
              <label>Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="text"
                value={formData.email}
                onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
                placeholder="example@gmail.com"
              />
            </div>
            <div>
              <label>Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
                placeholder="902732XXXX"
              />
            </div>
            <div>
              <label>Subject</label>
              <textarea
                type="text"
                value={formData.subject}
                onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full p-2 border rounded-lg max-h-20 overflow-y-auto "
              />
            </div>
            <div>
              <label>Message</label>
              <input
                type="text"
                value={formData.message}
                onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
                placeholder="Message"
              />
            </div>
            <button type='submit'
            className="mt-3 mx-auto block text-center cursor-pointer border-2 border-indigo-400 bg-indigo-200 px-4 py-1 rounded-full hover:bg-indigo-400 duration-300 "
            >Send</button>
          </form>

        </div>
      </div>
    </>
  );
};

export default ContactForm;
