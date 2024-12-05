import { CreateAlertDetailDto } from './dto/create-alert-detail.dto';
import { UpdateAlertDetailDto } from './dto/update-alert-detail.dto';
import { PrismaService } from 'src/prisma.service';
import { Server } from 'socket.io';
export declare class AlertDetailsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(payload: {
        sub: number;
        email: string;
        iat: number;
        exp: number;
    }, createAlertDetailDto: CreateAlertDetailDto & {
        fileData: string;
    }, imageName: string, server: Server): Promise<string>;
    update(payload: {
        sub: number;
        email: string;
        iat: number;
        exp: number;
    }, updateAlertDetailDto: UpdateAlertDetailDto, imageName: string, server: Server): Promise<string>;
}
