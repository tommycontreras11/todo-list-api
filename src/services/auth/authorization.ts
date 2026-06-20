import { StatusCode } from "../../constants/status-code.js";

export function assertOwnership(resourceUserId: number, userId: number): void {
  if (resourceUserId !== userId) {
    throw {
      message: "Forbidden",
      status: StatusCode.FORBIDDEN,
    };
  }
}