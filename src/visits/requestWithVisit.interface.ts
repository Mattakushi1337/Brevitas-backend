import { Request } from 'express';

interface RequestWithVisit extends Request {
    visit: {
        _id: string
        name: string
        surname: string
        description: string
        mail: string
        link: string
        phone: number
        user : string
    }
}
export default RequestWithVisit;