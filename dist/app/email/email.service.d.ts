import { Queue } from 'bullmq';
import { SendResetPasswordOtpDto, SendRegistrationUrlDto } from '../auth/interfaces/send-mail.interface';
export declare class EmailService {
    private readonly emailQueue;
    constructor(emailQueue: Queue);
    sendWelcomeEmail(to: string, name: string): Promise<void>;
    sendRegistrationUrl(emailData: SendRegistrationUrlDto): Promise<void>;
    sendResetPasswordOtp(emailData: SendResetPasswordOtpDto): Promise<void>;
}
