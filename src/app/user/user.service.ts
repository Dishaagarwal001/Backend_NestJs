import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { errorMessages } from 'src/core/utils/errors';
import { UserRelation } from 'src/core/interfaces/user';
import { User } from 'src/database/entities/user.entity';
import { CreateUserDto } from 'src/core/dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { userName, email, password, dob } = createUserDto;
    const existingUser = await this.userRepository.findOne({
      where: [{ userName }, { email }],
    });

    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    const _dob = new Date(dob);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      ...createUserDto,
      dob: _dob,
      passwordHash: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async validateUser(userName: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email: userName },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  public async findById(id: string, relations?: UserRelation): Promise<User> {
    const user: User = await this.userRepository.findOne({
      where: {
        id,
      },
      relations,
    });
    if (!user) {
      throw new NotFoundException(errorMessages.user.notFound);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }
}
