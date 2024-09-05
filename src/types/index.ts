import { CreateBannedPersonDto } from 'src/banned-people/dto/create-banned-person.dto';

export type RequestWithAccount = Request & {
  account: {
    sub: number;
    email: string;
    iat: number;
    exp: number;
  };
};

export type BannedPersonWithBanDetailsDto = CreateBannedPersonDto & {
    banDetail_reason: string;
    banDetail_startDate: string;
    banDetail_endDate: string;
};
