import React from "react";
import NextLink from "next/link";

export default function Footer() {
  return (
    <footer className=" shadow  bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm  sm:text-center text-white">
          © 2023{" "}
          <NextLink href="/" className="hover:underline">
            PMS Service™
          </NextLink>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white sm:mt-0">
          <li>
            <NextLink href="/" className="hover:underline me-4 md:me-6">
              Home
            </NextLink>
          </li>
          <li>
            <NextLink href="/Service" className="hover:underline me-4 md:me-6">
              Services
            </NextLink>
          </li>
          <li>
            <NextLink href="/Pricing" className="hover:underline me-4 md:me-6">
              Pricing
            </NextLink>
          </li>
        </ul>
      </div>
    </footer>
  );
}
