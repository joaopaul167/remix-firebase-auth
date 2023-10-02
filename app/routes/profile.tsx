import { LoaderFunction, redirect } from "@remix-run/node";
import { auth as serverAuth } from "~/firebase.server";
import { getSession } from "~/sessions";

export const loader: LoaderFunction = async ({ request }: any) => {
  // Get the cookie value (JWT)
  const session = await getSession(request.headers.get("Cookie"));

  // Get the JWT from the cookie
  const jwt = session.get("jwt");

  if (!jwt) {
    return redirect("/logout");
  }

  // No JWT found...
  if (!jwt) {
    return redirect("/login");
  }

  try {
    const token = await serverAuth.verifySessionCookie(jwt);

    console.log(token);

    // Get the user's profile using the token from somewhere (Firestore, Remote Database etc)
    // const profile = await serverAuth.getUser(token.uid);


    // Return the profile information to the page!
    return {
        token,
    };
  } catch (e: any) {
    // Invalid JWT - log them out (see below)
    return redirect("/logout");
  }
};