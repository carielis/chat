/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class MessageEntity {
  @PrimaryGeneratedColumn("uuid")
  messageId: string;

  @CreateDateColumn()
  create_at: string;

  @Column()
  text_message: string

  @Column()
  send_by: string
}
