import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(username: string, password: string) {
    const user = this.userRepository.create({ username, password });
    return this.userRepository.save(user);
  }

  async findByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }
}
