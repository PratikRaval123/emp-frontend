"use client";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "@/app/redux/actions/authAcion";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import { setIsLoggedIn } from "@/app/redux/slices/authSlice";
import Loader from "../../../components/AnimationLoader/page";
export default function Login() {
  const { loading } = useSelector((state) => state.auth);
  console.log(loading, "loading")
  const dispatch = useDispatch();
  const router = useRouter();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),

    onSubmit: async (values, helpers) => {
      console.log(values);
      dispatch(loginUser(values)).then((res) => {
        console.log(res, "res");
        if (res?.error?.message === "Rejected") {
          toast.error("Rejected");
        } else {
          toast.success("Login Successfully");
          router.push("/");
          dispatch(setIsLoggedIn(true));
        }
      });
    },
  });

  return (
    <>
      <section className={`bg-gray-50 dark:bg-gray-900 `}>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[80vh] lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            PMS Service
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values?.email}
                    className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${formik.touched.email && formik.errors.email ? "border-red-500" : ""
                      }`}
                    placeholder="name@company.com"
                    required=""
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <span className="font-medium">Oops!</span> {formik.errors.email}
                    </p>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values?.password}
                    placeholder="••••••••"
                    className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${formik.touched.password && formik.errors.password ? "border-red-500" : ""
                      }`}
                    required=""
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <span className="font-medium">Oops!</span> {formik.errors.password}
                    </p>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
                <p className="text-sm font-light text-gray-500 ">
                  Don’t have an account yet?{" "}
                  <NextLink
                    href="/auth/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </NextLink>
                </p>
              </form>
            </div>
          </div>
        </div>
        {loading && (
          <Loader />
        )}
      </section>
      <ToastContainer />
    </>
  );
}
