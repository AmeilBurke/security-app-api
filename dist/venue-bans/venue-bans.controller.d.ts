import { VenueBansService } from './venue-bans.service';
import { CreateVenueBanDto } from './dto/create-venue-ban.dto';
import { RequestWithAccount } from 'src/types';
export declare class VenueBansController {
    private readonly venueBansService;
    constructor(venueBansService: VenueBansService);
    create(request: RequestWithAccount, createVenueBanDto: CreateVenueBanDto): Promise<string | {
        venueBan_id: number;
        venueBan_bannedPersonId: number;
        venueBan_venueId: number;
    }>;
    findAll(request: RequestWithAccount): Promise<string | {
        venueBan_id: number;
        venueBan_bannedPersonId: number;
        venueBan_venueId: number;
    }[]>;
    findOne(request: RequestWithAccount, id: string): Promise<string | {
        venueBan_id: number;
        venueBan_bannedPersonId: number;
        venueBan_venueId: number;
    }>;
    remove(request: RequestWithAccount, id: string): Promise<string | {
        venueBan_id: number;
        venueBan_bannedPersonId: number;
        venueBan_venueId: number;
    }>;
}
