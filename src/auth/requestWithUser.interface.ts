import { Request } from 'express';

interface RequestWithUser extends Request {
  user: {
    _id: string
    login: string
    email: string
    password: string
  }
}

export default RequestWithUser;