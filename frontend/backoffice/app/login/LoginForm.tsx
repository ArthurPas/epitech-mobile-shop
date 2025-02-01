"use client";
import token from "@/lib/token";
import { jwtConstants } from "@/utils/jwt";
import { postLogin } from "@/lib/repositories/users/usersRepositories";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
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
        router.refresh();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <form onSubmit={onLogin} className="w-full max-w-sm mx-auto mt-8 p-4 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      <fieldset className="mb-4">
      <input
      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      <fieldset className="mb-4">
      <input
      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      Log in
      </button>
    </form>
  );
}
