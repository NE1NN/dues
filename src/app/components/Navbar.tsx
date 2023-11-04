import Login from "./Login";

export default function Navbar() {
  return (
    <nav className="bg-green-600 px-4 py-2 font-bold text-green-900 text-3xl flex items-center">
      Dues
      <Login></Login>
    </nav>
  );
}
