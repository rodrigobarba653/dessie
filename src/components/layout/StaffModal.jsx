import { useState } from "react";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import parse from "html-react-parser";

const StaffModal = ({ staffMember, isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 transform transition-transform duration-500 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } `}
    >
      <div className="w-full h-full bg-white p-6 lg:p-12 overflow-y-auto relative">
        <Button
          variant="empty"
          onClick={onClose}
          icon={<Icon name="close" size={26} />}
          className="items-center self-start px-0"
        />

        {/* Staff Member Details */}
        <div className="mt-8 md:w-1/2 mx-auto">
          <h2 className="text-3xl font-bold">{staffMember.staffName}</h2>
          <p className="text-teal-500 mb-4">{staffMember.credentials}</p>
          {parse(staffMember.experience)}
        </div>
      </div>
    </div>
  );
};

export default StaffModal;
