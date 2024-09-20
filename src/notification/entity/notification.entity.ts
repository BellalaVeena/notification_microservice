import { NotificationSettings } from 'src/notification_settings/entities/notification_settings.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @ManyToOne(
    (type) => NotificationSettings,
    (notificationSettings) => notificationSettings.id,
    { onUpdate: 'CASCADE' }
  )
  @JoinColumn({ name: 'event_type_id' })
  notificationSettings: NotificationSettings;

  @Column({ nullable: false, name: 'event_type_id' })
  eventTypeId: number;

  @CreateDateColumn({ type: 'timestamptz', name: 'time_stamp' })
  readonly timeStamp: Date;
}
