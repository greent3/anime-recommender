import React from "react";
import YouTube from "react-youtube";
import { IoIosCloseCircle } from "react-icons/io";

interface DescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  textContent: string | null;
  videoUrl: string | null;
}

export const DescriptionModal = ({
  isOpen,
  onClose,
  textContent,
  videoUrl,
}: DescriptionModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-4 z-50 flex items-center justify-center ">
      <div className="bg-lightPrimary dark:bg-darkPrimary h-5/6 w-full max-w-3xl overflow-y-auto rounded-lg border-4 border-black shadow-lg">
        {/* Modal Header */}
        <div className="flex items-end justify-end p-4">
          <button
            onClick={onClose}
            className="dark:text-darkSecondary "
            aria-label="Close Modal"
          >
            <IoIosCloseCircle size={30} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-initial flex-col ">
          {/* Video */}
          <div className="flex flex-initial items-center justify-center p-4 pb-20">
            {videoUrl ? (
              <YouTube videoId={videoUrl} title="Trailer" />
            ) : (
              <div className="flex items-center justify-center text-center">
                <p className="text-5xl">
                  {`Sorry, There is no trailer for this video :(`}
                </p>
              </div>
            )}
          </div>

          {/* Text Content */}
          <div className="   flex-initial   px-4 pb-4">
            <p className="dark:text-darkSecondary text-lightSecondary">
              {textContent}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
