import { Request } from 'express';
import { User } from 'src/user/user.schema'

interface RequestWithUser extends Request {
  user: any;
}

export default RequestWithUser;