export type PledgeStatus = "pending" | "approved" | "rescinded";

export type PublicPledge = {
  company: string;
  firstName: string;
  lastName: string;
  role: string;
  logoUrl?: string;
};

export type PrivatePledge = {
  id: string;
  status: PledgeStatus;
  firstName: string;
  company: string;
};
