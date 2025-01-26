import Link from "next/link";
import React, { useState } from "react";

function RedirectToLogin() {
  const [showModal, setShowModal] = useState(false);

  const handleGuestClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="from-darkPrimary to-darkSecondary flex h-full w-full flex-col items-center justify-center bg-gradient-to-b align-middle text-white">
      <div className="bg-darkPrimary to-darkPrimary flex h-2/5 w-2/5 flex-col items-center justify-center gap-12 rounded-lg bg-gradient-to-b from-black align-middle shadow-2xl">
        <p className="text-center text-2xl">
          {"To use Travis' Anime Recommender, you must first"}
        </p>
        <div className="bg-darkSecondary text-darkTertiary hover:text-darkSecondary flex h-16 w-32 items-center justify-center rounded-lg hover:bg-white">
          <Link
            href="/sign-in"
            className="flex h-full w-full items-center justify-center text-lg"
          >
            Sign In
          </Link>
        </div>
        <button
          className=" rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-800"
          onClick={handleGuestClick}
        >
          Continue as Guest
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-darkPrimary w-1/3 rounded-lg p-6 shadow-lg">
            <h2 className="mb-4 text-center text-xl font-bold">
              Use the following credentials during sign in:
            </h2>
            <div className="flex flex-col items-center gap-4">
              <p className="text-center text-white">
                <span className="font-bold">Username:</span> 1234testuser1234
              </p>
              <p className="text-center text-white">
                <span className="font-bold">Password:</span> 1234testuser1234
              </p>
            </div>
            <div className="mt-6 flex justify-center">
              <button
                className="rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-800"
                onClick={() => {
                  navigator.clipboard.writeText("1234testuser1234");
                  alert("Copied to clipboard!");
                }}
              >
                Copy
              </button>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-darkSecondary rounded-lg px-4 py-2 text-white hover:bg-blue-800"
                onClick={closeModal}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RedirectToLogin;
