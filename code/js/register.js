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
async function success() {
    console.log(window.location.hash);
    document.write(window.location.hash);
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
