export type PledgeStatus = "pending" | "approved" | "rescinded";

export type PublicPledge = {
  company: string;
  firstName: string;
  lastInitial: string;
  role: string;
};

export type PrivatePledge = {
  id: string;
  status: PledgeStatus;
  firstName: string;
  company: string;
};
