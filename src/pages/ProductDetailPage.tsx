import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Info, Spade, Leaf, Shovel, Droplets, Globe } from 'lucide-react';
import { CATEGORIES, CULTIVATION_GUIDES } from '../constants';
import { getProductInsight } from '../geminiService';

const ProductDetailPage: React.FC = () => {
  const { catId, cropId, prodId } = useParams();
  const navigate = useNavigate();
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const currentCategory = CATEGORIES.find(c => c.id === catId);
  const currentCrop = currentCategory?.crops.find(c => c.id === cropId);
  const currentProduct = currentCrop?.products.find(p => p.id === prodId);
  const currentGuide = cropId ? CULTIVATION_GUIDES[cropId] : null;

  useEffect(() => {
    const fetchInsight = async () => {
      if (currentCategory && currentCrop && currentProduct) {
        setLoading(true);
        try {
          const text = await getProductInsight(currentCategory.name, currentCrop.name, currentProduct.name);
          setInsight(text || '');
        } catch (error) {
          console.error("Failed to fetch insight", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchInsight();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentCategory, currentCrop, currentProduct]);

  if (!currentProduct) {
      return (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
              <h2 className="text-2xl text-red-600 font-bold mb-4">Product Not Found</h2>
              <button 
                onClick={() => navigate('/')}
                className="bg-[#2d5a27] text-white px-6 py-2 rounded-lg"
              >
                  Go Home
              </button>
          </div>
      );
  }

  return (
    <main className="flex-grow animate-slide-up pb-20">
      {/* Detailed Header */}
      <header className="bg-[#2d5a27] text-white pt-8 pb-16 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-[#8cc63f] font-sans font-bold mb-6 hover:translate-x-[-4px] transition-transform"
          >
            <ArrowLeft size={20} />
            <span>Back to Search</span>
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            <div className="flex-grow">
               <p className="text-[#8cc63f] font-sans font-bold uppercase tracking-widest text-sm mb-1">{currentCrop?.name}</p>
               <h1 className="text-4xl md:text-6xl font-bold uppercase">{currentProduct?.name}</h1>
            </div>
            <div className="shrink-0">
               <div className="bg-[#8cc63f] text-[#2d5a27] px-4 py-2 rounded-full font-bold text-sm inline-block shadow-lg">
                  PREMIUM HYBRID
               </div>
            </div>
          </div>
        </div>
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      </header>

      <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-20">
        {/* AI Insights Summary */}
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border-l-8 border-[#8cc63f] mb-8 min-h-[100px]">
          <h2 className="text-2xl font-bold text-[#2d5a27] mb-4 flex items-center gap-3">
            <Info size={24} className="text-[#8cc63f]" />
            Agronomist Insights
          </h2>
          {loading ? (
             <p className="text-gray-500 animate-pulse">Loading AI insights...</p>
          ) : (
            <div className="font-sans text-gray-700 leading-relaxed text-lg italic prose prose-green max-w-none">
              {insight}
            </div>
          )}
        </div>

        {/* Dynamic Cultivation Details */}
        {currentGuide ? (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-[#2d5a27] text-center uppercase tracking-wider mb-6">Cultivation Guide</h2>
            
            {/* Nursery or Direct Sowing Card */}
            {currentGuide.nursery ? (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="bg-[#f0f9eb] px-6 py-4 border-b border-[#e1f3d8] flex items-center gap-3">
                  <Spade className="text-[#2d5a27]" />
                  <h3 className="text-xl font-bold text-[#2d5a27] uppercase">{currentGuide.nursery.title}</h3>
                </div>
                <div className="p-6 md:p-8">
                  <ul className="space-y-4">
                    {currentGuide.nursery.points.map((point, idx) => (
                      <li key={idx} className="flex gap-3 font-sans text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#8cc63f] mt-2 shrink-0"></div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : currentGuide.directSowing ? (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="bg-[#f0f9eb] px-6 py-4 border-b border-[#e1f3d8] flex items-center gap-3">
                  <Leaf className="text-[#2d5a27]" />
                  <h3 className="text-xl font-bold text-[#2d5a27] uppercase">{currentGuide.directSowing.title}</h3>
                </div>
                <div className="p-6 md:p-8">
                  <ul className="space-y-4">
                    {currentGuide.directSowing.points.map((point, idx) => (
                      <li key={idx} className="flex gap-3 font-sans text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#8cc63f] mt-2 shrink-0"></div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}

            {/* Land Prep Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-[#f0f9eb] px-6 py-4 border-b border-[#e1f3d8] flex items-center gap-3">
                <Shovel className="text-[#2d5a27]" />
                <h3 className="text-xl font-bold text-[#2d5a27] uppercase">{currentGuide.landPrep.title}</h3>
              </div>
              <div className="p-6 md:p-8">
                <ul className="space-y-4">
                  {currentGuide.landPrep.points.map((point, idx) => (
                    <li key={idx} className="flex gap-3 font-sans text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#8cc63f] mt-2 shrink-0"></div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Generic Maintenance Accent */}
            <div className="bg-[#2d5a27] text-white p-6 rounded-xl flex flex-col md:flex-row items-center gap-6 shadow-xl">
              <div className="p-4 bg-white/10 rounded-full shrink-0">
                <Droplets size={40} className="text-[#8cc63f]" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1 uppercase tracking-wider">Expert Management Tip</h4>
                <p className="font-sans text-white/90">Regular monitoring for pests and diseases like Whiteflies or Powdery Mildew is essential. Always use clean irrigation water and balanced NPK fertilizer for maximum {currentCrop?.name} yield.</p>
              </div>
            </div>
          </div>
        ) : (
          /* Fallback for crops without specific guides */
          <div className="bg-gray-50 p-12 rounded-xl border-2 border-dashed border-gray-200 text-center">
            <Globe className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500 font-sans italic">Detailed cultivation guide for {currentCrop?.name} is being prepared by our agronomists. For urgent support, please use the contact info below.</p>
          </div>
        )}
        
        <button 
          onClick={() => navigate('/')}
          className="mt-12 w-full max-w-xs mx-auto block bg-gray-100 hover:bg-gray-200 text-gray-700 font-sans font-bold py-4 rounded-lg transition-colors text-center shadow-sm"
        >
          Back to Catalog Search
        </button>
      </div>
    </main>
  );
};

export default ProductDetailPage;
