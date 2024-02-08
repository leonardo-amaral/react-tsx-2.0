export type TUserJwt = {
  features: string[];
  roles: string[];
  session_id: string;
  user: {
    id: number;
    email: string;
    status: string;
    ip: string;
    created_at: string;
    validity_epoch: number;
    channel: string;
  };
};
