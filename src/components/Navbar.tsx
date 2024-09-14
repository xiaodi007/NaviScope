import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation("common");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 切换语言函数
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-80 backdrop-blur-md z-50 shadow-lg">
      <div className=" px-10 py-4 flex items-center justify-between">
        {/* 网站 Logo */}
        <div className="text-2xl md:text-3xl font-bold text-neonGreen">
          <Link to="/" className="flex items-center space-x-2">
            {/* 可添加 Logo 图标 */}
            {/* <img src="/path/to/logo.png" alt="Logo" className="h-8 w-8" /> */}
            <span>{t("logo")}</span>
          </Link>
        </div>
        {/* 导航链接 */}
        <ul className="hidden md:flex space-x-8 text-white text-lg">
          <li>
            <Link
              to="/"
              className="hover:text-neonBlue transition-colors duration-300"
            >
              {t("home")}
            </Link>
          </li>
          <li>
            <Link
              to="/tool1"
              className="hover:text-neonBlue transition-colors duration-300"
            >
              {t("tool1")}
            </Link>
          </li>
          <li className="relative">
            <Link
              to="/tool2"
              className="hover:text-neonBlue transition-colors duration-300"
            >
              {t("tool2")}
            </Link>
            <span className="absolute inline-block absolute transform scale-[0.7] top-[-13px] left-[52px] w-[103px] bg-gray-800 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              Coming Soon
            </span>
          </li>
          <li>
            <Link
              to="/donations"
              className="hover:text-neonBlue transition-colors duration-300"
            >
              {t("donations")}
            </Link>
          </li>
        </ul>
        {/* 语言切换和菜单按钮 */}
        <div className="flex items-center space-x-4">
          {/* 语言切换按钮 */}
          <div className="hidden md:flex space-x-2">
            <button
              onClick={() => changeLanguage("zh")}
              className={`px-3 py-1.5 rounded-lg ${
                i18n.language === "zh"
                  ? "bg-neonGreen text-black"
                  : "text-white border border-white"
              } hover:bg-neonGreen hover:text-black transition-colors duration-300`}
            >
              中文
            </button>
            <button
              onClick={() => changeLanguage("en")}
              className={`px-3 py-1.5 rounded-lg ${
                i18n.language === "en"
                  ? "bg-neonGreen text-black"
                  : "text-white border border-white"
              } hover:bg-neonGreen hover:text-black transition-colors duration-300`}
            >
              EN
            </button>
          </div>
          {/* 移动端菜单按钮 */}
          <button
            className="md:hidden text-neonGreen focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {/* 菜单图标 */}
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8h16M4 16h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* 移动端菜单 */}
      {isMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-90 backdrop-blur-md shadow-lg">
          <ul className="flex flex-col space-y-4 px-6 py-4 text-white text-lg">
            <li>
              <Link
                to="/"
                className="hover:text-neonBlue transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("home")}
              </Link>
            </li>
            <li>
              <Link
                to="/tool1"
                className="hover:text-neonBlue transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("tool1")}
              </Link>
            </li>
            <li className="flex items-center">
              <Link
                to="/tool2"
                className="hover:text-neonBlue transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("tool2")}
              </Link>
              <span className="ml-2 bg-yellow-400 text-black text-xs font-semibold px-2 py-0.5 rounded">
                Coming Soon
              </span>
            </li>
            {/* 语言切换按钮（移动端） */}
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => changeLanguage("zh")}
                className={`px-3 py-1.5 rounded-lg ${
                  i18n.language === "zh"
                    ? "bg-neonGreen text-black"
                    : "text-white border border-white"
                } hover:bg-neonGreen hover:text-black transition-colors duration-300`}
              >
                中文
              </button>
              <button
                onClick={() => changeLanguage("en")}
                className={`px-3 py-1.5 rounded-lg ${
                  i18n.language === "en"
                    ? "bg-neonGreen text-black"
                    : "text-white border border-white"
                } hover:bg-neonGreen hover:text-black transition-colors duration-300`}
              >
                EN
              </button>
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
