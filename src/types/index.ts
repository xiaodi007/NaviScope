export interface AssetData {
    symbol: string;
    price: number;
    supply_rate: number;
    boosted: number;
    borrow_rate: number;
    borrow_reward_apy: number;
    max_ltv: number;
    liquidation_threshold: number; // 新增清算阈值
  }
  
  export interface InputAmounts {
    [symbol: string]: {
      amount: number;
      value: number;
    };
  }
  
  export interface SupplyData {
    inputAmounts: InputAmounts;
    totalCollateralValue: number;
    totalLoanableValue: number;
  }
  
  export interface BorrowData {
    inputAmounts: InputAmounts;
    totalBorrowValue: number;
  }
  
  export interface SupplyAssetTableProps {
    onSupplyChange: (data: SupplyData) => void;
  }
  
  export interface BorrowAssetTableProps {
    assets: AssetData[];
    totalLoanableValue: number;
    onBorrowChange: (data: BorrowData) => void;
    supplyData: SupplyData;
  }
  