import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { accountType } from './constant';

const user = {
	username: 'johndoe112',
	first: 'John',
	last: 'Doe',
	email: 'johndoe112@mail.com',
	accountType: accountType.STANDARD
};

ReactDOM.render(<App user={user} />, document.getElementById('root'));
registerServiceWorker();
