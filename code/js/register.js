// @ts-ignore
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"
const supabase = createClient("https://iesuqulsscuzmtppzmjf.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imllc3VxdWxzc2N1em10cHB6bWpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjUyNjQyMjUsImV4cCI6MTk4MDg0MDIyNX0.LUcuPjFJGvSdRJVNk1Oz8-jYs3d6nyWW_ix_L4YO4Ps")
console.log("Supabase Instance: ", supabase)
const auth = supabase.auth;
//
//
//

if (!window.location.hash) {
    await register();
} else {
    await success();
}

//
//
//
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

async function success() {
    const jwt = parseJwt(window.location.hash)
    console.log(jwt);



    // {
    //     "aud": string,
    //     "exp": number,
    //     "sub": string,
    //     "email": string,
    //     "phone": string,
    //     "app_metadata": {
    //         "provider": string,
    //         "providers": [
    //             "github"
    //         ]
    //     },
    //     "user_metadata": {
    //         "avatar_url": string,
    //         "email": string,
    //         "email_verified": boolean,
    //         "full_name": string,
    //         "iss": string,
    //         "name": string,
    //         "preferred_username": string,
    //         "provider_id": string,
    //         "sub": string,
    //         "user_name": string,
    //     },
    //     "role": string,
    //     "session_id": string,
    // }

    const user_name = jwt.user_metadata.user_name
    console.log({ user_name });

    // fetch("https://api.github.com/user", {
    //     headers: {
    //         Authorization: "Bearer OAUTH-TOKEN"
    //     }
    // })
    // curl -H "Authorization: Bearer OAUTH-TOKEN" https://api.github.com/user
    // document.write(window.location.hash);
}

async function register() {
    await signout();
    const response = await signInWithGitHub();
    if (response.error) {
        throw new Error(response.error)
    }
    console.log(response.data);
}

async function signout() {
    const { error } = await auth.signOut()
}
async function signInWithGitHub() {
    const { data, error } = await auth.signInWithOAuth({
        provider: "github",
    });
    return { data, error }
};
