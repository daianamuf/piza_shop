import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ pizzas, user }) {
    return (
        <AuthenticatedLayout>
            <div style={{ height: "500px" }}>
                <h1 className="mb-8  text-xl font-semibold md:text-3xl">
                    The best pizza.
                    <br />
                    <span className="text-yellow-500">
                        Straight out of the oven, straight to you.
                    </span>
                </h1>
                <div>
                    {user ? (
                        <span>Welcome, {user.name}!</span>
                    ) : (
                        <a href="/login" className="text-blue-500">
                            Login
                        </a>
                    )}
                </div>

                <div className="divide-y divide-stone-200 px-2">
                    {pizzas.map((pizza) => (
                        <div key={pizza.id} className="flex gap-4 py-2">
                            <img
                                src={
                                    pizza.image_url ||
                                    "https://via.placeholder.com/150"
                                }
                                alt={pizza.name}
                                className="h-24"
                            />
                            <div className="flex grow flex-col pt-1">
                                <h3 className="font-medium">{pizza.name}</h3>
                                <p className="text-sm capitalize italic text-stone-500">
                                    {pizza.ingredients}
                                </p>
                                <p className="text-sm">${pizza.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
