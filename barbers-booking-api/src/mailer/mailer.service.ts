import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Appointment } from 'src/appointments/entities/appointment.entity';

@Injectable()
export class MailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail', // Or use SMTP settings
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string) {
    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
      });
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async sentToClient(appointment: Appointment) {
    await this.transporter.sendMail({
      to: appointment.clientEmail,
      subject: `Your booking term at ${appointment.barber.name}`,
      template:
        'Thank you for your time to book a term in your barber studio. We are glad to have you as a client. Have a great day and see you soon. Your best barber!',
      context: {
        name: appointment.clientName,
        date: appointment.day,
        time: appointment.term,
        barber: appointment.barber.name,
        service: appointment.service.name,
      },
    });
  }
}
