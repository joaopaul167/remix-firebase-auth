import type { SyntheticEvent } from "react";

import { redirect, type ActionFunction } from "@remix-run/node";
import { GoogleAuthProvider, UserCredential, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth as clientAuth } from "~/firebase.client";
import { auth as serverAuth } from "~/firebase.server";
import { useFetcher } from "@remix-run/react";
import { commitSession, getSession } from "~/sessions";

export default function Login() {
    const fetcher = useFetcher();

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            email: { value: string };
            password: { value: string };
        }
        console.log(target);

        const email = target.email.value;
        const password = target.password.value;

        try {
        const credential = await signInWithEmailAndPassword(
            clientAuth,
            email,
            password,
        );
        const idToken = await credential.user.getIdToken();
        console.log(idToken);

        // Trigger a POST request which the action will handle
        fetcher.submit({ idToken }, { method: "post", action: "/login" });
        } catch (e: any) {
            console.error(e);
        }
    }

    async function onProviderSignIn(credential: UserCredential) {
        const idToken = await credential.user.getIdToken();
        fetcher.submit({ idToken }, { method: "post", action: "/login" });
      }

      const signInWithGoogle = () => {
        signInWithPopup(clientAuth, new GoogleAuthProvider())
          .then(onProviderSignIn)
          .catch((e: any) => console.error(e));
      }
    return (
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
            <label>
                Username
                <input type="text" name="email" />
            </label>
            <label>
                Password
                <input type="password" name="password" />
            </label>
            <button type="submit">Login</button>
            </form>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    );
  }

  export const action: ActionFunction = async ({ request }) => {
    const session = await getSession(request.headers.get('Cookie'));
    const form = await request.formData();
    const idToken = form.get("idToken")?.toString();
 
    if (!idToken) {
      return new Response("Missing idToken", { status: 400 });
    }
    // Verify the idToken is actually valid
    await serverAuth.verifyIdToken(idToken);
  
    const jwt = await serverAuth.createSessionCookie(idToken, {
      // 5 days - can be up to 2 weeks
      expiresIn: 60 * 60 * 24 * 5 * 1000,
    });

    session.set("jwt", jwt);

    return redirect("/profile", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
  };