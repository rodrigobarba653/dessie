import { useState, useEffect } from "react";
import Icon from "../ui/Icon";
import parse from "html-react-parser";
import classNames from "classnames";

const StaffModal = ({ staffMember, isOpen, onClose }) => {
  const [animateContent, setAnimateContent] = useState(false);

  // Manage body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
      document.documentElement.classList.add("overflow-hidden");

      // Delay the content animation slightly to make it visible after background fades
      setTimeout(() => {
        setAnimateContent(true);
      }, 100); // Small delay to ensure background fades first
    } else {
      document.body.classList.remove("overflow-hidden");
      document.documentElement.classList.remove("overflow-hidden");
      setAnimateContent(false);
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
      document.documentElement.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (!staffMember) return null;

  return (
    <div
      className={classNames(
        "fixed inset-0 bg-black bg-opacity-60 z-50 transition-opacity duration-300 ease-in-out",
        { "opacity-100": isOpen, "opacity-0 pointer-events-none": !isOpen }
      )}
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className={classNames(
          "lg:w-1/2 md:w-8/12 w-[90vw] h-full bg-white rounded-s-xl absolute transition-all duration-500 ease-in-out",
          { "right-0": animateContent, "-right-[100%]": !animateContent }
        )}
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <button className="md:mt-0 md:ml-0 mt-2 ml-6" onClick={onClose}>
          <Icon
            name="close"
            size={26}
            className="hover:text-gray-400 cursor-pointer flex items-center justify-center px-0 absolute rounded-full h-10 w-10 top-2 -left-5 bg-slate-200"
          />
        </button>
        <div className="h-full px-6 md:mt-0 mt-1 overflow-y-scroll">
          {/* Staff Member Details */}
          <div className="mt-8">
            <div className="md:flex gap-4 relative h-auto md:mb-4">
              <div className="rounded-md w-48 h-64 overflow-hidden">
                <img
                  className="object-cover h-full"
                  src={
                    staffMember.optimizedImageUrl ||
                    "/path/to/default-image.jpg"
                  }
                  alt={staffMember.staffName || "Staff Member"}
                />
              </div>
              <div className="md:h-64 flex flex-col md:justify-end md:mb-0 mb-4">
                <h3 className="md:text-5xl text-3xl font-bold mt-4">
                  {staffMember.staffName}
                </h3>
                <p className="text-teal-500">{staffMember.credentials}</p>
              </div>
            </div>
            {parse(staffMember.experience)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffModal;
