import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';

const Home = () => {
  const { t } = useTranslation('home');

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* 导航栏 */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black bg-opacity-80 backdrop-blur-md">
      
        <button className="md:hidden text-neonGreen focus:outline-none">
          {/* 移动端菜单按钮 */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
          </svg>
        </button>
      </header>
      <Navbar />
      {/* 主视觉区域 */}
      <section className="pt-32 pb-16 flex flex-col items-center text-center px-6 bg-black">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-neonGreen to-neonBlue">
          {t('welcome')}
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mb-8">
          {t('description')}
        </p>
        <button className="px-8 py-3 bg-neonGreen text-black font-semibold rounded-full shadow-lg hover:shadow-neonGreen transition-all duration-300">
          {t('start_exploring')}
        </button>
        {/* 向下箭头 */}
        <div className="mt-16 animate-bounce">
          <svg className="w-8 h-8 text-neonGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* 功能简介区域 */}
      <section id="features" className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-neonGreen">
            {t('features')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* 功能卡片 */}
            <div id="feature1" className="bg-gray-800 bg-opacity-80 p-8 rounded-lg text-center hover:shadow-2xl transition-shadow duration-300">
              <div className="flex justify-center mb-6">
                {/* <img src="/icons/feature1.svg" alt="Feature 1" className="w-20 h-20" /> */}
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-neonBlue">
                {t('feature1_title')}
              </h3>
              <p className="text-gray-300">
                {t('feature1_description')}
              </p>
            </div>
            {/* 其他功能卡片 */}
            <div id="feature2" className="bg-gray-800 bg-opacity-80 p-8 rounded-lg text-center hover:shadow-2xl transition-shadow duration-300">
              <div className="flex justify-center mb-6">
                {/* <img src="/icons/feature2.svg" alt="Feature 2" className="w-20 h-20" /> */}
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-neonBlue">
                {t('feature2_title')}
              </h3>
              <p className="text-gray-300">
                {t('feature2_description')}
              </p>
            </div>
            <div id="feature3" className="bg-gray-800 bg-opacity-80 p-8 rounded-lg text-center hover:shadow-2xl transition-shadow duration-300">
              <div className="flex justify-center mb-6">
                {/* <img src="/icons/feature3.svg" alt="Feature 3" className="w-20 h-20" /> */}
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-neonBlue">
                {t('feature3_title')}
              </h3>
              <p className="text-gray-300">
                {t('feature3_description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 底部信息 */}
      <footer className="py-6 bg-black text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} NaviProtocol. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
