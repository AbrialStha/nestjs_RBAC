import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { users } from './entities/users';

@Injectable()
export class UsersService {
  users: User[] = users;

  create(createUserDto: CreateUserDto) {
    const { name, email, password, phone_number, role } = createUserDto;
    const _id =
      this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1;
    const _user: User = {
      id: _id,
      name: name,
      email: email,
      password: password,
      phone_number: phone_number,
      role: role,
      created_at: new Date(),
      updated_at: null,
    };
    this.users.push(_user);
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const _user = this.users.filter((user) => user.id == id);
    return _user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex((user) => user.id === id);
    let is_updated = false;
    for (const key in updateUserDto) {
      if (updateUserDto.hasOwnProperty(key)) {
        this.users[index][key] = updateUserDto[key];
        is_updated = true;
      }
    }
    if (is_updated) {
      this.users[index].updated_at = new Date();
    }
    return this.users[index];
  }

  remove(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    const removed_user = this.users[index];
    this.users.splice(index, 1);
    return removed_user;
  }
}
