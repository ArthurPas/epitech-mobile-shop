"use client"
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { jwtConstants } from "@/utils/jwt";
import token from "@/lib/token";
import { postLogout } from "@/lib/repositories/users/usersRepositories";
import { useRouter } from "next/navigation";

function Navbar() {
    const isLoggedIn = token.getToken(jwtConstants.key);
    const router = useRouter();
    const logout = () => {
        token.removeToken(jwtConstants.key);
        postLogout();
        router.push("/login");
        router.refresh();
    }

    return (
        <div className="bg-[#82bd69] p-4 flex justify-between items-center">
            <nav className="flex justify-between items-center w-full">
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/">
                            <p className="text-white hover:text-green-200 transition duration-1000 ease-in-out">
                                Home
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/products">
                            <p className="text-white hover:text-green-200 transition duration-300 ease-in-out">
                                Products
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/users">
                            <p className="text-white hover:text-green-200 transition duration-300 ease-in-out">
                                Users
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/kpi">
                            <p className="text-white hover:text-green-200 transition duration-300 ease-in-out">
                                KPI
                            </p>
                        </Link>
                    </li>
                </ul>
                <div className="flex space-x-4">
                    {isLoggedIn ? (
                        <Button variant="outline" onClick={logout}>Logout</Button>
                    ) : (
                        <Link href="/login">
                            <Button variant="outline">Login</Button>
                        </Link>
                    )}
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
