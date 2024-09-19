import { EventTypeEnum } from 'src/constants/event_type.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'notification_settings' })
export class NotificationSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'event_type',
    unique: true,
    nullable: false,
  })
  eventType: EventTypeEnum;

  @Column({ nullable: false, default: false })
  muted: boolean;
}
