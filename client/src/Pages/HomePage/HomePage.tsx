const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-cover bg-center">
      <div className="flex flex-col items-center justify-center min-h-screen text-font text-center bg-transparent bg-opacity-50">
        <h1 className="text-4xl md:text-6xl font-bold">BARBERBOOK</h1>
        <p className="text-lg md:text-2xl mt-4">
          BARBERSHOP SCHEDULING STYLED TO THE POINT
        </p>
        <button className="mt-6 bg-light text-font px-6 py-3 rounded-lg text-lg hover:bg-mid cursor-pointer">
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default HomePage;
