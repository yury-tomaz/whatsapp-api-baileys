
export interface SendContactMessageUseCaseInputDTO {
    key: string;
    to: string;
    vcard: {
        fullName: string;
        organization: string;
        phoneNumber: string;
    };
}