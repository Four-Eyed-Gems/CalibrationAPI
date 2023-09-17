import { Response } from 'express';


export class ErrorResponse {
  constructor(res: Response, code: number, message: String) {
    const errData = {
      data: {},
      success: false,
      error: {
        code: code ? code : 500,
        messsage: message ? message : "Internal Server Error"
      }
    }

    return res.status(errData?.error?.code).json(errData)
  }
}

export class InternalError {
  constructor(res: Response) {
    const errData = {
      data: {},
      success: false,
      error: {
        code: 500,
        messsage: "Internal Server Error"
      }
    }

    return res.status(errData?.error?.code).json(errData)
  }
}
