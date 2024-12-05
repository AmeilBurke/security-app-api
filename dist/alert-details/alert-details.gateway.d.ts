import { AlertDetailsService } from './alert-details.service';
import { CreateAlertDetailDto } from './dto/create-alert-detail.dto';
import { UpdateAlertDetailDto } from './dto/update-alert-detail.dto';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
export declare class AlertDetailsGateway {
    private readonly alertDetailsService;
    private jwtService;
    constructor(alertDetailsService: AlertDetailsService, jwtService: JwtService);
    server: Server;
    onModuleInit(): void;
    create(createAlertDetailDto: CreateAlertDetailDto & {
        fileData: string;
    }, client: Socket): Promise<string>;
    update(updateAlertDetailDto: UpdateAlertDetailDto, client: Socket): Promise<string>;
    ReadableStreamDefaultReader(client: Socket): Promise<string>;
}
