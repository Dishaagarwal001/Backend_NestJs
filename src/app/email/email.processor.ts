import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bullmq';
import { MailerService } from '@nestjs-modules/mailer';

@Processor('email')
export class EmailProcessor {
  constructor(private readonly mailerService: MailerService) {}

  @Process('sendEmail')
  async handleSendEmail(job: Job): Promise<void> {
    console.log('📧 Processing email job:', job.data);
    try {
      await this.mailerService.sendMail({
        to: job.data.to,
        subject: job.data.subject,
        template: job.data.template,
        context: job.data.context,
      });

      console.log('✅ Email sent successfully to:', job.data.to);
    } catch (error) {
      console.error('❌ Error sending email:', error);
    }
  }
}
