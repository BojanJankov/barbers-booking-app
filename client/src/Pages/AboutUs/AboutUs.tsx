const AboutUs = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          About Us
        </h1>
        <p className="text-lg md:text-2xl text-white leading-relaxed">
          Welcome to <span className="font-bold">Barber Booking App</span> –
          your ultimate destination for hassle-free barber appointments. Our
          platform connects skilled barbers with clients who value style and
          convenience. Whether you're looking for a fresh cut, a beard trim, or
          a full grooming session, we make booking easy, fast, and reliable.
        </p>
        <p className="text-lg md:text-2xl text-white leading-relaxed mt-6">
          With a few clicks, you can find top-rated barbers, check their
          availability, and schedule your next visit. Say goodbye to long
          waiting times and hello to a seamless barbering experience.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
