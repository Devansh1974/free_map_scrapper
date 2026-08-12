export interface BusinessResult {
  id: string;
  name: string;
  type?: string;
  address?: string;
  phone?: string;
  website?: string;
  rating?: number;
  reviews?: number;
}

export interface SearchParams {
  query: string;
  location: string;
  limit: number;
}

export interface SearchProvider {
  search(params: SearchParams): Promise<BusinessResult[]>;
}
