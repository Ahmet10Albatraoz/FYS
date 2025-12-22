
export type Gender = 'men' | 'women' | 'kids';

export interface SizeChartEntry {
  cm: number;
  eu: string;
  us: string;
  uk: string;
}

export interface UserProfile {
  id: string;
  name: string;
  gender: Gender;
  reference?: UserReference;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  brandId: string;
  model: string;
  gender: Gender;
  reference: UserReference;
  calculatedSize: string;
}

export interface BrandData {
  id: string;
  name: string;
  logo: string;
  models: {
    men: string[];
    women: string[];
    kids: string[];
  };
  sizeCharts: {
    men: SizeChartEntry[];
    women: SizeChartEntry[];
    kids: SizeChartEntry[];
  };
}

export interface UserReference {
  brand: string;
  cm: number;
  eu?: string;
  image?: string;
  detectedModel?: string;
}
