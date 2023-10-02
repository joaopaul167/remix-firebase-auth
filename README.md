# Welcome to Remix Template for Firebase Auth!

- [Remix Docs](https://remix.run/docs)

- Update the firebase server and client Credentials to connect with your firebase project.

In the `firebase.server.ts` update the following:

```sh
    credential: cert(require("../<path-to-service-account-key>.json")),
```

And, in the `firebase.client.ts`, the following:

```sh
    apiKey: "...",
    authDomain: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "...",
    measurementId: "..."
```

Then you ready to go!!

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`
