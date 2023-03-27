export type User = {
  _id: string;
  name: string;
  records: Record[];
};

export type PowerRank = {
  name: string;
  power: number;
};

export type Record = {
  _id: string;
  date: Date;
  gym: string;
  problems: Problem[];
  total: number;
};

export type Problem = {
  grade: string;
  count: number;
};
