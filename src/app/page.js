"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import Users from "../../components/Users/page";

export default function Home() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = "/auth/login";
    }
  }, [isLoggedIn]);

  return (
    <>
      <Users />
    </>
  );
}
