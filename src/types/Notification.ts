export type TriggerPriceType = 'price'| 'rrp';
export type TriggerValueType = 'amount' | 'percent' | null;
export type TriggerVariation = 'gte' | 'lte' | 'any';

export type TriggerValueTypeOption = {
  name: string;
  value: string;
};
export interface TriggerType {
  id?: number | string;
  priceType: TriggerPriceType;
  value: number | null;
  valueType: TriggerValueType;
  variation: TriggerVariation;
}

export type Recipient = {
  id?: number;
  email: string;
};

export type AlertType = 'all' | 'product' | 'category';

export type BrandItemRequest = {
  brandId: number;
}

export type CategoryItemRequest = {
  categoryId: number;
}

export type RetailerItemRequest = {
  retailerId: number;
}

export type VariantLinkItemRequest = {
  variantLinkId: number;
}

export type Alert = {
  id?: number;
  name: string | undefined;
  description: string | undefined;
  type: AlertType;
  startDate: string;
  endDate: string | null;
  isActive: boolean;
  availableOnly: boolean;
  triggers?: Partial<TriggerType>[];
  recipients?: Recipient[];
  recipientsCount?: number;
  productsCount?: number;
  brandsCount?: number;
  retailersCount?: number;
  variantLinksCount?: number;
  categoriesCount?: number;
  variantLinks?: VariantLinkItemRequest[];
  retailers?: RetailerItemRequest[];
  categories?: CategoryItemRequest[];
  brands?: BrandItemRequest[];
};

export type AlertListItem = {
  id: number;
  name: string | undefined;
  description: string | undefined;
  type: AlertType;
  startDate: string;
  endDate: string | null;
  isActive: boolean;
  availableOnly: boolean;
  triggers?: Partial<TriggerType>[];
  recipients: number[];
  variantLinks: number[];
  retailers: number[];
  categories: number[];
  brands: number[];
};
