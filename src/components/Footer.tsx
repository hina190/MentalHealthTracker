import React from "react";
import Link from "next/link";
const Footer = () => {
  return (
    <>
      <footer className="bg-indigo-600 text-white py-6 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} MindMate. All rights reserved.
          </p>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <Link href="/privacy" className="hover:underline text-sm">
              Privacy
            </Link>
            <Link href="/terms" className="hover:underline text-sm">
              Terms
            </Link>
            <Link href="/about" className="hover:underline text-sm">
              About
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
