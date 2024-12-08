import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John Snow',
      email: 'johnsnow@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 2,
      name: 'Jesse Pinkman',
      email: 'jessepinkman@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 3,
      name: 'Virat Kohli',
      email: 'viratkohli@gmail.com',
      role: 'INTERN',
    },
    {
      id: 4,
      name: 'MS Dhoni',
      email: 'msdhoni@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Rohit Sharma',
      email: 'rohitsharma@gmail.com',
      role: 'ADMIN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0) {
        throw new NotFoundException(`User with role ${role} not found`);
      }
      return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  create(createUserDto: CreateUserDto) {
    this.users.push({
      id: this.users.length + 1,
      ...createUserDto,
    });

    return createUserDto;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...updateUserDto,
        };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
