import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PiCheckCircleFill, PiMoney, PiUser, PiEnvelopeSimple, PiArrowRight, PiArrowLeft, PiCopy, PiBank, PiTShirt, PiClock, PiWarningCircle } from 'react-icons/pi';

const DonationPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // State variables
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes for mock countdown
  const [isPolling, setIsPolling] = useState(false);
  const [showResumePrompt, setShowResumePrompt] = useState(false);

  const presetAmounts = [10000, 50000, 100000, 500000];

  // Resume Pending Donation Logic
  useEffect(() => {
    const savedDonation = localStorage.getItem('pendingDonation');
    if (savedDonation && step === 1) {
      setShowResumePrompt(true);
    }
  }, [step]);

  const resumeDonation = () => {
    const saved = JSON.parse(localStorage.getItem('pendingDonation'));
    if (saved) {
      setAmount(saved.amount);
      setCustomAmount(saved.customAmount || '');
      setName(saved.name);
      setEmail(saved.email);
      setPaymentMethod(saved.paymentMethod);
      setTransactionId(saved.transactionId);
      setStep(saved.step > 1 ? saved.step : 2);
      setShowResumePrompt(false);
    }
  };

  const removePendingDonation = () => {
    localStorage.removeItem('pendingDonation');
    setShowResumePrompt(false);
  };

  const savePendingDonation = (newStep, updates = {}) => {
    const currentData = {
      amount,
      customAmount,
      name,
      email,
      paymentMethod,
      transactionId,
      step: newStep,
      ...updates
    };
    localStorage.setItem('pendingDonation', JSON.stringify(currentData));
  };

  // Timer Logic for Step 3
  useEffect(() => {
    if (step === 3 && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (step === 3 && timeLeft === 0) {
      // Payment expired logic
    }
  }, [step, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const rp = (n) => 'Rp ' + parseInt(n || 0).toLocaleString('id-ID');

  const selectedAmount = amount === 'custom' ? customAmount : amount;

  const handleNext = () => {
    const nextStep = step + 1;
    setStep(nextStep);
    
    // If moving to step 3, generate transaction ID
    if (nextStep === 3 && !transactionId) {
      const generatedTx = 'DON-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      setTransactionId(generatedTx);
      savePendingDonation(nextStep, { transactionId: generatedTx });
      setTimeLeft(900); // Reset timer to 15 mins
    } else {
      savePendingDonation(nextStep);
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
    savePendingDonation(step - 1);
  };

  const simulatePaymentVerification = () => {
    setIsPolling(true);
    setTimeout(() => {
      setIsPolling(false);
      handleNext(); // Move to Step 4 Success
      localStorage.removeItem('pendingDonation'); // Clear session
    }, 2500);
  };

  // Step 1: Amount & Info
  const renderStep1 = () => (
    <div className="animate-fade-in">
      {showResumePrompt && (
        <div className="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <PiWarningCircle size={24} className="text-amber-500" />
            <div>
              <p className="font-bold text-slate-800">Anda memiliki donasi yang tertunda</p>
              <p className="text-sm text-slate-600">Lanjutkan transaksi sebelumnya?</p>
            </div>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button onClick={removePendingDonation} className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100 rounded-lg transition-colors w-full md:w-auto">Hapus</button>
            <button onClick={resumeDonation} className="px-4 py-2 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 shadow-md shadow-amber-500/20 rounded-lg transition-colors w-full md:w-auto">Lanjutkan</button>
          </div>
        </div>
      )}

      {id && (
        <div className="mb-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
            <PiUser size={24} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-500">Mendonasikan untuk program:</p>
            <p className="text-lg font-extrabold text-slate-900 leading-tight">Program Kemanusiaan #{id}</p>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Pilih Nominal Donasi</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {presetAmounts.map((val) => (
          <button
            key={val}
            onClick={() => {
              // Jika di klik lagi, batalkan pilihan. Jika klik yang baru, ubah.
              if (amount === val) {
                setAmount('');
              } else {
                setAmount(val);
                setCustomAmount(''); // Clear custom amount if preset is selected
              }
            }}
            className={`py-3 rounded-xl font-bold transition-all border-2 ${
              amount === val
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm'
                : 'border-slate-100 bg-white text-slate-500 hover:border-emerald-200'
            }`}
          >
            {rp(val)}
          </button>
        ))}
      </div>

      <div className="mb-8">
        <label className="block text-sm font-bold text-slate-700 mb-2">Atau masukkan nominal lain</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className={`font-bold ${amount !== 'custom' && amount !== '' ? 'text-slate-300' : 'text-slate-500'}`}>Rp</span>
          </div>
          <input
            type="number"
            value={customAmount}
            disabled={amount !== 'custom' && amount !== ''} // Disabled if a preset is selected
            onChange={(e) => {
              setAmount('custom');
              setCustomAmount(e.target.value);
            }}
            placeholder={amount !== 'custom' && amount !== '' ? "Hapus pilihan di atas untuk input manual" : "0"}
            className={`w-full pl-12 pr-4 py-3 bg-slate-50 border-2 rounded-xl focus:outline-none focus:border-emerald-500 font-bold text-slate-900 transition-colors ${
              amount !== 'custom' && amount !== '' ? 'border-slate-100 text-slate-400 bg-slate-100 cursor-not-allowed' : 'border-slate-200'
            }`}
          />
        </div>
      </div>

      <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Data Diri</h2>
      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <PiUser className="text-slate-400" />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama Anda"
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-emerald-500 font-bold text-slate-900 transition-colors"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Email / No WhatsApp</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <PiEnvelopeSimple className="text-slate-400" />
            </div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email atau No WA (untuk bukti donasi)"
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-emerald-500 font-bold text-slate-900 transition-colors"
            />
          </div>
        </div>
      </div>

      <button
        disabled={!selectedAmount || !name || !email}
        onClick={handleNext}
        className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
      >
        Lanjutkan Pembayaran <PiArrowRight />
      </button>
    </div>
  );

  // Step 2: Confirmation
  const renderStep2 = () => (
    <div className="animate-fade-in text-center">
      <button onClick={handlePrev} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold mb-6 transition-colors">
        <PiArrowLeft /> Kembali
      </button>
      
      <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <PiMoney size={40} />
      </div>

      <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Konfirmasi Donasi</h2>
      <p className="text-slate-500 mb-8">Pembayaran akan menggunakan metode <b>QRIS Otomatis</b>.</p>

      <div className="bg-slate-50 p-6 rounded-2xl mb-8 space-y-3 border border-slate-100 text-left">
        <div className="flex justify-between items-center">
          <span className="text-slate-400 font-bold text-xs uppercase">Nama Donatur</span>
          <span className="font-bold text-slate-800">{name}</span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-slate-200/50">
          <span className="text-slate-400 font-bold text-xs uppercase">Total Donasi</span>
          <span className="text-xl font-extrabold text-emerald-600">{rp(selectedAmount)}</span>
        </div>
      </div>

      <button
        onClick={() => {
          setPaymentMethod('qris');
          handleNext();
        }}
        className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
      >
        Lanjutkan ke QRIS <PiArrowRight />
      </button>

      <p className="mt-4 text-[10px] text-slate-400 font-medium">Dengan menekan tombol di atas, Anda menyetujui syarat dan ketentuan donasi FundUnity.</p>
    </div>
  );

  // Step 3: Payment Instruction
  const renderStep3 = () => (
    <div className="animate-fade-in text-center">
      <div className="flex justify-between items-start mb-6 text-left">
        <div>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-1">ID Transaksi</p>
          <p className="font-extrabold text-slate-900">{transactionId || 'Menunggu...'}</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 text-amber-600 px-3 py-1.5 rounded-lg flex items-center gap-2 shrink-0">
          <PiClock size={16} />
          <span className="font-bold text-sm">{formatTime(timeLeft)}</span>
        </div>
      </div>

      <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Pindai QRIS</h2>
      <p className="text-slate-500 mb-8 max-w-sm mx-auto">Silakan scan kode QR di bawah menggunakan aplikasi pembayaran Anda.</p>

      <div className="bg-white border-2 border-slate-100 rounded-3xl p-8 mb-8 inline-block shadow-2xl shadow-slate-200/50 relative">
        <div className="w-56 h-56 bg-white mx-auto flex items-center justify-center rounded-2xl border-4 border-slate-50 mb-3 overflow-hidden relative">
          {/* Simulasi Logo QRIS di Tengah atau Dekorasi */}
          <div className="absolute inset-0 bg-slate-50 flex items-center justify-center">
             <div className="grid grid-cols-4 gap-1 opacity-20 group-hover:opacity-40 transition-opacity">
               {[...Array(16)].map((_, i) => <div key={i} className="w-8 h-8 bg-slate-900 rounded-sm"></div>)}
             </div>
          </div>
          <div className="z-10 bg-white p-3 rounded-xl shadow-lg border border-slate-100">
             <p className="text-[10px] font-black text-slate-900">QRIS CODE</p>
          </div>
        </div>
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Berlaku untuk semua e-wallet & bank</p>
      </div>

      <div className="flex justify-between items-center border-t border-slate-100 pt-6 mb-8">
        <span className="text-slate-500 font-bold">Total Pembayaran</span>
        <span className="text-2xl font-extrabold text-emerald-600">{rp(selectedAmount)}</span>
      </div>

      {timeLeft === 0 ? (
        <button
          onClick={() => { setStep(1); removePendingDonation(); }}
          className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-lg shadow-slate-900/20"
        >
          Waktu Habis, Ulangi Donasi
        </button>
      ) : (
        <button
          disabled={isPolling}
          onClick={simulatePaymentVerification}
          className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
        >
          {isPolling ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Memverifikasi Pembayaran...
            </>
          ) : (
            "Selesaikan Donasi"
          )}
        </button>
      )}
    </div>
  );

  // Step 4: Success
  const renderStep4 = () => (
    <div className="animate-fade-in text-center py-8">
      <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <PiCheckCircleFill size={48} />
      </div>
      <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Terima Kasih, {name}!</h2>
      <p className="text-slate-500 mb-6 max-w-sm mx-auto leading-relaxed">
        Donasi Anda sebesar <span className="font-bold text-slate-700">{rp(selectedAmount)}</span> telah berhasil diverifikasi.
      </p>

      <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100 text-left">
        <h4 className="font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Rincian Transaksi</h4>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">ID Transaksi</span>
            <span className="font-bold text-slate-700">{transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Metode</span>
            <span className="font-bold text-slate-700">QRIS (Otomatis)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Waktu</span>
            <span className="font-bold text-slate-700">{new Date().toLocaleString('id-ID')}</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-200 text-xs text-slate-500">
          Tanda terima dan link live tracking program telah dikirim ke <b>{email}</b>. Terima kasih atas kepedulian Anda.
        </div>
      </div>

      <button
        onClick={() => navigate('/landing/allprograms')}
        className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-lg shadow-slate-900/20"
      >
        Kembali ke Beranda
      </button>
    </div>
  );

  const renderSteps = () => {
    switch (step) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return renderStep1();
    }
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-6">
      {/* ProgressBar */}
      {step < 4 && (
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-3">
            {[1, 2, 3].map((i) => (
              <React.Fragment key={i}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                  step >= i ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-slate-100 text-slate-400'
                }`}>
                  {i}
                </div>
                {i < 3 && (
                  <div className={`w-12 h-1 rounded-full transition-colors ${
                    step > i ? 'bg-emerald-500' : 'bg-slate-100'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Form Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-100 relative overflow-hidden">
        {renderSteps()}
      </div>
    </div>
  );
};

export default DonationPage;
