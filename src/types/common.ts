import { JwtPayload } from "jwt-decode";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface CustomJwtPayload extends JwtPayload {
  memberId?: string | number;
}
