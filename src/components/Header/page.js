import React, { useCallback } from "react";
import NextLink from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/app/redux/actions/authAcion";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { setIsLoggedIn } from "@/app/redux/slices/authSlice";

export default function Header() {
  const dispatch = useDispatch();
  const [isTocken, setIsToken] = React.useState(false);
  const router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.auth);

  console.log(isLoggedIn, "isLoggedIn");

  // const isLoggedIn = useSelector((state) => state.auth);

  const token = typeof window !== "undefined" && localStorage.getItem("accessToken");

  React.useEffect(() => {
    console.log(token, "token");

    if (token) {
      setIsToken(true);
      dispatch(setIsLoggedIn(true));
    } else {
      setIsToken(false);
      dispatch(setIsLoggedIn(false));
    }
  }, [token]);

  // const handleLogedOut = () => {
  //   dispatch(logoutUser()).then((res) => {
  //     toast.success("Logout Successfully");
  //     router.push("/auth/login");
  //   });
  // };
  const handleLogedOut = useCallback(() => {
    dispatch(logoutUser()).then((res) => {
      toast.success("Logout Successfully");
      router.push("/auth/login");
      setIsToken(false);
      dispatch(setIsLoggedIn(false));
    });
  }, [isTocken]);

  return (
    <nav className="bg-gray-900 border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NextLink href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">PMS Service</span>
        </NextLink>
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NextLink
                href="/"
                className="block py-2 px-3 text-white  rounded md: md:p-0   md:dark:bg-transparent"
                aria-current="page"
              >
                Home
              </NextLink>
            </li>
            <li>
              <NextLink
                href="/Service"
                className="block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 text-white "
              >
                Services
              </NextLink>
            </li>
            <li>
              <NextLink
                href="/Pricing"
                className="block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 text-white "
              >
                Pricing
              </NextLink>
            </li>
            {isLoggedIn ? (
              <li>
                <button
                  onClick={() => handleLogedOut()}
                  className="block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 text-white "
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <NextLink
                  href="/auth/login"
                  className="block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0  md:p-0 text-white "
                >
                  Login
                </NextLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
