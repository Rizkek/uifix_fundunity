import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Programs() {
  const [programData, setProgramData] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch("https://backendd-fundunity.onrender.com/v1/content/program");
        const data = await res.json();
        setProgramData(data);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };
    fetchPrograms();
  }, []);

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1 rounded-full mb-4 tracking-wide uppercase">
            Program Kami
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-900 mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Program yang Kami Jalankan
          </h2>
          <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto mb-4" />
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Berbagai program nyata yang kami jalankan untuk menciptakan perubahan berkelanjutan bagi masyarakat.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {programData.slice(0, 6).map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative overflow-hidden h-48">
                {program.imageUrl ? (
                  <img
                    src={program.imageUrl}
                    alt={program.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <svg className="w-14 h-14 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-blue-900 font-bold text-lg mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {program.title}
                </h3>
                <p className="text-gray-500 flex-grow mb-5 leading-relaxed text-sm">
                  {program.description?.length > 100
                    ? `${program.description.slice(0, 100)}...`
                    : program.description}
                </p>
                <Link
                  to={`/program/${program.id}`}
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:text-blue-800 transition-colors group"
                >
                  Lihat Detail
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* All Programs CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/allprograms"
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-blue-700 text-blue-700 font-semibold rounded-xl hover:bg-blue-700 hover:text-white transition-all duration-300"
          >
            Lihat Semua Program
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Programs;
