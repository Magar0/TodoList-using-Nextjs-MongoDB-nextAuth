"use client";
import { setUser } from "@/store/slices/user";
import {
  GithubOutlined,
  GoogleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useSearchParams();

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };
  const onSubmit = async (value) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/register", value);
      if (response.status === 201) {
        signIn("credentials", value);
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message);
      // setTimeout(() => setError(), 2500);
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3, "minimum 3 characters").required("Required"),
    email: Yup.string().email("Inavalid Email").required("Required"),
    password: Yup.string().min(4, "minimum 4 character").required("Required"),
  });

  // if (session) {
  //   router.push("/");
  // }
  return (
    <>
      <head>
        <title>Sign In</title>
      </head>
      <main className="flex h-[100%] w-screen items-center justify-center">
        <div className="rounded-xl bg-violet-200 px-5 pb-4 pt-6">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ setFieldValue }) => {
              const handleFormChange = (e) => {
                setFieldValue(e.target.name, e.target.value);
                console.log("changingg ");

                setError(null);
              };
              return (
                <Form className="flex flex-col gap-3">
                  <h1 className="text-center text-2xl font-semibold">
                    Create an account{" "}
                  </h1>
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="username"
                      className="text-xl text-slate-800"
                    >
                      Username:
                    </label>
                    <Field
                      autoFocus
                      type="username"
                      id="username"
                      name="username"
                      onChange={handleFormChange}
                      placeholder="Type your username"
                      className="rounded-xl border border-slate-400 px-5 py-2 text-lg"
                    />
                    <ErrorMessage name="username">
                      {(msg) => (
                        <div className="pl-2 text-sm text-red-500">{msg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-xl text-slate-800">
                      Email:
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      onChange={handleFormChange}
                      placeholder="Type your email"
                      className="rounded-xl border border-slate-400 px-5 py-2 text-lg"
                    />
                    <ErrorMessage name="email">
                      {(msg) => (
                        <div className="pl-2 text-sm text-red-500">{msg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="password"
                      className="text-xl text-slate-800"
                    >
                      Password:
                    </label>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      onChange={handleFormChange}
                      placeholder="Type your Password"
                      className="rounded-xl border border-slate-400 px-5 py-2 text-lg"
                    />
                    <ErrorMessage name="password">
                      {(msg) => (
                        <div className="pl-2 text-sm text-red-500">{msg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                  <div className="my-2 w-full">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-800 px-4 py-2 text-white shadow-md shadow-slate-500 hover:bg-blue-900"
                      disabled={loading}
                    >
                      Signup
                      {loading && <LoadingOutlined />}
                    </button>
                    {error && (
                      <p className="ml-1 mt-1 text-sm font-medium text-red-500">
                        {error}
                      </p>
                    )}
                  </div>
                </Form>
              );
            }}
          </Formik>
          {/* Github and google button */}
          <button
            className="my-2 flex w-full items-center justify-center rounded-lg bg-slate-700 px-4 py-2 text-white hover:bg-slate-900"
            onClick={() => {
              signIn("github");
            }}
          >
            <GithubOutlined className="mr-2" />
            Sign Up Using Github
          </button>
          <button
            className="my-2 flex w-full items-center justify-center rounded-lg border border-slate-400 px-4 py-2 hover:bg-slate-200"
            onClick={() => {
              signIn("google");
            }}
          >
            <GoogleOutlined className="mr-2 text-blue-600" />
            Sign Up Using Google
          </button>
          <p className="text-center">
            Already have an account?{" "}
            <span
              className="cursor-pointer text-blue-700"
              onClick={() => router.push("/login")}
            >
              signin
            </span>
          </p>
        </div>
      </main>
    </>
  );
};

export default Signup;
