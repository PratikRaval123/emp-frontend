"use client";

import "./globals.css";
import Header from "../../components/Header/page";
import Footer from "../../components/Footer/page";
import { Provider } from "react-redux";
import { createStore } from "@reduxjs/toolkit";
import reducer from "./redux/slices/authSlice";
import store from "./redux/store";

export default function RootLayout({ children }) {
  // const store = createStore(reducer)
  return (
    <html lang="en">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.css" rel="stylesheet" />
      </head>
      <body>
        <script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"></script>
        <Provider store={store}>
          <Header />
          {children}
          <Footer />
        </Provider>
      </body> 
    </html>
  );
}
