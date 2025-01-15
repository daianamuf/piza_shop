import React from "react";
import { Link } from "@inertiajs/react";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <h1 className="text-4xl font-bold mb-6">
                Welcome to the Pizza Shop!
            </h1>
            <p className="mb-8 text-gray-600">
                Please log in or create an account to get started.
            </p>
            <div className="space-x-4">
                <Link
                    href={route("login")}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
                >
                    Login
                </Link>
                <Link
                    href={route("register")}
                    className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
                >
                    Create Account
                </Link>
            </div>
        </div>
    );
}
