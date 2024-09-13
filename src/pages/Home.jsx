import React, { useState } from "react";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import parse from "html-react-parser";
import StaffModal from "../components/layout/StaffModal";
import EstimateModal from "../components/layout/EstimateModal";

const Home = ({ data }) => {
  const { homePage, staffMembers, logos } = data; // Destructure data from props
  const [isModalOpen, setIsModalOpen] = useState(false); // State for Staff Modal
  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false); // State for Estimate Modal
  const [selectedStaff, setSelectedStaff] = useState(null);

  const getConvertedWixImageUrl = (imageUrl) => {
    if (imageUrl.startsWith("wix:image://")) {
      const wixImageId = imageUrl.split("/v1/")[1].split("/")[0]; // Extract only the image ID part
      return `https://static.wixstatic.com/media/${wixImageId}`;
    }
    return imageUrl; // If it's not a wix:image URL, return as is
  };

  const truncateText = (html, maxLength) => {
    const plainText = html.replace(/<[^>]+>/g, ""); // Strip out HTML tags
    return plainText.length > maxLength
      ? `${plainText.slice(0, maxLength)}...`
      : plainText;
  };

  const openStaffModal = (staffMember) => {
    const profilePic = staffMember.profilePic; // Access profilePic directly from staffMember
    const optimizedImageUrl = profilePic
      ? getConvertedWixImageUrl(profilePic)
      : ""; // Convert image URL

    setSelectedStaff({
      ...staffMember, // Spread original staffMember
      optimizedImageUrl, // Attach optimized image URL
    });
    setIsModalOpen(true); // Open staff modal
  };

  const closeStaffModal = () => {
    setIsModalOpen(false);
    setSelectedStaff(null);
  };

  const openEstimateModal = () => {
    setIsEstimateModalOpen(true); // Open estimate modal
  };

  const closeEstimateModal = () => {
    setIsEstimateModalOpen(false); // Close estimate modal
  };

  return (
    <>
      {/* Hero Section */}
      <div id="hero" className="w-full lg:px-0 px-8">
        <div className="container mx-auto md:flex">
          <div className="md:w-1/2 xl:py-40 lg:py-24 py-16">
            <h1 className="lg:text-7xl text-5xl">
              {homePage[0].data.heroTitle}
            </h1>
            <p className="mt-8">{homePage[0].data.heroText}</p>
            <div className="lg:flex gap-4 mt-8">
              <a href={`mailto:${homePage[0].data.email}`}>
                <div className="flex gap-2 font-bold mb-4">
                  <div className="bg-teal-500 flex items-center justify-center w-7 h-7 rounded-full text-white">
                    <Icon name="mail" size={14} />
                  </div>
                  {homePage[0].data.email}
                </div>
              </a>
              <a href={`tel:${homePage[0].data.phone}`}>
                <div className="flex gap-2 font-bold">
                  <div className="bg-teal-500 flex items-center justify-center w-7 h-7 rounded-full text-white">
                    <Icon name="phone" size={12} />
                  </div>
                  {homePage[0].data.phone}
                </div>
              </a>
            </div>
          </div>
          <div className="md:w-1/2 md:px-8 relative">
            <div className="blur-teal md:top-28 md:right-0 md:w-96 md:h-96 top-0 h-full w-full"></div>
            <div className="w-full h-full md:flex hidden justify-center items-center overflow-hidden relative z-20">
              <video
                src="/img/sunrise.mp4"
                autoPlay
                loop
                muted
                className="w-full h-full object-cover masked-video"
              />
            </div>
            <div className="w-full md:hidden flex relative z-20">
              <img className="w-full" src="/img/bg-video.png" />
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div id="mission" className="w-full lg:px-0 px-4 md:mt-0 mt-16 relative">
        <div className="blur-teal md:-top-28 md:-left-40 md:w-72 md:h-72 -left-16 top-0 w-32 h-32"></div>
        <div className="container mx-auto text-center z-10 relative">
          <h2 className="md:text-5xl text-4xl">
            {homePage[0].data.missionTitle}
          </h2>
          <div className="bg-teal-500 bg-opacity-15 lg:w-8/12 mx-auto md:p-12 p-8 rounded-2xl mt-8">
            {homePage[0].data.missionText}
          </div>
        </div>
      </div>

      {/* Staff Section */}
      <div id="staff" className="w-full lg:px-16 px-8 md:py-36 py-16 relative">
        <div className="blur-teal top-0 -right-48 w-72 h-72"></div>
        <div className="container mx-auto relative z-20">
          <h2 className="md:text-5xl text-4xl md:text-left text-center">
            {homePage[0].data.staffTitle}
          </h2>
          <p className="mt-4 md:w-1/2">{homePage[0].data.staffText}</p>
          <div className="mt-6 grid lg:grid-cols-2 grid-cols-1 md:gap-5">
            {staffMembers.map((staffMember) => {
              const optimizedImageUrl = getConvertedWixImageUrl(
                staffMember.data.profilePic
              );

              return (
                <div
                  key={staffMember._id}
                  className="flex gap-4 hover:shadow-lg hover:shadow-gray-300 rounded-md md:mb-0 mb-8 transition-all bg-teal-500 bg-opacity-5 md:max-h-none max-h-[174px]"
                >
                  <div className="sm:w-3/12 w-48 overflow-hidden bg-gray-200 rounded-md">
                    <img
                      className="object-cover h-full"
                      src={optimizedImageUrl}
                      alt={staffMember.data.staffName}
                    />
                  </div>
                  <div className="md:w-8/12 w-full md:mt-0 mt-4 p-2">
                    <h6 className="text-lg">{staffMember.data.staffName}</h6>
                    <p className="text-teal-500">
                      {staffMember.data.credentials}
                    </p>
                    <p className="md:mt-4 mt-2 md:block hidden">
                      {truncateText(staffMember.data.experience, 200)}
                    </p>
                    <Button
                      variant="link"
                      onClick={() => openStaffModal(staffMember.data)}
                      icon={<Icon name="arrowRight" size={16} />}
                      iconPosition="right"
                    >
                      <span className="font-bold md:text-base text-sm">
                        Read More
                      </span>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="w-full lg:px-0 px-8 relative">
        <div className="blur-teal top-16 left-36 w-96 h-96"></div>
        <div className="container mx-auto md:flex relative z-10">
          <div className="md:w-1/2 w-full flex gap-8 xl:pr-0 md:pr-8 sm:pr-0 mb-8">
            <div className="pt-24">
              <img className="object-cover mt-8" src="/img/pill2.png" />
            </div>
            <div>
              <img className="object-cover" src="/img/pill3.png" />
            </div>
          </div>

          <div id="services" className="md:w-1/2 w-full lg:py-20">
            <h2 className="md:text-5xl text-4xl">
              {homePage[0].data.servicesTitle}
            </h2>
            <p className="mt-8">{homePage[0].data.servicesText}</p>
            <ul className="ml-4 mt-4 services-staff">
              {parse(homePage[0].data.servicesBulletPoints)}
            </ul>
          </div>
        </div>
      </div>

      {/* Insurance Section */}
      <div
        id="insurance"
        className="w-full lg:px-0 px-8 mt-24 py-16 bg-teal-500 bg-opacity-15"
      >
        <div className="container mx-auto text-center">
          <h2 className="md:text-5xl text-4xl mb-8">
            {homePage[0].data.insuranceTitle}
          </h2>
          <div>{homePage[0].data.insuranceText}</div>

          <div className="flex flex-wrap mt-8 gap-8 justify-center max-w-3xl mx-auto">
            {/* Logo */}
            {logos.map((logo) => {
              const optimizedImageUrl = getConvertedWixImageUrl(
                logo.data.image
              );

              return (
                <div key={logo._id} className="md:w-auto w-20">
                  <img
                    alt={logo.data.title}
                    className=""
                    src={optimizedImageUrl}
                  />
                </div>
              );
            })}
          </div>

          <div className="font-bold text-sm mt-6">
            {homePage[0].data.insuranceDisclaimer}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div id="footer" className="w-full lg:px-0 px-8 py-20">
        <div className="container mx-auto md:flex">
          <div className="md:w-1/2 mb-16">
            <h2 className="md:text-5xl text-4xl mb-6">
              {homePage[0].data.contactTitle}
            </h2>
            <div className="lg:flex gap-4">
              <a href={`mailto:${homePage[0].data.email}`}>
                <div className="flex gap-2 font-bold mb-4">
                  <div className="bg-teal-500 flex items-center justify-center w-7 h-7 rounded-full text-white">
                    <Icon name="mail" size={14} />
                  </div>
                  {homePage[0].data.email}
                </div>
              </a>
              <a href={`tel:${homePage[0].data.phone}`}>
                <div className="flex gap-2 font-bold">
                  <div className="bg-teal-500 flex items-center justify-center w-7 h-7 rounded-full text-white">
                    <Icon name="phone" size={12} />
                  </div>
                  {homePage[0].data.phone}
                </div>
              </a>
            </div>
          </div>

          <div className="md:w-1/2">
            <h2 className="md:text-5xl text-4xl mb-6">
              {homePage[0].data.goodFaithTitle}
            </h2>
            <p className="mb-6">{homePage[0].data.goodFaithText}</p>
            <Button variant="primary" onClick={openEstimateModal}>
              Get Estimate
            </Button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div id="copyright" className="w-full lg:px-0 px-8 py-8 bg-zinc-900">
        <div className="container mx-auto md:flex text-white">
          Copyright Dessie Kammer © 2024
        </div>
      </div>

      {/* Staff Modal */}
      {selectedStaff && (
        <StaffModal
          staffMember={selectedStaff}
          isOpen={isModalOpen}
          onClose={closeStaffModal} // Correct close handler for Staff Modal
        />
      )}

      {/* Estimate Modal */}
      <EstimateModal
        isOpen={isEstimateModalOpen}
        text={homePage[0].data.goodFaithEstimateText}
        title={homePage[0].data.goodFaithEstimateInnerTitle}
        onClose={closeEstimateModal} // Correct close handler for Estimate Modal
      />
    </>
  );
};

export default Home;
