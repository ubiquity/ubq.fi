import { cascade } from "./cascade";
import { chip_note } from "./chip-note";
import { forget } from "./forget";
import { note } from "./note";
import { getLogoState, logo_state, setLogoState } from "./ubq";

export const logoClick = function () {
  location.hash = "";
  // click_sound();
  if (logo_state) {
    note(800);
    document.body.className = "";
    history.replaceState({}, document.title, "."); // replace / with . to keep url
    forget(Info);
    forget(Info.children);
    forget(Info.getElementsByTagName("h1")[0]);
  } else {
    // enter_sound();
    note(900);
    document.body.className = "Active";
    cascade({ self: Info });
    cascade({
      self: Info.children,
      elements: null,
      speed: null,
      classname: function (e) {
        e.addEventListener("mouseenter", chip_note);
      },
    });
    cascade({ self: Info.getElementsByTagName("h1")[0], elements: null, speed: null, classname: chip_note });
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
};
