(function () {
  nv.fnc.cascade = (function cascade(elements, speed, classname, foreach) {
    var isArrayLike = function (obj) {
      if (!obj) return false;
      var l = obj.length;
      if (typeof l != "number" || l < 0) return false;
      if (Math.floor(l) != l) return false;
      if (l > 0 && !(l - 1 in obj)) return false;
      for (var i = 0; i < l; ++i) {
        if (!(i in obj)) return false;
      }
      return true;
    };
    var text_cascader = function (target) {
      var x = -1;
      var y = target.textContent.length;
      var _span = document.createElement("SPAN");
      var div = document.createElement("DIV");
      var cursor = target;
      while (++x < y) {
        var span = _span.cloneNode();
        span.textContent = cursor.textContent[x];
        div.appendChild(span);
      }
      cursor.innerHTML = div.innerHTML;
    };
    var outer = function (o) {
      var inner = function (i) {
        if (i.amount == ++i.index) {
          return clearTimeout(inner);
        }
        var cursor = i.q[i.index];
        var tagname = cursor.tagName;
        if (tagname === "style") {
          return setTimeout(function () {
            inner(o);
          }, o.speed);
        }
        if (tagname === "svg" || tagname === "g" || tagname === "path") {
          cursor.setAttribute("class", i.classname);
        } else {
          cursor.className += " " + i.classname;
        }
        setTimeout(function () {
          inner(o);
        }, o.speed);
        o.foreach && o.foreach(cursor);
      };
      return inner(o);
    };
    /// ===============
    return function cascade(elements, speed, classname, foreach) {
      if (!elements) return false;
      if (!classname) classname = "Active";
      if (!speed) speed = 1000 / 16;
      if (!isArrayLike(elements)) elements = [elements];
      var x = -1;
      var xx = elements.length;
      while (++x < xx) {
        if (elements[x].length !== void 0) {
          //   DOM List of elements
          var y = -1;
          var yy = elements[x].length;
          while (++y < yy) {
            if (!elements[x][y].children.length) text_cascader(elements[x][y]);
            outer({
              q: elements[x][y].children,
              amount: elements[x][y].children.length,
              classname: classname,
              speed: speed,
              index: -1,
              foreach: foreach,
            });
          }
        } else {
          if (!elements[x].children.length) text_cascader(elements[x]);
          outer({
            q: elements[x].children,
            amount: elements[x].children.length,
            classname: classname,
            speed: speed,
            index: -1,
            foreach: foreach,
          });
        }
      }
      return this;
    };
  })();
  var media = false;
  window.onhashchange = function change() {
    var hash = location.hash.split("#").pop();
    if (hash === "media" && media === false) {
      media = true;
      nv.fnc.media();
    }
    document.body.className = "Active";
    document.body.className = [document.body.className, " ", hash].join("");
    if (hash.length) {
      nv.fnc.note(900, { reverb: 1 / 8 });
    }
  };
  nv.fnc.media = function media() {
    var prepend = "image/press/";
    var assets_library = {
      Headshots: {
        Alexander: [
          // 'ap-d-full.jpg',
          // 'ap-b-cropped.jpg',
          // 'ap-a-cropped.jpg',
          // 'headshot-full.jpg',
          // 'headshot-cropped.jpg'
        ],
      },
    };
    var asset_category = Object.keys(assets_library),
      x = asset_category.length,
      dfg = document.createDocumentFragment();
    while (x--) {
      //    "headshots"
      var category = document.createElement("H3");
      category.textContent = asset_category[x];
      dfg.appendChild(category);
      var assets = Object.keys(assets_library[asset_category[x]]);
      var y = assets.length;
      while (y--) {
        //    "alexander"
        var z = assets_library[asset_category[x]][assets[y]].length;
        while (z--) {
          //    "ap1.jpg"
          var span = document.createElement("span");
          var filename = assets_library[asset_category[x]][assets[y]][z];
          var value = prepend.concat(filename);
          var div_contents = [
            '<a target="_blank" href="',
            value,
            '">',
            '<div class="image" style="background-image:url(',
            value,
            ')"><div><aside>',
            // filename,
            '</aside><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" /></svg></div></div></a>',
          ].join("");
          span.innerHTML = div_contents;
          dfg.appendChild(span);
        }
      }
    }
    document.getElementById("media").children[0].appendChild(dfg);
  };
  var forget = function (inputs) {
    var targets = inputs;
    if (targets.length) {
      var x = targets.length;
      while (x--) {
        var y = targets[x].children.length;
        while (y--) targets[x].children[y].className = "";
      }
    } else {
      var x = targets.children.length;
      while (x--) {
        targets.children[x].className = "";
      }
    }
  };
  var logo_state = false;
  var logoClick = function () {
    location.hash = "";
    // nv.fnc.click_sound();
    if (logo_state) {
      nv.fnc.note(800);
      document.body.className = "";
      history.replaceState({}, document.title, "."); // replace / with . to keep url
      forget(Info);
      forget(Info.children);
      forget(Info.getElementsByTagName("h1")[0]);
    } else {
      // nv.fnc.enter_sound();
      nv.fnc.note(900);
      document.body.className = "Active";
      nv.fnc.cascade(Info);
      nv.fnc.cascade(Info.children, null, null, function (e) {
        e.addEventListener("mouseenter", nv.fnc.chip_note);
      });
      nv.fnc.cascade(Info.getElementsByTagName("h1")[0], null, null, nv.fnc.chip_note);
    }
    logo_state = !logo_state;

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
  Logo.addEventListener("click", logoClick);


  UI.addEventListener("click", function () {
    nv.fnc.note(800, { reverb: 1 / 8 });
    // nv.fnc.note(800);
    location.hash = "";
    return (document.body.className = "Active");
  });
  var x = UI.children.length;
  while (x--) {
    var a = UI.children[x];
    if (a.children[0] && a.children[0].children[0])
      a.children[0].children[0].addEventListener("click", function (e) {
        e.stopPropagation();
      });
  }
  // if (!nv.bln.dev)
  // setTimeout(function () {
  // if (document.body.className !== '') return;
  // if (!nv.bln.dev)

  // }, 4000);
  var context;
  if (window.AudioContext) context = new AudioContext();
  else if (window.webkitAudioContext) context = new webkitAudioContext();
  else context = {};
  nv.fnc.note = function note(frequency, meta, callback) {
    if (!meta) meta = {};
    var undef = void 0;
    if (meta.type == undef) meta.type = "sine";
    if (meta.volume == undef) meta.volume = 0.03125;
    if (meta.sustain == undef) meta.sustain = 0;
    if (meta.chord == undef) meta.chord = false;
    if (meta.reverb == undef) meta.reverb = 0.25;
    // console.log(JSON.stringify(meta, null, '\t'));
    if (typeof frequency !== "number") {
      var x = frequency.length;
      var sustain = [];
      while (x--) {
        if (x) nv.fnc.note(frequency[x], meta);
        else return nv.fnc.note(frequency[x], meta, callback);
      }
    }
    o = context.createOscillator();
    g = context.createGain();
    o.type = meta.type;
    o.connect(g);
    g.gain.value = meta.volume;
    o.frequency.value = frequency;
    g.connect(context.destination);
    o.start(0);
    // console.log({
    //     "context.currentTime": context.currentTime,
    //     "meta.sustain": meta.sustain
    // });
    if (!meta.chord) {
      // g.gain.exponentialRampToValueAtTime(.01, context.currentTime + meta.sustain);
      g.gain.setTargetAtTime(0, context.currentTime + meta.sustain, meta.reverb);
    } else
      meta.chord.push(
        (function (g, context, meta) {
          return function () {
            // g.gain.exponentialRampToValueAtTime(.01, context.currentTime + meta.sustain);
            g.gain.setTargetAtTime(0, context.currentTime + meta.sustain, meta.reverb);
          };
        })(g, context, meta)
      );
    if (callback) {
      if (meta.chord) {
        var x = meta.chord.length;
        while (x--) meta.chord[x]();
      }
      callback();
    }
  };
  nv.fnc.enter_sound = function () {
    nv.fnc.play(
      [
        950,
        [950, 1250],
        // 1250,
        [1250, 1900],
        // 2000,
        [1600, 1900],
        // 1550
      ],
      100,
      {
        reverb: 0.25,
        type: "sine",
        // sustain: .25
      }
    );
  };
  // nv.fnc.click_sound = function () {
  //     return
  // };
  nv.arr.notes = [
    [16.35, 17.32, 18.35, 19.45, 20.6, 21.83, 23.12, 24.5, 25.96, 27.5, 29.14, 30.87],
    [32.7, 34.65, 36.71, 38.89, 41.2, 43.65, 46.25, 49.0, 51.91, 55.0, 58.27, 61.74],
    [65.41, 69.3, 73.42, 77.78, 82.41, 87.31, 92.5, 98.0, 103.8, 110.0, 116.5, 123.5],
    [130.8, 138.6, 146.8, 155.6, 164.8, 174.6, 185.0, 196.0, 207.7, 220.0, 233.1, 246.9],
    [261.6, 277.2, 293.7, 311.1, 329.6, 349.2, 370.0, 392.0, 415.3, 440.0, 466.2, 493.9],
    [523.3, 554.4, 587.3, 622.3, 659.3, 698.5, 740.0, 784.0, 830.6, 880.0, 932.3, 987.8],
    [1047, 1109, 1175, 1245, 1319, 1397, 1480, 1568, 1661, 1760, 1865, 1976],
    [2093, 2217, 2349, 2489, 2637, 2794, 2960, 3136, 3322, 3520, 3729, 3951],
    [4186, 4435, 4699, 4978, 5274, 5588, 5920, 6272, 6645, 7040, 7459, 7902],
  ];

  nv.fnc.chip_note = function () {
    return nv.fnc.note(9250, {
      reverb: 0,
      sustain: 1 / 32,
      volume: 1 / 256,
      type: "sawtooth",
    });
  };

  nv.fnc.play = function (notes, speed, meta) {
    return nv.fnc.note(notes.shift(), meta, function () {
      if (notes.length)
        setTimeout(function () {
          nv.fnc.play(notes, speed, meta);
        }, speed);
    });
  };

  // nv.fnc.get("", function (xhr) {
  //     let selector = document.getElementsByTagName('foreground')[0].children[0];
  //     selector.textContent = xhr.response;
  //     // .slice(0, 256);
  //     // nv.fnc.cascade(selector, null, null, null);
  // });

  // nv.slc.grid = document.getElementById('cell').children[0];
  nv.slc.logo = document.getElementById("Logo");
  nv.slc.headshot = document.getElementById("headshot");

  // Pressure.set('#Back', {
  //     change: function (force, event) {
  //         nv.slc.logo.style.transform = `scale(${1 - (force * .5)})`;
  //         // nv.slc.grid.style.transform = `scale(${1-(force*.125)})`;
  //     }
  // });
})();
