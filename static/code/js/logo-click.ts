import { cascadeClassName } from "./cascade-class-name";
import { forget } from "./forget";
import { note } from "./note";
import { getLogoState, isDeactivated, setLogoState } from "./ubq";

export async function logoClick() {
  const info = document.getElementById("Info");
  if (!info) return;
  location.hash = "";
  // click_sound();
  if (isDeactivated) {
    note(800);
    document.body.className = "";
    history.replaceState({}, document.title, "."); // replace / with . to keep url
    forget(info);
    forget(info.children);
    forget(info.getElementsByTagName("h1")[0]);
  } else {
    note(900);
    document.body.className = "Active";
    await cascadeClassName(info);
  }

  setLogoState(!getLogoState());

  // enable video streaming
  if (window.innerHeight < window.innerWidth) {
    const videos = document.getElementsByTagName("video");
    if (videos) {
      const video = videos[0];
      video.src = "https://storageapi.fleek.co/2e62e11d-d4be-4c6f-a2bb-b159c83a0d95-bucket/ubq.fi/hero.mp4";
      video.addEventListener("play", function loaded() {
        console.log(`playing`);
        video.className += "Active";
      });
    }
  }
}
