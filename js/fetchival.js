(function(e) {
  function n(e, n) {
    for (var t in n) e[t] = e[t] || n[t];
  }
  function t(e) {
    var n = Object.keys(e).map(function(n) {
      return n + "=" + encodeURIComponent(e[n]);
    });
    return "?" + n.join("&");
  }
  function o(e, o, r, s, i) {
    r.method = e;
    r.headers = r.headers || {};
    r.responseAs =
      r.responseAs && ["json", "text", "response"].indexOf(r.responseAs) >= 0
        ? r.responseAs
        : "json";
    n(r.headers, {
      Accept: "application/json",
      "Content-Type": "application/json"
    });
    if (i) {
      o += t(i);
    }
    if (s) {
      r.body = JSON.stringify(s);
    } else {
      delete r.body;
    }
    return fetchival.fetch(o, r).then(function(e) {
      if (e.status >= 200 && e.status < 300) {
        if (r.responseAs == "response") return e;
        if (e.status == 204) return null;
        return e[r.responseAs]();
      }
      var n = new Error(e.statusText);
      n.response = e;
      throw n;
    });
  }
  function fetchival(e, t) {
    t = t || {};
    var r = function(o, r) {
      o = e + "/" + o;
      r = r || {};
      n(r, t);
      return fetchival(o, r);
    };
    r.get = function(n) {
      return o("GET", e, t, null, n);
    };
    r.post = function(n) {
      return o("POST", e, t, n);
    };
    r.put = function(n) {
      return o("PUT", e, t, n);
    };
    r.patch = function(n) {
      return o("PATCH", e, t, n);
    };
    r.delete = function() {
      return o("DELETE", e, t);
    };
    return r;
  }
  fetchival.fetch = typeof fetch !== "undefined" ? fetch.bind(e) : null;
  if (typeof exports === "object") module.exports = fetchival;
  else if (typeof define === "function" && define.amd)
    define(function() {
      return fetchival;
    });
  else e.fetchival = fetchival;
})(typeof window != "undefined" ? window : undefined);
