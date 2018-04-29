import { createContext } from 'react';
import { accountType } from './constant';

export const user = {
	username: 'johndoe112',
	first: 'John',
	last: 'Doe',
	email: 'johndoe112@mail.com',
	accountType: accountType.LITE
};

export const UserContext = createContext(user);
