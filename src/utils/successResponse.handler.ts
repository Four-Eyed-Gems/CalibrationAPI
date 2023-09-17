import { SuccessResponseType } from "../interface"
import { Response } from 'express';
/**
 * Success response handler class
 */
export class SuccessResponse {
  constructor(res: Response, data: SuccessResponseType | {}) {
    const resData = { success: true, code: 200, data: data }
    return res.status(resData.code).json(resData);
  }
}

// export const SendSuccessResponse = (res: Response, data: SuccessResponseType) => {
//   const resData = { success: true, code: 200, data: data }
//   return res.status(resData.code).json(resData);
// }

// export const SendErrorResponse = (res: Response, code: number, message: String) => {
//   const errData = {
//     data: {},
//     success: false,
//     error: {
//       code: code,
//       messsage: message
//     }
//   }

//   return res.status(errData?.error?.code).json(errData)
// }
