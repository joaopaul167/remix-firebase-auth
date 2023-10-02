import { createCookieSessionStorage } from '@remix-run/node';

type SessionData = {
    jwt: string;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } = createCookieSessionStorage<
  SessionData,
  SessionFlashData
>({
  cookie: {
    name: '__session',
    httpOnly: true,
    domain: process.env.NODE_ENV === 'production' ? '' : undefined,
    maxAge: 60 * 60 * 23, // 23 hours
    path: '/',
    sameSite: 'lax',
    secrets: ['s3cret1'],
    secure: process.env.NODE_ENV === 'production' ? true : false,
  },
});

export { getSession, commitSession, destroySession };
