import request from 'supertest';

import app from '../app';
import utils from './utils';

describe('User should be able to signup to the app', () => {
  it('Should create a User at "/api/v1/auth/signup" with POST if all request inputs are valid', async () => {
    const { status, body: { data } } = await request(app).post('/api/v1/auth/signup').send(utils.newUser);
    expect(status).toBeNumber().toEqual(201);
    expect(data).toBeObject().toContainKeys(['user', 'status']);
    expect(data.status).toBeNumber().toEqual(201);
    expect(data.user.fullName).toBeString().toEqual(utils.newUser.fullName);
    expect(data.user.username).toBeString().toEqual(utils.newUser.username);
    expect(data.user.email).toBeString().toEqual(utils.newUser.email);
    expect(data.user.type).toBeString().toEqual('Client');
    expect(data.user.createdAt).toBeString();
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if username, fullName, email or password fields are invalid', async () => {
    const { status, body: { error } } = await request(app).post('/api/v1/auth/signup');
    expect(status).toBeNumber().toEqual(400);
    expect(error).toBeObject().toContainKeys(['messages', 'status']);
    expect(error.status).toBeNumber().toEqual(400);
    expect(error.messages).toBeArray().toIncludeAllMembers([
      {
        msg: 'Username should be at least a character long',
        param: 'username',
        location: 'body',
      },
      {
        msg: 'Username must be string data type',
        param: 'username',
        location: 'body',
      },
      {
        msg: 'Username is required',
        param: 'username',
        location: 'body',
      },
      {
        msg: 'Full name should be at least a character long',
        param: 'fullName',
        location: 'body',
      },
      {
        msg: 'Full name must be string data type',
        param: 'fullName',
        location: 'body',
      },
      {
        msg: 'Full name is required',
        param: 'fullName',
        location: 'body',
      },
      {
        msg: 'Email should be at least a character long',
        param: 'email',
        location: 'body',
      },
      {
        msg: 'Email must be string data type',
        param: 'email',
        location: 'body',
      },
      {
        msg: 'Email is required',
        param: 'email',
        location: 'body',
      },
      {
        msg: 'Email format is wrong',
        param: 'email',
        location: 'body',
      },
      {
        msg: 'Password should be at least a character long',
        param: 'password',
        location: 'body',
      },
      {
        msg: 'Password must be string data type',
        param: 'password',
        location: 'body',
      },
      {
        msg: 'Password is required',
        param: 'password',
        location: 'body',
      },
    ]);
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if username or email is already registered', async () => {
    const { status, body: { error } } = await request(app).post('/api/v1/auth/signup').send(utils.user);
    expect(status).toBeNumber().toEqual(406);
    expect(error).toBeObject().toContainKeys(['message', 'status']);
    expect(error.message).toBeString().toEqual('User already exists with either email or username, please sign in');
  });
});

describe('User should be able to login to the app', () => {
  it('Should be able login a User at "/api/v1/auth/login" user and password fields are valid', async () => {
    const { status, body: { data } } = await request(app).post('/api/v1/auth/login').send({ user: utils.user.email || utils.user.username, password: utils.user.password });
    expect(status).toBeNumber().toEqual(200);
    expect(data).toBeObject().toContainKeys(['user', 'status']);
    expect(data.status).toBeNumber().toEqual(200);
    expect(data.user.fullName).toBeString().toEqual(utils.user.fullName);
    expect(data.user.username).toBeString().toEqual(utils.user.username);
    expect(data.user.email).toBeString().toEqual(utils.user.email);
    expect(data.user.type).toBeString().toEqual('Client');
    expect(data.user.createdAt).toBeString();
    expect(data.user.updatedAt).toBeString();
  });

  it('Should NOT create a User at "/api/v1/auth/signup" if user or password fields are invalid', async () => {
    const { status, body: { error } } = await request(app).post('/api/v1/auth/login');
    expect(status).toBeNumber().toEqual(400);
    expect(error).toBeObject().toContainKeys(['messages', 'status']);
    expect(error.messages).toBeArray().toIncludeAllMembers([
      {
        msg: 'Email or username should be at least a character long',
        param: 'user',
        location: 'body',
      },
      {
        msg: 'Email or username must be string data type',
        param: 'user',
        location: 'body',
      },
      {
        msg: 'Email or username is required',
        param: 'user',
        location: 'body',
      },
      {
        msg: 'Password should be at least a character long',
        param: 'password',
        location: 'body',
      },
      {
        msg: 'Password must be string data type',
        param: 'password',
        location: 'body',
      },
      {
        msg: 'Password is required',
        param: 'password',
        location: 'body',
      },
    ]);
  });

  it('Should NOT login a User at "/api/v1/auth/login" if user is not registered', async () => {
    const { status, body: { error } } = await request(app).post('/api/v1/auth/login').send({ user: utils.user404.email || utils.user404.username, password: utils.user.password });
    expect(status).toBeNumber().toEqual(404);
    expect(error).toBeObject().toContainKeys(['message', 'status']);
    expect(error.message).toBeString().toEqual('User not found, please sign up by creating an account');
  });

  it('Should NOT login a User at "/api/v1/auth/login" if password is wrong', async () => {
    const { status, body: { error } } = await request(app).post('/api/v1/auth/login').send({ user: utils.user.username || utils.user.email, password: 'wrong password' });
    expect(status).toBeNumber().toEqual(401);
    expect(error).toBeObject().toContainKeys(['message', 'status']);
    expect(error.message).toBeString().toEqual('Password provided does not match user');
  });
});
