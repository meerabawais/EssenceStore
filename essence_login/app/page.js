import Link from "next/link";

export default function Home() {

    return (

        <div className="container text-center mt-5">

            <h1>Essence Store</h1>

            <Link
                href="/login"
                className="btn btn-dark me-3"
            >
                Login
            </Link>

            <Link
                href="/Signup"
                className="btn btn-outline-dark"
            >
                Signup
            </Link>

        </div>

    );

}