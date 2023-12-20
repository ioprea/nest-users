export interface Users {
  id: string;
  name: string;
  roles: string[];
  groups: string[];
}

export const groups = ['GROUP_1', 'GROUP_2'];
export const roles = ['ADMIN', 'PERSONAL'];

export const permissions = [
  {
    name: 'Admin',
    code: 'ADMIN',
    permissions: ['CREATE', 'VIEW', 'EDIT', 'DELETE'],
  },
  { name: 'Personal', code: 'PERSONAL', permissions: [] },
  { name: 'Viewer', code: 'VIEWER', permissions: ['VIEW'] },
];
