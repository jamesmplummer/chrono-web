export type User = {
  id: string;
  email: string;
  role: string;
  activities: Record<string, string>;
  verified: boolean;
  givenName: string;
  familyName: string;
  img: string;
  _refreshCheck?: number;
};
