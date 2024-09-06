export type MatchingStrategy = "url" | "brand";
export type AVGitem = { id: number; value: number };
export type AVGData = {
  avg: number;
  columnsAvg: AVGitem[];
  rowsAvg: AVGitem[];
};

export type Cell = {
    data: string | number;
    meta?: {
      [key: string]: any;
    };
  };
  