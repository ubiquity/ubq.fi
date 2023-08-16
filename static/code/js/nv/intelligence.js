!(function (e, a, t, n, c, o, s) {
  (e.GoogleAnalyticsObject = c),
    (e[c] =
      e[c] ||
      function () {
        (e[c].q = e[c].q || []).push(arguments);
      }),
    (e[c].l = 1 * new Date()),
    (o = a.createElement(t)),
    (s = a.getElementsByTagName(t)[0]),
    (o.async = 1),
    (o.src = n),
    s.parentNode.insertBefore(o, s);
})(window, document, "script", "//www.google-analytics.com/analytics.js", "ga"),
  ga("create", "UA-57348409-4", "auto"),
  ga("send", "pageview");
!(function (e, t, a, n) {
  if (!e.getElementById(a)) {
    var s = e.createElement(t),
      c = e.getElementsByTagName(t)[0];
    (s.id = a), (s.src = "//js.hs-analytics.net/analytics/" + Math.ceil(new Date() / n) * n + "/1914551.js"), c.parentNode.insertBefore(s, c);
  }
})(document, "script", "hs-analytics", 3e5);
if (navigator.appVersion.indexOf("Googlebot") === -1)
  window.onerror = function (e, url, lineNumber, column, detail) {
    var xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      (function () {
        var result = {},
          regexParse = new RegExp("([a-z-0-9]{2,63}).([a-z.]{2,5})$"),
          urlParts = regexParse.exec(window.location.hostname);
        result.domain = urlParts[1];
        result.type = urlParts[2];
        result.subdomain = window.location.hostname.replace(result.domain + "." + result.type, "").slice(0, -1);

        if (location.port) {
          return ["//api", ".", result.domain, ".", result.type, ":", location.port, "/logs/errors"].join("");
        } else {
          return ["//api", ".", result.domain, ".", result.type, "/logs/errors"].join("");
        }
      })()
    );
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(
      JSON.stringify({
        browser: navigator.appVersion,
        details: detail.stack.replace(window.location.origin, ""),
        location: window.location.pathname,
        time: Date.now(),
      })
    );
    return !1;
  };
