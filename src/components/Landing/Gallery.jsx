import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

// Dummy fallback images (gambar sudah ada di assets)
import img1 from "../../assets/LandingAssets/images/image1.jpg";
import img2 from "../../assets/LandingAssets/images/image2.jpg";
import img3 from "../../assets/LandingAssets/images/image3.jpg";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { id: "f1", imageUrl: img1, title: "Momen Kebersamaan" },
    { id: "f2", imageUrl: img2, title: "Aksi Sosial" },
    { id: "f3", imageUrl: img3, title: "Program Komunitas" },
  ];

  return (
    <section className="py-20 px-6 md:px-12 bg-white">

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1 rounded-full mb-4 tracking-wide uppercase">
            Galeri
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-900 mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Momen Kebersamaan Kami
          </h2>
          <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto mb-4" />
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Temukan cerita di balik setiap aksi nyata kami. Momen-momen ini mengingatkan kita tentang kekuatan komunitas.
          </p>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Video Block */}
          <div className="bg-white border border-gray-100 shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="relative w-full h-64">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/jKqTBpq_zfI?si=cWe0O6adm11kK5Tj"
                title="Video Program"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <div className="p-5">
              <h3 className="text-base font-bold text-blue-800" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Misi Kami dalam Gerakan
              </h3>
              <p className="text-gray-400 text-sm mt-1">Saksikan langsung bagaimana kami bekerja di lapangan.</p>
            </div>
          </div>

          {/* Info / CTA Block */}
          <div className="bg-blue-700 text-white rounded-2xl shadow-md p-8 flex flex-col justify-between">
            <div>
              <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
                Cerita Dampak
              </span>
              <h3 className="text-2xl font-extrabold mb-4 leading-snug" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Setiap Foto Menceritakan Perubahan Nyata
              </h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Perjalanan visual kami menunjukkan bagaimana tindakan kecil dapat menciptakan dampak besar. Bergabunglah dan jadilah bagian dari cerita ini.
              </p>
            </div>
            <NavLink
              to="/landing/gallery"
              className="mt-8 inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition"
            >
              Lihat Galeri Lengkap
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </NavLink>
          </div>

          {/* Photo Grid Block */}
          <div className="grid grid-cols-2 gap-3 content-start">
            {images.slice(0, 4).map((img, i) => (
              <div
                key={img.id || i}
                className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg cursor-pointer transition-all duration-300 h-32"
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img.imageUrl}
                  alt={img.title || `Galeri ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300 transition"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              className="w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
            {selectedImage.title && (
              <p className="mt-3 text-center text-gray-300 text-sm">{selectedImage.title}</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
