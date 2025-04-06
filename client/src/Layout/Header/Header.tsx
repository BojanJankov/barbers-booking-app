import Navbar from "../../Components/Navbar/Navbar";

function Header() {
  return (
    <section className="flex items-center justify-between h-20 bg-transparent p-6">
      <div className="text-white text-2xl font-bold">
        <h1>BarberBook</h1>
      </div>
      <Navbar />
      <div>
        <button className="bg-gray-800 hover:bg-gray-700 cursor-pointer text-white px-4 py-2 rounded-md">
          Register
        </button>
      </div>
    </section>
  );
}

export default Header;
