"use client";
import token from "@/lib/token";
import { jwtConstants } from "@/utils/jwt";
import { postLogin } from "@/lib/repositories/users/usersRepositories";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [signIndata, onChangeSignInData] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();

  const onLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postLogin(signIndata)
      .then((res) => {
        token.setToken(jwtConstants.key, res.data.access_token);
        router.push("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <form onSubmit={onLogin} className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <fieldset className="form-group mb-4">
      <input
        className="form-control form-control-lg w-full p-3 border border-gray-300 rounded-md"
        type="text"
        placeholder="Username"
        name="username"
        value={signIndata.username}
        onChange={(e) =>
        onChangeSignInData((values) => ({
          ...values,
          [e.target.name]: e.target.value,
        }))
        }
      />
      </fieldset>
      <fieldset className="form-group mb-4">
      <input
        className="form-control form-control-lg w-full p-3 border border-gray-300 rounded-md"
        type="password"
        placeholder="Password"
        autoComplete="off"
        name="password"
        value={signIndata.password}
        onChange={(e) =>
        onChangeSignInData((values) => ({
          ...values,
          [e.target.name]: e.target.value,
        }))
        }
      />
      </fieldset>
      <button type="submit" className="btn btn-lg btn-primary w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
      Log in
      </button>
    </form>
  );
}
