import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { CATEGORIES, TRANSLATIONS } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { getProductInsight } from '../geminiService';

const HomePage: React.FC = () => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];
  const navigate = useNavigate();

  const [selectedCatId, setSelectedCatId] = useState<string>('');
  const [selectedCropId, setSelectedCropId] = useState<string>('');
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const currentCategory = CATEGORIES.find(c => c.id === selectedCatId);
  const currentCrop = currentCategory?.crops.find(c => c.id === selectedCropId);
  const currentProduct = currentCrop?.products.find(p => p.id === selectedProductId);

  const handleSeeDetails = async () => {
    if (currentCategory && currentCrop && currentProduct) {
      setLoading(true);
      // We can pre-fetch insight here or in the detail page.
      // Since the original app fetched it here, we might want to pass it via state or fetch it in detail page.
      // Fetching in detail page is cleaner for deep linking.
      // So detailed page will handle fetching.
      setLoading(false);
      navigate(`/product/${selectedCatId}/${selectedCropId}/${selectedProductId}`);
    }
  };

  return (
    <>
      {/* Hero Section - Search View */}
      <section className="relative h-64 md:h-96 flex flex-col justify-center items-center text-center px-4 overflow-hidden">
        <img 
          src="https://imaxims.com/himalaya-hybrid/assets/image/home_bg.jpg" 
          alt="Lush Vegetables" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
        />
        <div className="relative z-10 text-white animate-slide-up">
          <div className="h-0.5 w-16 bg-[#8cc63f] mx-auto mb-4"></div>
          <h1 className="text-2xl md:text-5xl font-bold mb-2 uppercase drop-shadow-lg tracking-wider">{t.findCatalog}</h1>
          <div className="h-0.5 w-16 bg-[#8cc63f] mx-auto mt-4 mb-6"></div>
          <p className="text-xs md:text-lg max-w-lg mx-auto opacity-90 font-sans tracking-normal font-light">
            {t.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Catalog Selector Section */}
      <main className="flex-grow bg-gray-50 -mt-10 md:-mt-20 relative z-20 px-4 pb-20">
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-2xl p-6 md:p-10 border-t-8 border-[#2d5a27] mt-12">
          <h2 className="text-2xl md:text-3xl text-center font-bold mb-8 text-[#2d5a27] uppercase tracking-normal">{t.findCatalog}</h2>
          
          <div className="space-y-6">
            <div className="group">
              <label className="block text-gray-500 font-sans font-semibold mb-2 ml-1 text-sm">{t.selectCategory}</label>
              <select 
                className="w-full border-2 border-gray-100 rounded-lg py-3 px-4 focus:border-[#8cc63f] focus:ring-0 transition-all bg-gray-50 font-sans text-gray-800"
                value={selectedCatId}
                onChange={(e) => {
                  setSelectedCatId(e.target.value);
                  setSelectedCropId('');
                  setSelectedProductId('');
                }}
              >
                <option value="">-- {t.selectCategory} --</option>
                {CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="group">
              <label className="block text-gray-500 font-sans font-semibold mb-2 ml-1 text-sm">{t.selectCrop}</label>
              <select 
                disabled={!selectedCatId}
                className="w-full border-2 border-gray-100 rounded-lg py-3 px-4 focus:border-[#8cc63f] focus:ring-0 transition-all bg-gray-50 font-sans text-gray-800 disabled:bg-gray-200 disabled:cursor-not-allowed"
                value={selectedCropId}
                onChange={(e) => {
                  setSelectedCropId(e.target.value);
                  setSelectedProductId('');
                }}
              >
                <option value="">-- {t.selectCrop} --</option>
                {currentCategory?.crops.map(crop => (
                  <option key={crop.id} value={crop.id}>{crop.name}</option>
                ))}
              </select>
            </div>

            <div className="group">
              <label className="block text-gray-500 font-sans font-semibold mb-2 ml-1 text-sm">{t.selectProduct}</label>
              <select 
                disabled={!selectedCropId}
                className="w-full border-2 border-gray-100 rounded-lg py-3 px-4 focus:border-[#8cc63f] focus:ring-0 transition-all bg-gray-50 font-sans text-gray-800 disabled:bg-gray-200 disabled:cursor-not-allowed"
                value={selectedProductId}
                onChange={(e) => {
                  setSelectedProductId(e.target.value);
                }}
              >
                <option value="">-- {t.selectProduct} --</option>
                {currentCrop?.products.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <button 
              disabled={!selectedProductId || loading}
              onClick={handleSeeDetails}
              className="cursor-pointer w-full bg-[#2d5a27] hover:bg-[#1e3d1a] text-white py-4 rounded-lg font-bold text-xl transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : null}
              {t.seeDetails}
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
