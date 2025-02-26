import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Role } from './role.entity';
import { RefreshToken } from './refresh-token.entity';
import { Folder } from './folder.entity';

enum Gender {
  Male = 'm',
  Female = 'f',
  Unspecified = 'u',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30, name: 'first_name' })
  firstName: string;

  @Column({ type: 'varchar', length: 30, name: 'last_name' })
  lastName: string;

  @Index()
  @Column({ type: 'varchar', unique: true, length: 15, name: 'user_name' })
  userName: string;

  @Index()
  @Column({ type: 'varchar', unique: true, length: 40, name: 'email' })
  email: string;

  @Column({ type: 'date', nullable: true, name: 'dob' })
  dob?: Date;

  @Column({ type: 'varchar', name: 'password_hash' })
  passwordHash: string;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({ name: 'user_roles' })
  roles: Role[];

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.Unspecified,
    name: 'gender',
  })
  gender: Gender;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];

  @OneToMany(() => Folder, (folder) => folder.user)
  folders: Folder[];

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @Column({ default: false, name: 'is_deleted' })
  isDeleted: boolean;

  @Column({ nullable: true, name: 'reset_otp' })
  resetOtp: string;

  @Column({ type: 'timestamp', nullable: true, name: 'reset_otp_expire' })
  resetOtpExpire: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;
}
