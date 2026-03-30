import React, { useEffect, useState } from "react";
import partner1 from "../../assets/LandingAssets/images/partner1.png";
import partner2 from "../../assets/LandingAssets/images/partner2.png";
import partner3 from "../../assets/LandingAssets/images/partner3.png";
import partner4 from "../../assets/LandingAssets/images/partner4.png";
import partner5 from "../../assets/LandingAssets/images/partner5.png";
import partner6 from "../../assets/LandingAssets/images/partner6.png";

const DUMMY_PARTNERS = [
  { name: "Mitra Sejati", logo: partner1 },
  { name: "Komunitas Peduli", logo: partner2 },
  { name: "Yayasan Bersama", logo: partner3 },
  { name: "Relawan Nusantara", logo: partner4 },
  { name: "Forum Indonesia", logo: partner5 },
  { name: "Kolaborasi ID", logo: partner6 },
];

const API_BASE_URL = "https://backendd-fundunity.onrender.com/v1/content/ourpartner";

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await fetch(API_BASE_URL);
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        const formatted = data.map((item) => ({
          name: item.name,
          logo: item.imageUrl || null,
        }));
        setPartners(formatted.length > 0 ? formatted : DUMMY_PARTNERS);
      } catch {
        setPartners(DUMMY_PARTNERS);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  return (
    <section className="py-20 bg-white border-t border-slate-100 overflow-hidden" id="mitra">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-bold text-slate-400 tracking-widest uppercase mb-2">Didukung Oleh</p>
          <h2 className="text-3xl font-extrabold text-slate-900">Kolaborator Kebaikan</h2>
        </div>

        {loading ? (
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-12 w-32 bg-slate-200 animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 hover:opacity-100 transition-opacity duration-500">
            {partners.map((partner, i) => (
              <div key={i} className="group relative flex flex-col items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-10 md:h-12 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="h-10 md:h-12 flex items-center justify-center font-bold text-slate-400 text-xl tracking-tighter">
                    {partner.name}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Partners;
