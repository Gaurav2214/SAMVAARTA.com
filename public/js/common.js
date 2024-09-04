/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/common.js":
/*!********************************!*\
  !*** ./resources/js/common.js ***!
  \********************************/
/***/ (() => {

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Samvaarta.messageLog = {
  1: "Please provide your email ID",
  2: "Please provide a valid email ID",
  3: "Please provide your name",
  4: "Name must not contain any special symbols/numbers",
  5: "Please enter your password",
  6: "Password length must be 6-20",
  7: "You have already registered with Us, Please signin",
  8: "Please select your role",
  9: "Entered passwords do not match",
  10: "Please enter a new password",
  11: "Password has been changed successfully.",
  12: "Your Profile has been updated successfully."
};
var valError = true;
var apiUrl = typeof appUrl != "undefined" ? appUrl : "http://127.0.0.1:8000/";
var expireTime = 2 / (24 * 60);
Samvaarta.globalVar = Samvaarta.globalVar || {
  errorValueInFlow: "",
  is_Loggedin: 0,
  oauthToken: "",
  currlocation: ""
};
var elementInViewport = function elementInViewport(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;
  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }
  return top < window.pageYOffset + window.innerHeight && left < window.pageXOffset + window.innerWidth && top + height > window.pageYOffset && left + width > window.pageXOffset;
};
var unvielImg = function unvielImg(selector, unveilSelector) {
  var selector = selector || "body";
  $(selector).find("img.unveil").each(function (i, v) {
    var escapedWithParents = '.slide-container,.logos,[class*="wrapper_style"]';
    var isTheImgEscaped = $(this).parents(escapedWithParents).length;
    var unveilSelect = unveilSelector || elementInViewport(v) || isTheImgEscaped;
    if (unveilSelect) {
      $this = $(this);
      try {
        $this.attr("data-init-src", $this.attr("src"));
        if ($this.attr("data-src") != "" && $this.attr("data-src") != null) {
          $this.attr("src", $this.attr("data-src"));
          $this.removeClass("unveil");
        } else {
          $this.attr("src", $this.attr("data-init-src"));
        }
        $this.on("error", function () {
          $(this).unbind("error").attr("src", $(this).data("init-src"));
        });
      } catch (e) {}
    }
  });
};
var checkIfImageExists = function checkIfImageExists(url, callback) {
  var img = new Image();
  img.src = url;
  if (url != "") {
    if (img.complete) {
      callback(true);
    } else {
      img.onload = function () {
        callback(true);
      };
      img.onerror = function () {
        callback(false);
      };
    }
  } else {
    callback(false);
  }
};
Samvaarta.common = function () {
  var isNull = function isNull(obj) {
    return obj == null || obj == "null";
  };
  var isUndefined = function isUndefined(obj) {
    return obj == undefined;
  };
  var isBlank = function isBlank(obj) {
    return typeof obj == "undefined" || obj == "";
  };
  var isOperatable = function isOperatable(obj) {
    if (_typeof(obj) == "object" && !isNull(obj)) {
      return Object.keys(obj).length == 0 ? false : true;
    } else {
      return !this.isBlank(obj) && !this.isNull(obj) && !this.isUndefined(obj);
    }
  };
  var setLocalStorage = function setLocalStorage(key, data, exdays) {
    var $data = {};
    $data["expires"] = Math.floor(Date.now() / 1000) + exdays * 24 * 60 * 60;
    $data["data"] = data;
    localStorage.setItem(key, JSON.stringify($data));
  };
  var getLocalStorage = function getLocalStorage(key) {
    var $data = localStorage.getItem(key);
    if ($data != null) {
      $data = JSON.parse($data);
      var lsexpires = $data["expires"];
      if (Math.floor(Date.now() / 1000) >= lsexpires) {
        deleteLocalStorage(key);
        return null;
      }
      if ("data" in $data) return $data["data"];else {
        deleteLocalStorage(key);
        return null;
      }
    } else {
      return null;
    }
  };
  var deleteLocalStorage = function deleteLocalStorage(key) {
    localStorage.removeItem(key);
  };
  var encodeHTML = function encodeHTML(param) {
    if (!param) {
      return param;
    }
    return param.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  };
  var validateName = function validateName(name, key) {
    var error = "";
    name = name.replace(/ /g, "");
    function handleBlankNameVal(msgkey1, msgkey2) {
      if (name == "") {
        error = Samvaarta.messageLog[msgkey1];
      } else if (!name.match(/^([a-zA-Z]+)$/i)) {
        error = Samvaarta.messageLog[msgkey2];
      }
    }
    switch (key) {
      case "oauth_log_name":
        handleBlankNameVal(3, 4);
      case "oauth_log_role":
        handleBlankNameVal(8);
    }
    return error;
  };
  var validatePhone = function validatePhone(value, key) {
    var phonePattern = /^\d{10}$/;
    if (!phonePattern.test(value)) {
      return "Please enter a valid 10-digit phone number.";
    }
    return "";
  };
  var validatePassword = function validatePassword(password, key) {
    var error = "";
    password = password.replace(/ /g, "");
    switch (key) {
      case "oauth_log_pswd":
      case "oauth_curr_password":
      case "oauth_frgt_pswd_password":
      case "oauth_verify_registration_password":
      case "oauth_registration_password":
        if (password == "") {
          error = Samvaarta.messageLog[5];
        } else if (password.length < 6) {
          error = Samvaarta.messageLog[6];
        } else if (password.length > 20) {
          error = Samvaarta.messageLog[6];
        }
        break;
      case "oauth_new_password1":
        if (password == "") {
          error = Samvaarta.messageLog[10];
        } else if (password.length < 6) {
          error = Samvaarta.messageLog[6];
        } else if (password.length > 20) {
          error = Samvaarta.messageLog[6];
        }
        break;
      case "oauth_new_password2":
        var newpass = document.getElementById("oauth_new_password1").value;
        if (password != newpass) {
          error = Samvaarta.messageLog[9];
        }
    }
    return error;
  };
  var isValidEmail = function isValidEmail(email) {
    var pattern = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (!pattern.test(email)) {
      return false;
    } else {
      return true;
    }
  };
  var validateEmail = function validateEmail(email) {
    var error = "";
    email = email.replace(/^\s+|\s+$/gm, "");
    if (email == "") {
      error = Samvaarta.messageLog[1];
    } else if (!isValidEmail(email)) {
      error = Samvaarta.messageLog[2];
    }
    return error;
  };
  var removeRequiredFields = function removeRequiredFields(e) {
    var id, value;
    if (e.type != "blur") {
      id = $(e).attr("id");
      value = $("#" + id).val();
    } else {
      id = $(e.target).attr("id");
      value = $("#" + id).val();
    }
    if (value) {
      value = encodeHTML(value);
      $("#" + id + "_err").html("").hide();
      $("#" + id + "_err").siblings("input").removeClass("error");
      validateFields(id, value);
    } else {
      validateFields(id, value);
    }
  };
  var validateFields = function validateFields(id, value) {
    var error_val = true;
    valError = false;
    Samvaarta.globalVar.errorValueInFlow = "";

    // Mapping of field IDs to validation functions
    var valParam = {
      oauth_log_name: validateName,
      oauth_log_email: validateEmail,
      oauth_log_password: validatePassword,
      oauth_log_number: validatePhone,
      oauth_log_role: validateName,
      oauth_curr_password: validatePassword,
      oauth_new_password1: validatePassword,
      oauth_new_password2: validatePassword
    };

    // Iterate through the validation functions
    for (var key in valParam) {
      if (valParam.hasOwnProperty(key)) {
        var valFunction = valParam[key];
        if (id === key) {
          error_val = valFunction(value, key);
          if (error_val) {
            document.getElementById(key + "_err").innerHTML = error_val;
            document.getElementById(key + "_err").style.display = "block";
            valError = true;
            Samvaarta.globalVar.errorValueInFlow = error_val;

            // Remove autocomplete items if they exist
            var autocompleteItems = document.querySelectorAll(".autocomplete-items");
            if (autocompleteItems.length) {
              autocompleteItems.forEach(function (item) {
                item.remove();
              });
            }
            return false;
          }
        }
      }
    }
    return true;
  };
  var hitAjaxApi = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(requestSet, ajaxSuccess, ajaxError) {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (isOperatable(requestSet)) {
              requestSet = requestSet || {};
              requestSet.data = requestSet.data || {};
              requestSet.headers = requestSet.headers || {};
              axios({
                method: requestSet.type || "POST",
                url: requestSet.url,
                data: requestSet.data,
                headers: requestSet.headers
              }).then(function (response) {
                ajaxSuccess(response);
              })["catch"](function (error) {
                ajaxError(error);
              });
            }
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function hitAjaxApi(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
  var dateMonthYear = function dateMonthYear(timestampVal) {
    var timestamp = timestampVal;

    // Create a Date object
    var date = new Date(timestamp);

    // Extract year, month, and day
    var year = date.getFullYear();
    var month = date.toLocaleString("default", {
      month: "long"
    }); // 'long' for full month name
    var day = date.getDate();

    // Format the date as "Month Day, Year"
    var formattedDate = "".concat(month, " ").concat(day, ", ").concat(year);
    return formattedDate;
  };
  var getLocation = function getLocation() {
    var paramObject = {
      url: "https://st.etb2bimg.com/locinfo",
      type: "GET",
      data: {},
      headers: {
        Accept: "application/json"
      }
    };
    function ajaxSuccessCall(data) {
      Samvaarta.common.setLocalStorage("location", data, 1);
    }
    function ajaxErrorCall(data) {}
    if (!Samvaarta.common.getLocalStorage("location")) {
      Samvaarta.common.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
    } else {
      var loc = Samvaarta.common.getLocalStorage("location");
      Samvaarta.globalVar.currlocation = loc.data.city;
    }
  };
  var toastMsg = function toastMsg(tmsg) {
    $('.info_consentmsg').remove();
    var cnsetMsg = "<div class=\"info_success info_consentmsg\">\n                            <div class=\"info_success__inner\">\n                            <span>".concat(tmsg, "</span>\n                            <a class=\"info_close\"><span class=\"sprite-icon-img close-info\"></span></a>    \n                            </div>                \n                            </div>");
    $('body').append(cnsetMsg);
    setTimeout(function () {
      $('.info_consentmsg').remove();
    }, 4000);
    $('body').on('click', '.info_close', function () {
      $('.info_consentmsg').remove();
    });
  };
  return {
    isNull: isNull,
    isBlank: isBlank,
    isUndefined: isUndefined,
    isOperatable: isOperatable,
    hitAjaxApi: hitAjaxApi,
    setLocalStorage: setLocalStorage,
    getLocalStorage: getLocalStorage,
    deleteLocalStorage: deleteLocalStorage,
    encodeHTML: encodeHTML,
    removeRequiredFields: removeRequiredFields,
    dateMonthYear: dateMonthYear,
    getLocation: getLocation,
    toastMsg: toastMsg
  };
}();
Samvaarta.model = function () {
  var open_pop = function open_pop(custom_function, add_class, head, close, href) {
    var modelBoxes = document.querySelectorAll(".model-box");
    var model_id = modelBoxes.length === 0 ? 1 : modelBoxes.length + 1;
    var obj_id = "model_" + head;
    var xtra_cls = " ";
    if (add_class) {
      xtra_cls += add_class;
    }
    if (!href) {
      href = "";
    }
    var append_str = "";
    var close_txt = "";
    close_txt = close === "N" ? "" : '<a onclick="Samvaarta.model.close_pop(1);" class="close" style="z-index:9999">&#10005;</a>';
    append_str = '<div id="' + obj_id + '" class="model-container ' + xtra_cls + '" style="display:none;">' + close_txt + '<div class="model-wrapper"><div class="model-content" id="model_content_' + model_id + '"><span class="pre_loader" id="pre_loader_' + model_id + '"><span class="loader">&nbsp;</span>Loading...</span></div></div></div>';
    document.body.insertAdjacentHTML("beforeend", append_str);
    var popupElement = document.getElementById(obj_id);
    popupElement.style.display = "block";
    document.body.insertAdjacentHTML("beforeend", '<div id="l2_overlay_bx_' + model_id + '" class="model-bg "></div>');
    var wrapperDiv = document.createElement("div");
    wrapperDiv.className = "model-box";
    wrapperDiv.id = "wrapper_" + model_id;
    popupElement.parentNode.insertBefore(wrapperDiv, popupElement);
    wrapperDiv.appendChild(popupElement);
    var modelElement = document.getElementById(obj_id);
    if (modelElement) {
      modelElement.style.display = "table";
    }
    try {
      if (href && custom_function) {
        custom_function(href, model_id);
      } else if (custom_function) {
        custom_function(model_id);
      }
    } catch (e) {}
    return model_id;
  };
  var close_pop = function close_pop(obj) {
    if (obj) {
      var popupElement = document.getElementById("model_" + obj);
      if (popupElement) {
        var overlayElement = document.getElementById("l2_overlay_bx_" + obj);
        var wrapperElement = document.getElementById("wrapper_" + obj);
        if (document.getElementById("model_" + obj).classList.contains("fadeInUp")) {
          popupElement.classList.remove("fadeInUp");
          popupElement.classList.add("fadeInDown");
          if (overlayElement) overlayElement.remove();
          if (wrapperElement) wrapperElement.remove();
        } else {
          if (overlayElement) overlayElement.remove();
          if (wrapperElement) wrapperElement.remove();
        }
      }
    }
  };
  var showSuccessMessage = function showSuccessMessage(msg, commonStyle) {
    var popupClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
    Samvaarta.model.close_pop(1);
    if (!msg) {
      msg = "Success";
    }
    var extraMsg = "";
    if (/<\/?[a-z][\s\S]*>/i.test(msg)) {
      extraMsg = msg;
      msg = "";
    }
    Samvaarta.model.open_pop("", "modal-confirm layer-out " + popupClass, 1);
    $("#model_content_1").html(extraMsg);
    setTimeout(function () {
      if ($(".modal-confirm.layer-out").length) {
        //Samvaarta.model.close_pop(1);
      }
    }, 25000);
  };
  return {
    open_pop: open_pop,
    close_pop: close_pop,
    showSuccessMessage: showSuccessMessage
  };
}();
Samvaarta.system = function () {
  var createRegForm = function createRegForm() {
    var regForm = "\n        <div class=\"reg-form\">\n            <div class=\"heading\">\n                <h2>Create an account to get started</h2>\n                <p>Kindly fill in your details to create an account</p>\n            </div>\n            <form class=\"authentication-form\">\n                <div class=\"form-elm-section input_sec \">\n                    <label for=\"oauth_log_name\"> Name</label>\n                    <input required=\"\" data-id=\"\" placeholder=\"\" name=\"\" type=\"text\" id=\"oauth_log_name\" class=\"input_txt_box\" value=\"\">\n\n                    <p id=\"oauth_log_name_err\" class=\"validation error\"></p>\n                </div>\n                <div class=\"form-elm-section input_sec \">\n                    <label for=\"oauth_log_email\"> Email Id</label>\n                    <input required=\"\" data-id=\"\" placeholder=\"\" name=\"\" type=\"text\" id=\"oauth_log_email\" class=\"input_txt_box\" value=\"\">\n                    <p id=\"oauth_log_email_err\" class=\"validation error\"></p>\n                </div>\n                <div class=\"form-elm-section input_sec \">\n                    <label for=\"oauth_log_password\"> Password</label>\n                    <input required=\"\" data-id=\"\" placeholder=\"\" name=\"\" type=\"password\" id=\"oauth_log_password\" class=\"input_txt_box\" value=\"\">\n                    <p id=\"oauth_log_password_err\" class=\"validation error\"></p>\n                </div>\n                <div class=\"form-elm-section input_sec_num \">\n                    <label for=\"oauth_log_number\"> Phone No</label>\n                    <select>\n                        <option value=\"+91\">+91</option>\n                        <option value=\"+91\">+01</option>\n                        <option value=\"+91\">+31</option>\n                        <option value=\"+91\">+11</option>\n                        <option value=\"+91\">+90</option>\n                    </select>\n                    <input required=\"\" data-id=\"\" placeholder=\"\" name=\"\" type=\"text\" id=\"oauth_log_number\" class=\"input_txt_box\" value=\"\">\n                    <p id=\"oauth_log_number_err\" class=\"validation error\"></p>\n                </div>\n                <div class=\"input-section-main\">\n                    <div class=\"form-elm-section input_sec \">\n                        <label for=\"oauth_log_lnurl\"> LinkedIn URL</label>\n                        <input required=\"\" data-id=\"\" placeholder=\"\" name=\"\" type=\"text\" id=\"oauth_log_lnurl\" class=\"input_txt_box\" value=\"\">\n                        <p id=\"oauth_log_lnurl_err\" class=\"validation error\"></p>\n                    </div>\n                    <div class=\"form-elm-section input_sec_role \">\n                        <label for=\"oauth_log_role\"> Role</label>\n                        <select class=\"input_txt_box\" id=\"oauth_log_role\">\n                            <option value=\"\">Select your Role</option>\n                            <option value=\"admin\">Admin</option>\n                            <option value=\"trainer\">Trainer</option>\n                            <option value=\"user\">User</option>\n                        </select>\n                        <p id=\"oauth_log_role_err\" class=\"validation error\"></p>\n                    </div>\n                </div>\n                <div class=\"form-elm-section input_sec_center btn-container\">\n                    <button class=\"btn\" type=\"button\" onclick=\"Samvaarta.system.userRegistration()\">Submit</button>\n                </div>\n            </form>\n            <p class=\"reg-login-toggle\">Already have the Samvaarta account?\n                <a role=\"button\" tabindex=\"0\" rel=\"noreferrer nofollow\" class=\"login-link\">Log in</a>\n            </p>\n        </div>\n        ";
    if (document.querySelector(".login-module__main--right")) {
      document.querySelector(".login-module__main--right").innerHTML = regForm;
    }
    showFormToggle();
  };
  var createLoginForm = function createLoginForm() {
    var loginForm = "\n        <div class=\"login-form\">\n            <div class=\"heading\">\n                <h2>Log in to your account</h2>\n                <p class=\"hide\">Kindly fill in your details to create an account</p>\n            </div>\n            <form class=\"signin-form\">\n\n                <div class=\"form-elm-section input_sec \">\n                    <label for=\"oauth_log_email\"> Email Id</label>\n                    <input required=\"\" data-id=\"\" placeholder=\"\" name=\"\" type=\"text\" id=\"oauth_log_email\" class=\"input_txt_box\" value=\"\">\n                    <p id=\"oauth_log_email_err\" class=\"validation error\"></p>\n                </div>\n                <div class=\"form-elm-section input_sec \">\n                    <label for=\"oauth_log_password\"> Password</label>\n                    <input required=\"\" data-id=\"\" placeholder=\"\" name=\"\" type=\"password\" id=\"oauth_log_password\" class=\"input_txt_box\" value=\"\">\n                    <p id=\"oauth_log_password_err\" class=\"validation error\"></p>\n                </div>\n\n                <div class=\"form-elm-section input_sec_center btn-container \">\n                    <button class=\"btn\" type=\"button\" onclick=\"Samvaarta.system.loginUser()\">Submit</button>\n                </div>\n            </form>\n            <p class=\"reg-login-toggle\">Don't have the Samvaarta account?\n                <a role=\"button\" tabindex=\"0\" rel=\"noreferrer nofollow\" class=\"signup-link\">Create one</a>\n            </p>\n        </div>\n        ";
    document.querySelector(".login-module__main--right").innerHTML = loginForm;
    showFormToggle();
  };
  var showFormToggle = function showFormToggle() {
    var _document$querySelect, _document$querySelect2;
    (_document$querySelect = document.querySelector(".signup-link")) === null || _document$querySelect === void 0 || _document$querySelect.addEventListener("click", function () {
      createRegForm();
    });
    (_document$querySelect2 = document.querySelector(".login-link")) === null || _document$querySelect2 === void 0 || _document$querySelect2.addEventListener("click", function () {
      createLoginForm();
    });
  };
  var showChangePassword = function showChangePassword(lid) {
    var changePwd = "\n            <div id=\"reset-pwd\" class=\"password-change\">\n                <div class=\"showloader\"></div>\n                <h2>Change Password</h2>\n                <div class=\"row\">\n                    <div class=\"col-md-12\">\n                        <form method=\"post\" id=\"targetform\"> \n                        <div class=\"form-elm-section input_sec \">\t\t\t\t\t\t\t\t\t\n                            <i class=\"lg_sprite oauth-eye-slash show-pwd\" aria-hidden=\"true\" data-testid=\"show-password\">\n                            </i>\n                            <label for=\"oauth_curr_password\">\n                                Current Password\n                            </label>\n                            <input required=\"\" data-id=\"\" placeholder=\"\" name=\"\" type=\"password\" id=\"oauth_curr_password\" class=\"input_txt_box \" value=\"\"> \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<p id=\"oauth_curr_password_err\" class=\"error validation\">\n\t\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t\t</div> <div class=\"form-elm-section input_sec \">\n\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<i class=\"lg_sprite oauth-eye-slash show-pwd\" aria-hidden=\"true\" data-testid=\"show-password\">\n\t\t\t\t\t\t\t\t\t</i>\n                                    <label for=\"oauth_new_password1\">\n                                        New Password\n                                    </label>\n\t\t\t\t\t\t\t\t\t<input required=\"\" data-id=\"\" placeholder=\"\" name=\"\" type=\"password\" id=\"oauth_new_password1\" class=\"input_txt_box \" value=\"\"> \n\t\t\t\t\t\t\t\t\t<p id=\"oauth_new_password1_err\" class=\"error validation\"></p>\n\t\t\t\t\t\t\t\t</div> \n                                <div class=\"form-elm-section input_sec \">\t\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\t<i class=\"lg_sprite oauth-eye-slash show-pwd\" aria-hidden=\"true\" data-testid=\"show-password\">\n\t\t\t\t\t\t\t\t\t</i>\n                                    <label for=\"oauth_new_password2\">\n                                        Confirm New Password\n                                    </label>\n\t\t\t\t\t\t\t\t\t<input required=\"\" data-id=\"\" placeholder=\"\" name=\"\" type=\"password\" id=\"oauth_new_password2\" class=\"input_txt_box \" value=\"\"> \n\t\t\t\t\t\t\t\t\t<p id=\"oauth_new_password2_err\" class=\"error validation\"></p>\n\t\t\t\t\t\t\t\t</div>\n                                <p class=\"error\" id=\"main_password_err\"></p><div class=\"form-elm-section\"><input type=\"button\" onclick=\"Samvaarta.system.passwordUpdated(1);\" class=\"btn submit-button2\" name=\"submit_new_password\" value=\"Continue\"></div></form></div></div></div>\n        ";
    $("#model_content_" + lid).html(changePwd);
  };
  var changePassword = function changePassword() {
    Samvaarta.model.open_pop(showChangePassword, "", 1);
  };
  var passwordUpdated = function passwordUpdated() {
    var paswrd = document.getElementById("oauth_curr_password").value;
    var new_paswrd = document.getElementById("oauth_new_password1").value;
    var cnfm_paswrd = document.getElementById("oauth_new_password2").value;
    var errorElements = document.querySelectorAll(".error");
    errorElements.forEach(function (el) {
      el.innerHTML = "";
    });
    var inputElements = document.querySelectorAll("#reset-pwd .input_txt_box");
    for (var i = 0; i < inputElements.length; i++) {
      if (inputElements[i].type !== "button" && inputElements[i].type !== "checkbox") {
        Samvaarta.common.removeRequiredFields(inputElements[i]);
        if (valError) {
          return false;
        }
      }
    }
    if (valError) {
      return false;
    } else {
      var ajaxSuccessCall = function ajaxSuccessCall(data) {
        Samvaarta.model.close_pop(1);
        Samvaarta.model.showSuccessMessage("<h2>Thank You</h2><p>".concat(Samvaarta.messageLog[11], "</p>"), "y");
      };
      var ajaxErrorCall = function ajaxErrorCall(data) {
        $(".showloader").hide();
        if (data.responseJSON.code != 200) {
          $("#oauth_new_password2_err").html(data.responseJSON.message).show();
        } else {
          Samvaarta.model.close_pop(1);
        }
      };
      var paramObject = {
        url: apiUrl + "api/profile/update",
        type: "POST",
        data: {
          password_old: paswrd,
          password: new_paswrd,
          password_confirmation: cnfm_paswrd,
          action: "password"
        },
        headers: {
          Authorization: "Bearer ".concat(Samvaarta.globalVar.oauthToken.access_token),
          Accept: "application/json"
        }
      };
      Samvaarta.common.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
    }
  };
  var editProfile = function editProfile() {
    var _getOuathData$data$da, _getOuathData, _getOuathData2, _getOuathData3, _getOuathData4, _getOuathData5, _getOuathData6, _getOuathData7, _getOuathData8, _getOuathData9, _Samvaarta$common$get;
    var getOuathData = Samvaarta.common.getLocalStorage("oauthUserData");
    getOuathData = (_getOuathData$data$da = getOuathData.data.data) !== null && _getOuathData$data$da !== void 0 && _getOuathData$data$da.name ? getOuathData.data.data : getOuathData.data;
    var profileDetail = "\n            <h2 class=\"align-center\">Edit Profile</h2>\n            <div class=\"edit-profile__inner component-divider\">\n                <div class=\"edit-profile__inner--left photo-upload-container\">\n                    <div class=\"circle\">\n                        <img width=\"128\" height=\"128\" class=\"profile-pic\" src=\"".concat(getOuathData.avatar ? getOuathData.avatar : "/images/default-face.jpg", "\">\n\n                    </div>\n                    <div class=\"p-image\">\n                        <i class=\"fa fa-camera upload-button\"></i>\n                        <input class=\"file-upload\" type=\"file\" accept=\"image/*\" />\n                    </div>\n                </div>\n\n                <div class=\"edit-profile__inner--right\">\n                    <div class=\"form-elm-section input_sec \">\n                        <label for=\"oauth_log_email\">\n                            Email ID\n                        </label>\n                        <input required=\"\" data-id=\"\" placeholder=\"\" name=\"\" type=\"text\" id=\"oauth_log_email\" class=\"input_txt_box readonly valid\" value=\"").concat(getOuathData.email, "\" readonly=\"true\" title=\"\">\n                        <p id=\"oauth_log_email_err\" class=\"error\"></p>\n                    </div>\n\n                    <div class=\"input-section-main\">\n                        <div class=\"form-elm-section input_sec \">\n                            <label for=\"oauth_log_name\">\n                                Name\n                            </label>\n                            <input required=\"\" data-id=\"\" placeholder=\"\" name=\"\" type=\"text\" id=\"oauth_log_name\" class=\"input_txt_box valid\" value=\"").concat(getOuathData.name, "\" maxlength=\"45\" title=\"\">\n                            <p id=\"oauth_log_name_err\" class=\"error\">\n                            </p>\n                        </div>\n                        <div class=\"form-elm-section input_sec \">\n                            <label for=\"oauth_function\">\n                                Function\n                            </label>\n                            <input required=\"\" data-id=\"\" placeholder=\"\" name=\"\" type=\"text\" id=\"oauth_function\" class=\"input_txt_box valid\" value=\"").concat((_getOuathData = getOuathData) !== null && _getOuathData !== void 0 && _getOuathData.user_function ? (_getOuathData2 = getOuathData) === null || _getOuathData2 === void 0 ? void 0 : _getOuathData2.user_function : "", "\" maxlength=\"45\" title=\"\" >\n                            <p id=\"oauth_function_err\" class=\"error\">\n                            </p>\n                        </div>\n                    </div>\n                    <div class=\"input-section-main\">\n                    <div class=\"form-elm-section input_sec \">\n                        <label for=\"oauth_doj\">\n                            Date of Joining\n                        </label>\n                        <input required=\"\" data-id=\"\" readonly=\"true\" placeholder=\"\" name=\"\" type=\"text\" id=\"oauth_doj\" class=\"input_txt_box valid\" value=\"").concat(Samvaarta.common.dateMonthYear(getOuathData.created_at), "\" maxlength=\"45\" title=\"\">\n                        <p id=\"oauth_doj_err\" class=\"error\">\n                        </p>\n                    </div>\n                    <div class=\"form-elm-section input_sec \">\n                        <label for=\"oauth_experience\">\n                            Experience\n                        </label>\n                        <input required=\"\" data-id=\"\" placeholder=\"\" name=\"\" type=\"text\" id=\"oauth_experience\" class=\"input_txt_box valid\" value=\"").concat(getOuathData.experience, "\" maxlength=\"45\" title=\"\">\n                        <p id=\"oauth_experience_err\" class=\"error\">\n                        </p>\n                    </div>\n                    </div>\n                    <div class=\"input-section-main\">\n                        <div class=\"form-elm-section input_sec \">\n                            <label for=\"oauth_log_vision\"> Vision</label>\n                            <input required=\"\" data-id=\"\" placeholder=\"\" name=\"\" type=\"text\" id=\"oauth_log_vision\" class=\"input_txt_box\" value=\"").concat((_getOuathData3 = getOuathData) !== null && _getOuathData3 !== void 0 && _getOuathData3.vision ? (_getOuathData4 = getOuathData) === null || _getOuathData4 === void 0 ? void 0 : _getOuathData4.vision : '', "\">\n                            <p id=\"oauth_log_vision_err\" class=\"validation error\"></p>\n                        </div>\n                        <div class=\"form-elm-section input_sec_role \">\n                            <label for=\"oauth_log_description\"> Description</label>\n                            <input required=\"\" data-id=\"\" placeholder=\"\" name=\"\" type=\"text\" id=\"oauth_log_description\" class=\"input_txt_box\" value=\"").concat((_getOuathData5 = getOuathData) !== null && _getOuathData5 !== void 0 && _getOuathData5.description ? (_getOuathData6 = getOuathData) === null || _getOuathData6 === void 0 ? void 0 : _getOuathData6.description : '', "\">\n\n                            <p id=\"oauth_log_description_err\" class=\"validation error\"></p>\n                        </div>\n                    </div>\n\n                    <div class=\"input-section-main\">\n                        <div class=\"form-elm-section input_sec \">\n                            <label for=\"oauth_log_lnurl\"> LinkedIn URL</label>\n                            <input required=\"\" data-id=\"\" placeholder=\"\" name=\"\" type=\"text\" id=\"oauth_log_lnurl\" class=\"input_txt_box\" value=\"").concat((_getOuathData7 = getOuathData) === null || _getOuathData7 === void 0 ? void 0 : _getOuathData7.linkedin_url, "\">\n                            <p id=\"oauth_log_lnurl_err\" class=\"validation error\"></p>\n                        </div>\n                        <div class=\"form-elm-section input_sec_role \">\n                            <label for=\"oauth_log_role\"> Role</label>\n                            <input required=\"\" data-id=\"\" placeholder=\"\" name=\"\" type=\"text\" id=\"oauth_log_role\" class=\"input_txt_box\" value=\"").concat((_getOuathData8 = getOuathData) === null || _getOuathData8 === void 0 ? void 0 : _getOuathData8.user_type, "\">\n\n                            <p id=\"oauth_log_role_err\" class=\"validation error\"></p>\n                        </div>\n                    </div>\n                    <div class=\"input-section-main\">\n                        <div class=\"form-elm-section input_sec_num \">\n                            <label for=\"oauth_log_number\"> Phone No</label>\n                            <select>\n                                <option value=\"+91\">+91</option>\n                                <option value=\"+91\">+01</option>\n                                <option value=\"+91\">+31</option>\n                                <option value=\"+91\">+11</option>\n                                <option value=\"+91\">+90</option>\n                            </select>\n                            <input required=\"\" data-id=\"\" placeholder=\"\" name=\"\" type=\"text\" id=\"oauth_log_number\" class=\"input_txt_box\" value=\"").concat((_getOuathData9 = getOuathData) === null || _getOuathData9 === void 0 ? void 0 : _getOuathData9.phone, "\">\n                            <p id=\"oauth_log_number_err\" class=\"validation error\"></p>\n                        </div>\n                        <div class=\"form-elm-section input_sec \">\n                            <label for=\"oauth_location\">\n                                Location\n                            </label>\n                            <input required=\"\" data-id=\"\" readonly=\"true\" placeholder=\"\" name=\"\" type=\"text\" id=\"oauth_location\" class=\"input_txt_box valid\" value=\"").concat(getOuathData.location ? getOuathData.location : (_Samvaarta$common$get = Samvaarta.common.getLocalStorage("location")) === null || _Samvaarta$common$get === void 0 || (_Samvaarta$common$get = _Samvaarta$common$get.data) === null || _Samvaarta$common$get === void 0 ? void 0 : _Samvaarta$common$get.city, "\" maxlength=\"50\" title=\"\">\n                            <p id=\"oauth_location_err\" class=\"error\"></p>\n                    </div>\n                    </div>\n                    <div class=\"form-elm-section marg-t20\">\n                        <input type=\"button\" class=\"btn submit-button2\" name=\"submit_profile\" onclick=\"Samvaarta.system.userEditProfileUpdated(1);\" value=\"Update Profile Details\">\n                    </div>\n                </div>\n            </div>\n        ");
    document.querySelector("#edit-profile").innerHTML = profileDetail;
    photoUploadView();
  };
  var userEditProfileUpdated = function userEditProfileUpdated() {
    var reg_name = document.getElementById("oauth_log_name").value;
    var reg_email = document.getElementById("oauth_log_email").value;
    var vision = document.getElementById("oauth_log_vision").value;
    var userfunction = document.getElementById("oauth_function").value;
    var description = document.getElementById("oauth_log_description").value;
    var experience = document.getElementById("oauth_experience").value;
    var reg_phone = document.getElementById("oauth_log_number").value;
    var reg_linkedin = document.getElementById("oauth_log_lnurl").value;
    var reg_role = document.getElementById("oauth_log_role").value;
    var reg_avatar = document.querySelector(".profile-pic").src;
    var errorElements = document.querySelectorAll(".error");
    errorElements.forEach(function (el) {
      el.innerHTML = "";
    });
    var inputElements = document.querySelectorAll(".edit-profile__inner .input_txt_box");
    for (var i = 0; i < inputElements.length; i++) {
      if (inputElements[i].type !== "button" && inputElements[i].type !== "checkbox") {
        Samvaarta.common.removeRequiredFields(inputElements[i]);
        if (valError) {
          return false;
        }
      }
    }
    if (valError) {
      return false;
    } else {
      var paramObject = {
        url: apiUrl + "api/profile/update",
        type: "POST",
        data: {
          email: reg_email,
          name: reg_name,
          phone: reg_phone,
          linkedin_url: reg_linkedin,
          user_type: reg_role,
          avatar: reg_avatar,
          action: "profile",
          vision: vision,
          description: description,
          experience: experience,
          user_function: userfunction
        },
        headers: {
          Authorization: "Bearer ".concat(Samvaarta.globalVar.oauthToken.access_token),
          Accept: "application/json"
        }
      };
      var ajaxSuccessCall = function ajaxSuccessCall(response) {
        Samvaarta.model.showSuccessMessage("<h2>Thank You</h2><p class=\"marg-t20\">".concat(Samvaarta.messageLog[12], "</p>"), "y");
        Samvaarta.common.setLocalStorage("oauthUserData", response, 1);
      };
      var ajaxErrorCall = function ajaxErrorCall(response) {
        console.log(response);
      };
      Samvaarta.common.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
    }
  };
  var logout = function logout() {
    Samvaarta.common.deleteLocalStorage("oauthUserData");
    Samvaarta.globalVar.is_loggedin = 0;
    window.location.href = "/";
  };
  var successReg = function successReg(id) {
    var msg = "\n            <figure class=\"\">\n                <img alt=\"/images/\" src=\"/images/user-default.svg\" width=\"80\" height=\"80\" />\n            </figure>\n            <h3>Your profile is undes review.</h3>\n            <h4>A confirmation will be sent to your email ID <span>".concat(id, "</span></h4>\n        ");
    //document.querySelector('model_content_1').innerHTML = msg;
    return msg;
  };
  var getUserData = function getUserData(response) {
    var paramObject = {
      url: apiUrl + "api/profile",
      type: "GET",
      data: {},
      headers: {
        Authorization: "Bearer ".concat(response.access_token)
      }
    };
    var ajaxSuccessCall = function ajaxSuccessCall(response) {
      Samvaarta.common.setLocalStorage("oauthUserData", response, 1);
      window.location.href = "/dashboard";
    };
    var ajaxErrorCall = function ajaxErrorCall(response) {
      console.log(response);
    };
    Samvaarta.common.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
  };
  var loginUser = function loginUser() {
    var reg_email = document.getElementById("oauth_log_email").value;
    var reg_pwd = document.getElementById("oauth_log_password").value;
    var errorElements = document.querySelectorAll(".error");
    errorElements.forEach(function (el) {
      el.innerHTML = "";
    });
    var inputElements = document.querySelectorAll(".signin-form .input_txt_box");
    for (var i = 0; i < inputElements.length; i++) {
      if (inputElements[i].type !== "button" && inputElements[i].type !== "checkbox") {
        Samvaarta.common.removeRequiredFields(inputElements[i]);
        if (valError) {
          return false;
        }
      }
    }
    if (valError) {
      return false;
    } else {
      var paramObject = {
        url: apiUrl + "api/login",
        type: "POST",
        data: {
          email: reg_email,
          password: reg_pwd
        }
      };
      var ajaxSuccessCall = function ajaxSuccessCall(response) {
        if (response.data.error) {
          $("#oauth_log_password_err").html(response.data.error).show();
        } else {
          Samvaarta.common.setLocalStorage("AccessToken", response.data, 1);
          getUserData(response.data);
        }
      };
      var ajaxErrorCall = function ajaxErrorCall(response) {
        if (response.response) {
          $("#oauth_log_password_err").html(response.response.data.message);
        }
      };
      Samvaarta.common.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
    }
  };
  var verifyEmail = function verifyEmail() {
    var urlParams = new URLSearchParams(window.location.search);
    var verify_token = urlParams.get("token");
    var getOuathData = Samvaarta.common.getLocalStorage("oauthUserData");
    if (verify_token) {
      var paramObject = {
        url: apiUrl + "auth/verify-email",
        type: "post",
        data: {
          email: getOuathData.user.email
        },
        headers: {
          token: verify_token
        }
      };
      var ajaxSuccessCall = function ajaxSuccessCall(response) {
        console.log(response);
      };
      var ajaxErrorCall = function ajaxErrorCall(error) {
        console.log(error);
      };
      Samvaarta.common.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
    }
  };
  var sendVerificationMail = function sendVerificationMail(response) {
    var paramObject = {
      url: apiUrl + "auth/send-verification-email",
      type: "post",
      headers: {
        Authorization: "Bearer " + response.data.tokens.access.token,
        "Content-Type": "application/json"
      }
    };
    var ajaxSuccessCall = function ajaxSuccessCall(response) {
      console.log(response);
    };
    var ajaxErrorCall = function ajaxErrorCall(error) {
      console.log(error);
    };
    Samvaarta.common.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
  };
  var userRegistration = function userRegistration() {
    var reg_name = document.getElementById("oauth_log_name").value;
    var reg_email = document.getElementById("oauth_log_email").value;
    var reg_pwd = document.getElementById("oauth_log_password").value;
    var reg_phone = document.getElementById("oauth_log_number").value;
    var reg_linkedin = document.getElementById("oauth_log_lnurl").value;
    var reg_role = document.getElementById("oauth_log_role").value;
    var reg_avatar = document.querySelector(".profile-pic").src;
    var errorElements = document.querySelectorAll(".error");
    errorElements.forEach(function (el) {
      el.innerHTML = "";
    });
    var inputElements = document.querySelectorAll(".authentication-form .input_txt_box");
    for (var i = 0; i < inputElements.length; i++) {
      if (inputElements[i].type !== "button" && inputElements[i].type !== "checkbox") {
        Samvaarta.common.removeRequiredFields(inputElements[i]);
        if (valError) {
          return false;
        }
      }
    }
    if (valError) {
      return false;
    } else {
      var paramObject = {
        url: apiUrl + "api/register",
        type: "POST",
        headers: {
          Accept: "application/json"
        },
        data: {
          email: reg_email,
          name: reg_name,
          password: reg_pwd,
          phone: reg_phone,
          linkedin: reg_linkedin,
          user_type: reg_role
          //avatar: reg_avatar,
        }
      };
      var ajaxSuccessCall = function ajaxSuccessCall(response) {
        console.log(response);
        Samvaarta.model.showSuccessMessage(successReg(reg_email));
      };
      var ajaxErrorCall = function ajaxErrorCall(response) {
        console.log(response);
      };
      Samvaarta.common.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
    }
  };
  var checkLoginStatus = function checkLoginStatus() {
    var userData = Samvaarta.common.getLocalStorage("oauthUserData");
    if (userData) {
      Samvaarta.globalVar.is_loggedin = 1;
      if (window.location.pathname === "/") {
        window.location.href = "/dashboard";
      }
      displayUserInfo(userData);
      window.loginCallback ? loginCallback(response) : false;
    } else {
      if (window.location.pathname !== "/") {
        window.location.href = "/";
        Samvaarta.system.createRegForm();
      } else {
        Samvaarta.system.createRegForm();
      }
    }
  };
  var activateDeactivateUser = function activateDeactivateUser(id, status) {
    var paramObject = {
      url: apiUrl + "api/admin/user/activate/" + id + "?status=" + status,
      type: "GET",
      data: {
        status: status
      },
      headers: {
        Authorization: "Bearer ".concat(Samvaarta.common.getLocalStorage("AccessToken").access_token),
        Accept: "application/json"
      }
    };
    var ajaxSuccessCall = function ajaxSuccessCall(response) {
      console.log(response);
      var statusInfo = '';
      if (status === '1') {
        statusInfo = "<span class=\"approved\">Approved</span> <span onclick=\"Samvaarta.system.activateDeactivateUser(".concat(id, ", '0')\">Undo</span>");
      } else if (status === '2') {
        statusInfo = "<span onclick=\"Samvaarta.system.activateDeactivateUser(".concat(id, ", '0')\">Undo</span> <span class=\"denied\">Denied</span>");
      } else {
        statusInfo = "<span onclick=\"Samvaarta.system.activateDeactivateUser(".concat(id, ", '1')\">Approve</span> <span onclick=\"Samvaarta.system.activateDeactivateUser(").concat(id, ", '2')\">Deny</span>");
      }
      $('.user-data-list #status_' + id).html(statusInfo);
      Samvaarta.common.deleteLocalStorage('users_data');
      Samvaarta.common.deleteLocalStorage('trainer_data');
      adminDashboard('users');
    };
    var ajaxErrorCall = function ajaxErrorCall(response) {
      console.log(response);
    };
    if (id) {
      Samvaarta.common.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
    }
  };
  var userDashboard = function userDashboard() {
    var userdashInfo = "\n        <ul>\n            <li class=\"active\">\n                <div class=\"dashboard__elements--item\">\n                    <h2>\n                        <img alt=\"\" src=\"/images/conversation.png\" width=\"25\" height=\"25\" />\n                        Conversational details\n                    </h2>\n                </div>\n                <div class=\"details\">\n                    <h3>Conversational Details</h3>\n                    <p>You are documenting the interaction of the day and uploading documents to support your effort</p>\n                    <div id=\"\" class=\"details--items previous\">\n                        <h3>Previous Interactions</h3>\n                        <p>No previous interactions</p>\n                    </div>\n                    <div id=\"\" class=\"details--items current\">\n                        <h3>Current Interactions</h3>\n                        <ul class=\"details--items__topics\">\n                            <li class=\"fa fa-arrow-right\">\n                                <label for=\"user_focus\" class=\"topic\">Focus of the day</label>\n                                <input type=\"text\" id=\"user_focus\" value=\"\" class=\"input_txt_box\" />\n                            </li>\n                            <li>\n                                <label for=\"user_last_commitment\" class=\"topic\">Last weeks commitment</label>\n                                <input type=\"text\" id=\"user_last_commitment\" value=\"\" class=\"input_txt_box\" />\n                            </li>\n                            <li>\n                                <label for=\"user_conversation\" class=\"topic\">Today\u2019s conversation</label>\n                                <input type=\"text\" id=\"user_conversation\" value=\"\" class=\"input_txt_box\" />\n                            </li>\n                            <li>\n                                <label for=\"user_week_commitment\" class=\"topic\">Commitment for the week</label>\n                                <input type=\"text\" id=\"user_week_commitment\" value=\"\" class=\"input_txt_box\" />\n                            </li>\n                            <li>\n                                <label for=\"user_comments\" class=\"topic\">Coach\u2019s Comments</label>\n                                <input type=\"text\" id=\"user_comments\" value=\"\" class=\"input_txt_box\" />\n                            </li>\n                        </ul>\n                    </div>\n                    <div class=\"form-elm-section marg-t10\">\n                        <button class=\"btn\">Submit</button>\n                    </div>\n                </div>\n            </li>\n            <li>\n                <div class=\"dashboard__elements--item\">\n                    <h2>\n                        <img alt=\"\" src=\"/images/objective.png\" width=\"25\" height=\"25\" />\n                        Learning Objective\n                    </h2>\n                </div>\n\n                <div class=\"details\">\n                    <h3>Learning Objective</h3>\n                    <textarea name=\"\" id=\"\" cols=\"30\" rows=\"10\"></textarea>\n                    <div class=\"form-elm-section marg-t10\">\n                        <button class=\"btn\">Submit</button>\n                    </div>\n                </div>\n            </li>\n            <li>\n                <div class=\"dashboard__elements--item\">\n                    <h2>\n                        <img alt=\"\" src=\"/images/outcomes.png\" width=\"25\" height=\"25\" />\n                        Learning Outcomes\n                    </h2>\n                </div>\n                <div class=\"details\">\n                    <h3>Learning Outcomes</h3>\n                    <p>Please express yourself as how you plan to see yourself at the end of the interaction period in terms of how you will be experiencing</p>\n                    <textarea name=\"\" id=\"\" cols=\"30\" rows=\"10\"></textarea>\n                    <div class=\"form-elm-section marg-t10\">\n                        <button class=\"btn\">Submit</button>\n                    </div>\n                </div>\n            </li>\n            <li>\n                <div class=\"dashboard__elements--item\">\n                    <h2>\n                        <img alt=\"\" src=\"/images/comments.png\" width=\"25\" height=\"25\" />\n                        Managers Comment\n                    </h2>\n                </div>\n                <div class=\"details\">\n                    <h3>Managers Comment</h3>\n                    <p>The coach will share his perspective on the progress made based on the interactions</p>\n                    <textarea name=\"\" id=\"\" cols=\"30\" rows=\"10\"></textarea>\n                    <div class=\"form-elm-section marg-t10\">\n                        <button class=\"btn\">Submit</button>\n                    </div>\n                </div>\n            </li>\n            <li>\n                <div class=\"dashboard__elements--item\">\n                    <h2>\n                        <img alt=\"\" src=\"/images/upload.png\" width=\"25\" height=\"25\" />\n                        Uploading Documents\n                    </h2>\n                </div>\n                <div class=\"details\">\n                    <h3>Upload Documents</h3>\n                    <textarea name=\"\" id=\"\" cols=\"30\" rows=\"10\"></textarea>\n                    <div class=\"form-elm-section marg-t10\">\n                        <button class=\"btn\">Submit</button>\n                    </div>\n                </div>\n            </li>\n            <li>\n                <div class=\"dashboard__elements--item\">\n                    <h2>\n                        <img alt=\"\" src=\"/images/ethics.png\" width=\"25\" height=\"25\" />\n                        Code of ethics\n                    </h2>\n                </div>\n                <div class=\"details codeofethics\">\n                    <h3>Code of ethics</h3>\n                    <p>CoE refers to the responsible behavior that will be displayed by partied involved during the interaction period</p>\n                    <div class=\"details--items\">\n                        <h3>Coachee\u2019s Code of Ethics</h3>\n                        <ul class=\"list-view\">\n                            <li>I shall be sharing the details truthfully without any fear</li>\n                            <li>I commit to implement my commitments made in the interaction</li>\n                            <li>The responsibility of my growth life within me</li>\n                        </ul>\n                    </div>\n                    <div class=\"details--items\">\n                        <h3>The coach / Mentor has agreed to the following</h3>\n                        <ul class=\"list-view\">\n                            <li>The coach will be 100% invested in you during the interaction</li>\n                            <li>The coach\u2019s role will be to ask you question to help you explore</li>\n                            <li>The coach maintain the confidentiality of the interaction\u2026\u2026</li>\n                        </ul>\n                    </div>\n                    <div class=\"form-elm-section marg-t10\">\n                        <button onclick=\"Samvaarta.userDashboard.codeOfEthics()\" class=\"btn\">Submit</button>\n                    </div>\n                </div>\n            </li>\n        </ul>\n        ";
    $(".user-dashboard-info").html(userdashInfo);
  };
  var trainerDashboard = function trainerDashboard() {};
  var displayTypeWise = function displayTypeWise(response, type) {
    var userInfo = '';
    var statusInfo = "",
      assignTrainer = '',
      userList = '',
      adminList = '';
    var trainerdata = Samvaarta.common.getLocalStorage('trainer_data');
    if (type === 'users') {
      assignTrainer = "<td>Assign Trainer</td>";
    } else if (type === 'trainer') {
      userList = "<td>Assigned User</td>";
    } else {
      adminList = "<td></td>";
    }
    userInfo += "";
    userInfo += "<tr class=\"user-dashboard-info__head-list\">\n            <td>SNO.</td>\n            <td>Name</td>\n            <td>Email</td>                \n            <td>Status</td>\n            ".concat(assignTrainer, "\n            ").concat(userList, "\n            ").concat(adminList, "\n        </tr>");
    response.map(function (item, index) {
      var trainerList = '';
      if (type === 'users') {
        var _item$trainer;
        if (!((_item$trainer = item.trainer) !== null && _item$trainer !== void 0 && _item$trainer.length)) {
          trainerList += "<select class=\"input_txt_box select-box\" onchange=\"Samvaarta.system.assignedTrainer(this);\">\n                        <option value=\"select\">Select Trainer</option>\n                    ";
          trainerdata.map(function (titem) {
            trainerList += "<option userId=\"".concat(item.id, "\" value=\"").concat(titem.id, "\">").concat(titem.name, "</option>");
          });
          trainerList += "</select>";
        } else {
          trainerList = "".concat(item.trainer[0].name);
        }
      } else if (type === 'trainer') {
        if (item.users.length) {
          var _item$users;
          trainerList += "<div class=\"assigned-user-list\">\n                    <h3>Assigned User List</h3>\n                    <ul>\n                ";
          (_item$users = item.users) === null || _item$users === void 0 || _item$users.map(function (titem) {
            trainerList += "<li trainerId=\"".concat(item.id, "\" userId=\"").concat(titem.id, "\">").concat(titem.name, "</li>");
          });
          trainerList += "</ul>";
        } else {
          trainerList = 'No User';
        }
      }
      if (parseFloat(item.status) === 1) {
        statusInfo = "<span class=\"approved\">Approved</span> <span onclick=\"Samvaarta.system.activateDeactivateUser(".concat(item.id, ", '0')\">Undo</span>");
      } else if (parseFloat(item.status) === 2) {
        statusInfo = "<span onclick=\"Samvaarta.system.activateDeactivateUser(".concat(item.id, ", '0')\">Undo</span> <span class=\"denied\">Denied</span>");
      } else {
        statusInfo = "<span onclick=\"Samvaarta.system.activateDeactivateUser(".concat(item.id, ", '1')\">Approve</span> <span onclick=\"Samvaarta.system.activateDeactivateUser(").concat(item.id, ", '2')\">Deny</span>");
      }
      userInfo += "<tr>";
      userInfo += "<td>".concat(index + 1, "</td>");
      userInfo += "<td class=\"camel-case\">".concat(item.name, "</td>");
      userInfo += "<td>".concat(item.email, "</td>");
      userInfo += "<td id=\"status_".concat(item.id, "\">").concat(statusInfo, "</td>");
      userInfo += "<td>".concat(trainerList, "</td>");
      userInfo += "</tr>";
    });
    $(".user-dashboard-info").addClass('admin-info');
    $(".user-dashboard-info .user-data-list tbody").html(userInfo);
    $('.show-role-tab').removeClass('hide');
    showRoleTab();
  };
  var getTrainerData = function getTrainerData(type) {
    var paramObject = {
      url: apiUrl + "api/admin/" + type + "/listing",
      type: "GET",
      data: {},
      headers: {
        Authorization: "Bearer ".concat(Samvaarta.common.getLocalStorage("AccessToken").access_token),
        Accept: "application/json"
      }
    };
    var ajaxSuccessCall = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(response) {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              response = response.data.data;
              Samvaarta.common.setLocalStorage(type + '_data', response, expireTime);
            case 2:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return function ajaxSuccessCall(_x4) {
        return _ref2.apply(this, arguments);
      };
    }();
    var ajaxErrorCall = function ajaxErrorCall(response) {
      console.log(response);
    };
    Samvaarta.common.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
  };
  var adminDashboard = function adminDashboard(type) {
    var typeWisedata = Samvaarta.common.getLocalStorage(type + '_data');
    var paramObject = {
      url: apiUrl + "api/admin/" + type + "/listing",
      type: "GET",
      data: {},
      headers: {
        Authorization: "Bearer ".concat(Samvaarta.common.getLocalStorage("AccessToken").access_token),
        Accept: "application/json"
      }
    };
    var ajaxSuccessCall = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(response) {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              response = response.data.data;
              Samvaarta.common.setLocalStorage(type + '_data', response, expireTime);
              getTrainerData('trainer');
              setTimeout(function () {
                displayTypeWise(response, type);
              }, 1000);
            case 4:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      return function ajaxSuccessCall(_x5) {
        return _ref3.apply(this, arguments);
      };
    }();
    var ajaxErrorCall = function ajaxErrorCall(response) {
      console.log(response);
    };
    if (!typeWisedata) {
      Samvaarta.common.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
    } else {
      displayTypeWise(typeWisedata, type);
    }
  };
  var showUserInfo = function showUserInfo(response) {
    var _Samvaarta$common$get2;
    var coachInfo = '',
      cochees = '',
      trainer = '',
      plannedSess = '',
      concluded = '',
      nextSession = '',
      completeSessCount = '',
      userExp = '',
      userFun = '';
    if (response.user_type === "admin") {
      cochees = "<li>No of Coachees: <span></span></li>";
      trainer = "<li>No of Coaches: <span></span></li>";
      adminDashboard('users');
    } else if (response.user_type === "trainer") {
      cochees = "<li>No of Coachees: <span></span></li>";
      completeSessCount = "<li>No of sessions completed: <span></span></li>";
      trainerDashboard();
    } else {
      userDashboard();
      coachInfo = "<li>Coach Name: <span>".concat(response.coach ? response.coach : '', "</span></li>");
      plannedSess = "<li>Planned Sessions: <span>".concat(response.plannedSession ? response.plannedSession : '', "</span></li>");
      concluded = "<li>Concluded: <span></span></li>";
      nextSession = "<li>Next Session Date: <span></span></li>";
      userExp = "<li>Experience: <span>".concat(response.experience, "</span></li>");
      userFun = "<li>Function: <span>".concat(response.user_function, "</span></li>");
    }
    var userInfo = "\n        <h3 class=\"userName\">Welcome ".concat(response.name.split(" ")[0], " </h3>\n        <div class=\"upcoming-session\">\n            <a href=\"/upcoming_session\" data-type=\"upcoming-session\">\n                <i class=\"fa fa-circle fa-fw\"></i>\n                Upcoming Session\n            </a>\n        </div>\n        <div class=\"show-user-details__inner\">\n            <div class=\"show-user-details__inner--left detail-items\">\n                <ul>\n                    <li>Code: <span>").concat(response.id, "</span></li>\n                    <li>Date of Joining: <span>").concat(Samvaarta.common.dateMonthYear(response.created_at), "</span></li>\n                    ").concat(coachInfo, "\n                    ").concat(userExp, "\n                    ").concat(userFun, "\n                    <li class=\"role\">Role: <span>").concat(response.user_type, "</span></li>\n                    <li>Location: <span>").concat(response.location ? response.location : (_Samvaarta$common$get2 = Samvaarta.common.getLocalStorage("location")) === null || _Samvaarta$common$get2 === void 0 ? void 0 : _Samvaarta$common$get2.data.city, "</span></li>\n                </ul>\n            </div>\n            <div class=\"show-user-details__inner--mid detail-items\">\n                <ul>\n                    <li>Vision: <span>").concat(response.vision, "</span></li>\n                    <li>Brief Description: <span>").concat(response.description, "</span></li>\n                    ").concat(plannedSess, "  ").concat(cochees, "  ").concat(trainer, " \n                    ").concat(concluded, " ").concat(nextSession, "  ").concat(completeSessCount, "                 \n                </ul>\n            </div>\n            <div class=\"show-user-details__inner--right detail-items\">\n                <ul>\n                    <li class=\"profile-img\"><img src=\"").concat(response.avatar ? response.avatar : '/images/default-face.jpg', "\" width=\"100\" height=\"100\" alt=\"profile\"></li>\n                    <li>LinkedIn: <span>").concat(response.linkedin_url, "</span></li>\n                    <li>Email Id: <span>").concat(response.email, "</span></li>\n                    <li>Mobile No: <span>").concat(response.phone, "</span></li>\n                </ul>\n            </div>\n        </div>\n        ");
    $(".show-user-details").html(userInfo);
  };
  var displayUserInfo = function displayUserInfo(data) {
    var _data$data$data;
    var userDetails = (_data$data$data = data.data.data) !== null && _data$data$data !== void 0 && _data$data$data.name ? data.data.data : data.data;
    if (data) {
      showUserInfo(userDetails);
      Samvaarta.globalVar.oauthToken = Samvaarta.common.getLocalStorage("AccessToken");
      Samvaarta.globalVar.is_loggedin = 1;
      var username = userDetails.name.split(" ")[0];
      var userType = userDetails.user_type;
      var userTypreDescription = "";
      document.querySelector(".dashboard__header--welcome span").innerHTML = username;
      if (userType === "trainer") {
        userTypreDescription = "\n                <li>\n                    <a tabindex=\"0\" role=\"button\" href=\"/user-details\">\n                    <i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>User Detail\n                    </a>\n                </li>\t";
      } else if (userType === "admin") {
        userTypreDescription = "\n                <li>\n                    <a tabindex=\"0\" role=\"button\" href=\"/user-details\">\n                    <i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>User Detail\n                    </a>\n                </li>\n                <li>\n                    <a tabindex=\"0\" role=\"button\" href=\"/trainer-details\">\n                    <i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i>Trainer Detail\n                    </a>\n                </li>\t\n                ";
        Samvaarta.userDashboard.updateSessionForm();
      } else {}
      var userData = "\n\t\t\t\t<div class=\"d-flex align-items-center\">\n\t\t\t\t\t<div class=\"flex-shrink-0\">\n\t\t\t\t\t<img width=\"20\" height=\"20\" data-src=\"".concat(userDetails.avatar, "\" src=\"/images/user-default.svg\" class=\"unveil avatar\" alt=\"").concat(username, "\" />\n\t\t\t\t\t</div>\t\t\t\t\t\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t<div class=\"header-user-nav\">\n\t\t\t\t\t<div class=\"hvr_bx\">\n\t\t\t\t\t\t<ul>\n                            <li>\n                                <a tabindex=\"0\" role=\"button\" href=\"/dashboard\">\n                                <i class=\"fa fa-tachometer\" aria-hidden=\"true\"></i>Dashboard\n                                </a>\n                            </li>\t\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a tabindex=\"0\" role=\"button\" href=\"/myaccount\">\n\t\t\t\t\t\t\t\t\t<i class=\"fa fa-pencil\"></i>Edit Profile\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t</li>\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<li class=\"change-password\">\n\t\t\t\t\t\t\t\t<a href=\"/change-password\" tabindex=\"0\" role=\"button\">\n\t\t\t\t\t\t\t\t\t<i class=\"fa fa-key\"></i>Change Password\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t</li>\n                            ").concat(userTypreDescription, "\n\t\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t\t<a href=\"javascript:void(0);\" tabindex=\"0\" role=\"button\" onclick=\"Samvaarta.system.logout()\">\n\t\t\t\t\t\t\t\t\t<i class=\"fa fa-power-off\"></i>Logout\n\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t</li>\n\t\t\t\t\t\t</ul>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t");
      $(".dashboard__header--loggedin-user").html(userData);
    }
  };
  var forgetPassword = function forgetPassword() {
    var reg_email = $("#oauth_log_email").val();
    $(".error").html("");
    $(".authentication-form input").each(function () {
      if ($(this).attr("type") != "button" && $(this).attr("type") != "checkbox") {
        Samvaarta.common.removeRequiredFields($(this));
        if (valError) {
          return false;
        }
      }
    });
    if (valError) {
      return false;
    } else {
      var paramObject = {
        url: apiUrl + "auth/forgot-password",
        type: "post",
        data: {
          email: reg_email
        }
      };
      var ajaxSuccessCall = function ajaxSuccessCall(response) {
        console.log(response);
      };
      var ajaxErrorCall = function ajaxErrorCall(error) {
        if (error.response) {
          $("#oauth_log_email_err").html(error.response.data.message).show();
        }
      };
      Samvaarta.common.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
    }
  };
  var assignedTrainer = function assignedTrainer(event) {
    var trainerid = $(event)[0].options[$(event)[0].options.selectedIndex].getAttribute('value');
    var userId = $(event)[0].options[$(event)[0].options.selectedIndex].getAttribute('userid');
    var paramObject = {
      url: apiUrl + "api/admin/user/assign_trainer",
      type: "POST",
      data: {
        user_id: userId,
        trainer_id: trainerid
      },
      headers: {
        Authorization: "Bearer ".concat(Samvaarta.common.getLocalStorage("AccessToken").access_token),
        Accept: "application/json"
      }
    };
    var ajaxSuccessCall = /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(response) {
        var _response$data;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              if (((_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.success) === 'true') {
                Samvaarta.common.deleteLocalStorage('users_data');
                Samvaarta.common.deleteLocalStorage('trainer_data');
                adminDashboard('users');
              } else {
                Samvaarta.common.toastMsg('User is not activate yet, Please activate first.');
              }
            case 1:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      return function ajaxSuccessCall(_x6) {
        return _ref4.apply(this, arguments);
      };
    }();
    var ajaxErrorCall = function ajaxErrorCall(response) {
      console.log(response);
    };
    Samvaarta.common.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
  };
  return {
    loginUser: loginUser,
    userRegistration: userRegistration,
    displayUserInfo: displayUserInfo,
    checkLoginStatus: checkLoginStatus,
    verifyEmail: verifyEmail,
    forgetPassword: forgetPassword,
    createRegForm: createRegForm,
    logout: logout,
    changePassword: changePassword,
    editProfile: editProfile,
    passwordUpdated: passwordUpdated,
    userEditProfileUpdated: userEditProfileUpdated,
    assignedTrainer: assignedTrainer,
    activateDeactivateUser: activateDeactivateUser,
    adminDashboard: adminDashboard
  };
}();
Samvaarta.userDashboard = function () {
  var codeOfEthics = function codeOfEthics() {
    var ethicsdata = $('.codeofethics ul').text();
    var paramObject = {
      url: apiUrl + "api/profile/code-of-ethics",
      type: "POST",
      data: {
        'comments': ethicsdata
      },
      headers: {
        Authorization: "Bearer ".concat(Samvaarta.globalVar.oauthToken.access_token),
        Accept: "application/json"
      }
    };
    var ajaxSuccessCall = function ajaxSuccessCall(response) {
      console.log(response);
    };
    var ajaxErrorCall = function ajaxErrorCall(error) {
      if (error.response) {
        $("#oauth_log_email_err").html(error.response.data.message).show();
      }
    };
    Samvaarta.common.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
  };
  var getCodeOfEthics = function getCodeOfEthics() {
    var paramObject = {
      url: apiUrl + "api/profile/code-of-ethics",
      type: "GET",
      headers: {
        Authorization: "Bearer ".concat(Samvaarta.globalVar.oauthToken.access_token),
        Accept: "application/json"
      }
    };
    var ajaxSuccessCall = function ajaxSuccessCall(response) {
      console.log(response);
    };
    var ajaxErrorCall = function ajaxErrorCall(error) {
      if (error.response) {
        $("#oauth_log_email_err").html(error.response.data.message).show();
      }
    };
    Samvaarta.common.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
  };
  var updateSessionForm = function updateSessionForm() {
    var sessionForm = "\n            <div class=\"form-elm-section input_sec \">\n                <label for=\"session_date\">\n                    Session Date\n                </label>\n                <input placeholder=\"\" name=\"\" type=\"text\" id=\"session_date\" class=\"input_txt_box\" value=\"\" title=\"\">\n                <p id=\"session_date_err\" class=\"error\"></p>\n            </div>\n            <div class=\"form-elm-section input_sec \">\n                <label for=\"session_name\">\n                    Session Name\n                </label>\n                <input placeholder=\"\" name=\"\" type=\"text\" id=\"session_name\" class=\"input_txt_box\" value=\"\" title=\"\">\n                <p id=\"session_name_err\" class=\"error\"></p>\n            </div>\n            <div class=\"form-elm-section input_sec \">\n                <label for=\"session_time\">\n                    Session Time\n                </label>\n                <input placeholder=\"\" name=\"\" type=\"text\" id=\"session_time\" class=\"input_txt_box\" value=\"\" title=\"\">\n                <p id=\"session_time_err\" class=\"error\"></p>\n            </div>\n            <div class=\"form-elm-section marg-t20\">\n                <input type=\"button\" class=\"btn submit-button2\" name=\"submit_profile\" onclick=\"Samvaarta.userDashboard.updateSession(1);\" value=\"Update Session\">\n            </div>\n        ";
    $('.upcoming_session_container').html(sessionForm);
  };
  var updateSession = function updateSession() {
    var paramObject = {
      url: apiUrl + "api/update-session",
      type: "POST",
      headers: {
        Authorization: "Bearer ".concat(Samvaarta.globalVar.oauthToken.access_token),
        Accept: "application/json"
      }
    };
    var ajaxSuccessCall = function ajaxSuccessCall(response) {
      console.log(response);
    };
    var ajaxErrorCall = function ajaxErrorCall(error) {
      if (error.response) {
        $("#oauth_log_email_err").html(error.response.data.message).show();
      }
    };

    // Samvaarta.common.hitAjaxApi(
    //     paramObject,
    //     ajaxSuccessCall,
    //     ajaxErrorCall
    // );
  };
  var getSessionList = function getSessionList() {
    var paramObject = {
      url: apiUrl + "api/update-session",
      type: "GET",
      headers: {
        Authorization: "Bearer ".concat(Samvaarta.globalVar.oauthToken.access_token),
        Accept: "application/json"
      }
    };
    var ajaxSuccessCall = function ajaxSuccessCall(response) {
      console.log(response);
    };
    var ajaxErrorCall = function ajaxErrorCall(error) {
      if (error.response) {
        $("#oauth_log_email_err").html(error.response.data.message).show();
      }
    };

    // Samvaarta.common.hitAjaxApi(
    //     paramObject,
    //     ajaxSuccessCall,
    //     ajaxErrorCall
    // );
    $('.upcoming_session_list').html('<h2>No upcoming session available.</h2>');
  };
  return {
    codeOfEthics: codeOfEthics,
    getCodeOfEthics: getCodeOfEthics,
    updateSession: updateSession,
    getSessionList: getSessionList,
    updateSessionForm: updateSessionForm
  };
}();
var dashboardTab = function dashboardTab() {
  var elm = document.querySelector(".dashboard__elements--inner");
  if (elm) {
    $("body").on("click", ".user-dashboard-info li", function (event) {
      if (!event.currentTarget.classList.contains("active")) {
        $(".user-dashboard-info li").removeClass("active");
        event.currentTarget.classList.add("active");
      }
    });
  }
};
var photoUploadView = function photoUploadView() {
  var readURL = function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $(".profile-pic").attr("src", e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  };
  $(".file-upload").on("change", function () {
    readURL(this);
  });
  $(".upload-button").on("click", function () {
    $(".file-upload").click();
  });
};
var showRoleTab = function showRoleTab() {
  var elm = document.querySelector(".show-role-tab");
  if (elm) {
    $("body").on("click", ".show-role-tab button", function (event) {
      if (!event.currentTarget.classList.contains("active")) {
        $(".show-role-tab button").removeClass("active");
        event.currentTarget.classList.add("active");
        Samvaarta.system.adminDashboard(event.currentTarget.dataset.type);
      }
    });
  }
};
document.addEventListener("readystatechange", function (event) {
  // When HTML/DOM elements are ready:
  if (event.target.readyState === "interactive") {
    Samvaarta.system.checkLoginStatus();
    dashboardTab();
    photoUploadView();
    if (document.querySelector("#edit-profile")) {
      Samvaarta.system.editProfile();
    }
    Samvaarta.common.getLocation();
    if ($('.user-details-page').length) {
      Samvaarta.system.adminDashboard('users');
    }
    if ($('.trainer-details-page').length) {
      Samvaarta.system.adminDashboard('trainer');
    }
  }
  if (event.target.readyState === "complete") {
    unvielImg();
    Samvaarta.userDashboard.getSessionList();
  }
});

// const people = [
//     {name:'john', hobbies:['cricket', 'javascript']},
//     {name:'ajay', hobbies:'singing'},
//     {name:'akhil', hobbies:['running', 'food']}
// ]
// const hobby = people.flatMap((p) => p.hobbies);
// console.log(hobby);

/***/ }),

/***/ "./resources/css/base.css":
/*!********************************!*\
  !*** ./resources/css/base.css ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/common": 0,
/******/ 			"css/base": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/base"], () => (__webpack_require__("./resources/js/common.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/base"], () => (__webpack_require__("./resources/css/base.css")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;