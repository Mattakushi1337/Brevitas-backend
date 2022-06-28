export class ExistingUserDto {
    static id(id: any): Promise<import("../../visits/shemas/visits.schemas").Visit[]> {
        throw new Error('Method not implemented.')
    }
    email: string
    password: string
}