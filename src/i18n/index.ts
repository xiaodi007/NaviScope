import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 导入所有命名空间的翻译文件
import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import enHfs from './locales/en/hfs.json';
import enSupplyAssetTable from './locales/en/SupplyAssetTable.json';
import enBorrowAssetTable from './locales/en/BorrowAssetTable.json';
import enHealthFactorSimulation from './locales/en/HealthFactorSimulation.json';

import zhCommon from './locales/zh/common.json';
import zhHome from './locales/zh/home.json';
import zhHFS from './locales/zh/hfs.json';
import zhSupplyAssetTable from './locales/zh/SupplyAssetTable.json';
import zhBorrowAssetTable from './locales/zh/BorrowAssetTable.json';
import zhHealthFactorSimulation from './locales/zh/HealthFactorSimulation.json';

const resources = {
    en: {
      common: enCommon,
      home: enHome,
      hfs: enHfs,
      SupplyAssetTable: enSupplyAssetTable,
      BorrowAssetTable: enBorrowAssetTable,
      HealthFactorSimulation: enHealthFactorSimulation,
      // ...其他命名空间
    },
    zh: {
      common: zhCommon,
      home: zhHome,
      hfs: zhHFS,
      SupplyAssetTable: zhSupplyAssetTable,
      BorrowAssetTable: zhBorrowAssetTable,
      HealthFactorSimulation: zhHealthFactorSimulation,
    //   tool1: zhTool1,
      // ...其他命名空间
    }
  };

const userLanguage = navigator.language || 'zh';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: userLanguage.includes('zh') ? 'zh' : 'en',
    fallbackLng: 'en',
    ns: ['common', 'home', 'hfs', 'SupplyAssetTable', 'BorrowAssetTable', 'HealthFactorSimulation'], // 命名空间列表
    defaultNS: 'common', // 默认命名空间
    interpolation: {
      escapeValue: false
    },
    // backend: {
    //   loadPath: '/src/i18n/locales/{{lng}}/{{ns}}.json', // 指定翻译文件的路径
    // },
  });

export default i18n;
