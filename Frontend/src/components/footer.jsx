import React from "react";

import { Facebook, Twitter, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <footer class="bg-gray-800 text-white py-6">
      <div class="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h2 class="text-lg font-semibold">About</h2>
          <p class="text-sm mt-2 text-gray-300">
            An online repository for exam papers, solutions, and
            recommendations.
          </p>
        </div>

        <div>
          <h2 class="text-lg font-semibold px-3">Quick Links</h2>
          <ul class="mt-2 space-y-2">
            <li>
              <a
                href="#"
                class="text-gray-300 hover:bg-gray-700 hover:text-white
                      rounded-md px-3 py-2 text-sm font-medium"
              >
                Exam Papers
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-gray-300 hover:bg-gray-700 hover:text-white
                      rounded-md px-3 py-2 text-sm font-medium"
              >
                Upload Paper
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-gray-300 hover:bg-gray-700 hover:text-white
                      rounded-md px-3 py-2 text-sm font-medium"
              >
                Subscriptions
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-gray-300 hover:bg-gray-700 hover:text-white
                      rounded-md px-3 py-2 text-sm font-medium"
              >
                Referral Program
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 class="text-lg font-semibold px-3">Support</h2>
          <ul class="mt-2 space-y-2">
            <li>
              <a
                href="#"
                class="text-gray-300 hover:bg-gray-700 hover:text-white
                      rounded-md px-3 py-2 text-sm font-medium"
              >
                FAQs
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-gray-300 hover:bg-gray-700 hover:text-white
                      rounded-md px-3 py-2 text-sm font-medium"
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-gray-300 hover:bg-gray-700 hover:text-white
                      rounded-md px-3 py-2 text-sm font-medium"
              >
                Report an Issue
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-gray-300 hover:bg-gray-700 hover:text-white
                      rounded-md px-3 py-2 text-sm font-medium"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 class="text-lg font-semibold px-3">Follow Us</h2>
          <div className="flex space-x-4 px-3">
            <a
              href="#"
              className="flex items-center gap-1 text-gray-300 hover:text-blue-500"
            >
              <Twitter fontSize="small" />
              <span>Twitter</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-1 text-gray-300 hover:text-blue-700"
            >
              <Facebook fontSize="small" />
              <span>Facebook</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-1 text-gray-300 hover:text-blue-600"
            >
              <LinkedIn fontSize="small" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      <div class="text-center text-sm mt-6 border-t border-gray-700 pt-4">
        © 2025 Exam Repository System. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
