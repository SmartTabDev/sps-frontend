export interface RetailerImagesRatingSummary {
  index: number;
  retailer: string;
  totalImages?: number;
  packshotUrl?: string;
  packshotMatch?: boolean;
  otherImagesUrls?: string[];
  videoMatch?: boolean;
  videoUrl?: string;
}
