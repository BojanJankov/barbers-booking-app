import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
