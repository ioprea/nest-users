import { Injectable } from '@nestjs/common';
import { Users } from './utils/data';
import { v4 as uuidv4 } from 'uuid';

const users: Users[] = [
  { id: '1', name: "John Doe", roles: ["ADMIN", "PERSONAL"], groups: ["GROUP_1", "GROUP_2"] },
  { id: '2', name: "Gabriel Monroe", roles: ["PERSONAL"], groups: ["GROUP_1", "GROUP_2"] },
  { id: '3', name: "Alex Xavier", roles: ["PERSONAL"], groups: ["GROUP_2"] },
  { id: '4', name: "Jarvis Khan", roles: ["ADMIN", "PERSONAL"], groups: ["GROUP_2"] },
  { id: '5', name: "Martines Polok", roles: ["ADMIN", "PERSONAL"], groups: ["GROUP_1"] },
  { id: '6', name: "Gabriela Wozniak", roles: ["VIEWER", "PERSONAL"], groups: ["GROUP_1"] },
];

export const findUserById = (id: string) => {
  return users.find(user => user.id === id);
}

@Injectable()
export class UsersService {

  private users: Users[] = users;

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find(user => user.id === id);
  }

  create(user: any) {
    const userData = { ...user, id: uuidv4() }
    this.users.push(userData);
    return userData;
  }

  update(id: string, updatedUser: any) {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updatedUser };
      return this.users[index];
    }
    return null;
  }

  getManagedUsers(userId: string): Users[] {
    const user = this.users.find(u => u.id == userId);

    if (!user) {
      return [];
    }

    if (user.roles.includes('ADMIN')) {
      const managedGroups = user.groups;
      return this.users.filter(u => u.groups.some(group => managedGroups.includes(group)) && u.id !== user.id);
    }

    return [];
  }

  delete(id: string) {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      const deletedUser = this.users.splice(index, 1);
      return deletedUser[0];
    }
    return null;
  }
}