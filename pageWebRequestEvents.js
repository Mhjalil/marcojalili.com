!function() {
    var t,
    e,
    n,
    o = 0,
    u = function(t, e) {
        return "function" != typeof t || t.replaced ? t : (e.replaced = !0, e)
    };
    if ("undefined" != typeof CustomEvent && "function" == typeof window.dispatchEvent) {
        var r = function(t) {
            try {
                if ("object" == typeof t && (t = JSON.stringify(t)), "string" == typeof t)
                return window.dispatchEvent(new CustomEvent("lprequeststart", {
                    detail: {
                        data: t,
                        requestID: ++o
                    }
                })), o
            } catch (t) {}
        },
        s = function(t) {
            try {
                window.dispatchEvent(new CustomEvent("lprequestend", {
                    detail: t
                }))
            } catch (t) {}
        };
        "undefined" != typeof XMLHttpRequest && XMLHttpRequest.prototype && XMLHttpRequest.prototype.send && (XMLHttpRequest.prototype.send = u(XMLHttpRequest.prototype.send, (n = XMLHttpRequest.prototype.send, function(t) {
            var e = this,
            o = r(t);
            return o && e.addEventListener("loadend", function() {
                s({
                    requestID: o,
                    statusCode: e.status
                })
            }), n.apply(e, arguments)
        }))), "function" == typeof fetch && (fetch = u(fetch, (e = fetch, function(t, n) {
            var o = r(n),
            u = e.apply(this, arguments);
            if (o) {
                var c = function(t) {
                    s({
                        requestID: o,
                        statusCode: t && t.status
                    })
                };
                u.then(c).catch(c)
            }
            return u
        })));
        var c = function(t) {
            return u(t, function() {
                try {
                    this.dispatchEvent(new CustomEvent("lpsubmit"))
                } catch (t) {}
                return t.apply(this, arguments)
            })
        },
        i = function() {
            if (document && document.forms && document.forms.length > 0)
            for (var t = 0; t < document.forms.length; ++t)
            document.forms[t].submit = c(document.forms[t].submit)
        };
        document && "interactive" === document.readyState || "complete" === document.readyState ? i() : window.addEventListener("DOMContentLoaded", i, !0), Document.prototype.createElement = u(Document.prototype.createElement, (t = Document.prototype.createElement, function() {
            var e = t.apply(this, arguments);
            return e && "FORM" === e.nodeName && e.submit && (e.submit = c(e.submit)), e
        }))
    }
}();

