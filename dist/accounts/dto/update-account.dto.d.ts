export declare class UpdateAccountDto {
    account_name?: string;
    account_email?: string;
    account_password?: string;
    account_roleId?: number;
    account_allowedVenues: number[];
    account_allowedBusinesses: number[];
    account_venueManager?: number[];
    account_businessManager?: number[];
}
