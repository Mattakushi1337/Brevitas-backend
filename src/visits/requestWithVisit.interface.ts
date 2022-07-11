import { Request } from 'express';
import { ObjectId } from 'mongoose';

interface RequestWithVisit extends Request {
    visit: {
        _id: string
        name: string
        surname: string
        description: string
        mail: string
        link: string
        phone: number
        user: ObjectId
    }
}
export default RequestWithVisit;