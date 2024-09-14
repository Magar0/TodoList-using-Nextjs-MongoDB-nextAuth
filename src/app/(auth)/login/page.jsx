"use client";
import {
  GithubOutlined,
  GoogleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [error, setError] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (value) => {
    // const response = await axios.post("/api/auth/signin", value);
    setLoading(true);
    try {
      const response = await signIn("credentials", {
        ...value,
        redirect: true,
        callbackUrl: "/dashboard",
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Inavalid Email").required("Required"),
    password: Yup.string().min(4, "minimum 4 character").required("Required"),
  });

  useEffect(() => {
    const err = searchParams.get("error");
    if (err) {
      err === "Callback" ? setError("User Not Found") : setError(err);
    }
  }, [searchParams]);
  return (
    <>
      <head>
        <title>Log In</title>
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
                setError(null); // Reset form errors on any field change
              };
              return (
                <Form className="flex flex-col gap-3">
                  <h1 className="text-center text-2xl font-semibold text-black">
                    Log In{" "}
                  </h1>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-xl text-slate-800">
                      Email:
                    </label>
                    <Field
                      autoFocus
                      type="email"
                      id="email"
                      name="email"
                      onChange={handleFormChange}
                      placeholder="Type your email"
                      className="rounded-xl border border-violet-400 px-5 py-2 text-lg"
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
                      className="rounded-xl border border-violet-400 px-5 py-2 text-lg"
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
                      Signin
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
          <button
            className="my-2 flex w-full items-center justify-center rounded-lg bg-slate-700 px-4 py-2 text-white hover:bg-slate-900"
            onClick={() => {
              signIn("github");
            }}
          >
            <GithubOutlined className="mr-2" />
            Sign In Using Github
          </button>
          <button
            className="my-2 flex w-full items-center justify-center rounded-lg border border-violet-400 px-4 py-2 hover:bg-violet-300"
            onClick={() => {
              signIn("google");
            }}
          >
            <GoogleOutlined className="mr-2 text-blue-600" />
            Sign In Using Google
          </button>
          <p className="text-center text-black">
            Don't have an account?{" "}
            <span
              className="cursor-pointer text-blue-700"
              onClick={() => router.push("/signup")}
            >
              Sign up
            </span>
          </p>
        </div>
      </main>
    </>
  );
};

export default SignInPage;
