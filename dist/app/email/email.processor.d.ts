import { Job } from 'bullmq';
import { MailerService } from '@nestjs-modules/mailer';
export declare class EmailProcessor {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    handleSendEmail(job: Job): Promise<void>;
}
