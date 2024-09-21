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
    12: "Your Profile has been updated successfully.",
    13: "Please provide valid input",
    14: "You have successfully submitted your desired outcomes.",
    15: "You have successfully submitted your desired objectives.",
    16: "You have successfully submitted your documenting conversions.",
};

var valError = true;
var apiUrl = typeof(appUrl) != "undefined" ? appUrl : "http://127.0.0.1:8000/";
var expireTime = 20 / (24 * 60);
var userType = '';
var oauthUserData = '';

Samvaarta.globalVar = Samvaarta.globalVar || {
    errorValueInFlow: "",
    is_Loggedin: 0,
    oauthToken: "",
    currlocation: "",
    userType: userType,
};

var sessionStatus = {
    'completed': 'Completed',
    'scheduled': 'Scheduled',
    'cancelled': 'Cancelled',
    'postponed': 'Postponed',
};
const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn(...args);
        }, delay);
    }
}

const getDateFormat = (validDate) => {
    let formattedDate = '';
    if(validDate){
        const date = new Date(validDate);
        formattedDate = date.toISOString().split('T')[0];
        return formattedDate;
    }
}
const generateOptions = (response) => {
    let options = '';
    for (const [key, value] of Object.entries(response)) {
        options += `<option value="${value}">${value}</option>`;
    }
    return options;
  }


const elementInViewport = (el) => {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }

    return (
        top < window.pageYOffset + window.innerHeight &&
        left < window.pageXOffset + window.innerWidth &&
        top + height > window.pageYOffset &&
        left + width > window.pageXOffset
    );
};
const unvielImg = (selector, unveilSelector) => {
    var selector = selector || "body";
    $(selector)
        .find("img.unveil")
        .each(function (i, v) {
            var escapedWithParents =
                '.slide-container,.logos,[class*="wrapper_style"]';
            var isTheImgEscaped = $(this).parents(escapedWithParents).length;
            var unveilSelect =
                unveilSelector || elementInViewport(v) || isTheImgEscaped;

            if (unveilSelect) {
                $this = $(this);
                try {
                    $this.attr("data-init-src", $this.attr("src"));
                    if (
                        $this.attr("data-src") != "" &&
                        $this.attr("data-src") != null
                    ) {
                        $this.attr("src", $this.attr("data-src"));
                        $this.removeClass("unveil");
                    } else {
                        $this.attr("src", $this.attr("data-init-src"));
                    }
                    $this.on("error", function () {
                        $(this)
                            .unbind("error")
                            .attr("src", $(this).data("init-src"));
                    });
                } catch (e) {}
            }
        });
};

const checkIfImageExists = (url, callback) => {
    const img = new Image();
    img.src = url;

    if (url != "") {
        if (img.complete) {
            callback(true);
        } else {
            img.onload = () => {
                callback(true);
            };

            img.onerror = () => {
                callback(false);
            };
        }
    } else {
        callback(false);
    }
};

Samvaarta.common = (() => {
    var isNull = function (obj) {
        return obj == null || obj == "null";
    };

    var isUndefined = function (obj) {
        return obj == undefined;
    };

    var isBlank = function (obj) {
        return typeof obj == "undefined" || obj == "";
    };
    var isOperatable = function (obj) {
        if (typeof obj == "object" && !isNull(obj)) {
            return Object.keys(obj).length == 0 ? false : true;
        } else {
            return (
                !this.isBlank(obj) &&
                !this.isNull(obj) &&
                !this.isUndefined(obj)
            );
        }
    };
    var setLocalStorage = (key, data, exdays) => {
        var $data = {};
        $data["expires"] =
            Math.floor(Date.now() / 1000) + exdays * 24 * 60 * 60;
        $data["data"] = data;
        localStorage.setItem(key, JSON.stringify($data));
    };
    var getLocalStorage = (key) => {
        var $data = localStorage.getItem(key);
        if ($data != null) {
            $data = JSON.parse($data);
            var lsexpires = $data["expires"];
            if (Math.floor(Date.now() / 1000) >= lsexpires) {
                deleteLocalStorage(key);
                return null;
            }
            if ("data" in $data) return $data["data"];
            else {
                deleteLocalStorage(key);
                return null;
            }
        } else {
            return null;
        }
    };
    var deleteLocalStorage = (key) => {
        localStorage.removeItem(key);
    };
    var encodeHTML = (param) => {
        if (!param) {
            return param;
        }
        return param
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/"/g, "&quot;");
    };
    const loadScript = (src, callback, async, params) => {
        if (typeof async == 'undefined')
            async = true;
        else
            async = (async) ? true : false;
        var s, r, t;
        r = false;
        
        var src_alphanumeric = src.replace(/[^a-zA-Z0-9]+/g, '-');
        src_alphanumeric = src_alphanumeric.toLowerCase();

        var skip = 1;

        if (async == false && !(document.readyState == 'interactive' || document.readyState == 'complete')) {
            document.write('<script type="text/javascript" src="' + src + '"></script>');
            callback(params);
            return;
        }

        if (!(document.getElementById(src_alphanumeric)) && skip == 1) {
            s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = src;
            s.id = src_alphanumeric;
            if (async == true) {
                s.async = true;
                s.defer = true;
            } else
                s.async = false;
            s.onload = s.onreadystatechange = function() {
                if (!r && (!this.readyState || this.readyState == 'complete')) {
                    r = true;
                    if (typeof callback == 'function')
                        callback(params);
                    document.getElementById(s.id).setAttribute('data-ready', 1);
                }
            }
            ;
            t = document.getElementsByTagName('head')[0];
            t.appendChild(s, t);
        } else if (document.getElementById(src_alphanumeric)) {
            if (document.getElementById(src_alphanumeric).getAttribute('data-ready') == 0 || document.getElementById(src_alphanumeric).getAttribute('data-ready') == null) {
                setTimeout(function() {
                    loadScript(src, callback, async, params);
                }, 100);
            } else {
                if (typeof callback == 'function') {
                    //callback.apply(null, Array.prototype.slice.call(params instanceof Array?params:[]));
                    callback(params);
                }

            }

        }
    }

    const dayMonthNameYear = (dateString) => {
        const date = new Date(dateString);
        formattedDate = date.toUTCString().split(' ');
        let acDate = formattedDate[1] +' '+ formattedDate[2] +' '+ formattedDate[3];
        return acDate;
    }

    var validateName = (name, key) => {
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
            case "datepicker":
            case "session_duration":
            case "session_desc":
            case "session_name":
            case "session_status":
            case "assign_trainer":
            case "user_focus":            
            case "user_last_commitment":            
            case "user_conversation":            
            case "user_week_commitment":          
            case "next_interaction_date":            
            case "interaction_name": 
            case "qualitative_param_3":        
            case "qualitative_param_2":        
            case "quantitative_param_1": 
            case "quantitative_param_1":
            case "quantitative_param_2":         
            case "quantitative_param_3":         
            case "quantitative_desc_1":         
            case "quantitative_desc_2":         
            case "quantitative_desc_3":         
            case "c_performance_1":         
            case "c_performance_2":         
            case "c_performance_3":         
            case "qualitative_desc_1":         
            case "qualitative_desc_2":         
            case "qualitative_desc_3":   
            case "outcomes_param_1":    
            case "outcomes_param_2":    
            case "outcomes_param_3":    
            case "outcomes_desc_1":    
            case "outcomes_desc_2":    
            case "outcomes_desc_3":    
                handleBlankNameVal(13);            
        }
        return error;
    };

    const validatePhone = (value, key) => {
        var phonePattern = /^\d{10}$/;
        if (!phonePattern.test(value)) {
            return "Please enter a valid 10-digit phone number.";
        }
        return "";
    };

    const validatePassword = (password, key) => {
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
                var newpass = document.getElementById(
                    "oauth_new_password1"
                ).value;
                if (password != newpass) {
                    error = Samvaarta.messageLog[9];
                }
        }
        return error;
    };

    const isValidEmail = (email) => {
        var pattern = new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        if (!pattern.test(email)) {
            return false;
        } else {
            return true;
        }
    };

    const validateEmail = (email) => {
        var error = "";
        email = email.replace(/^\s+|\s+$/gm, "");
        if (email == "") {
            error = Samvaarta.messageLog[1];
        } else if (!isValidEmail(email)) {
            error = Samvaarta.messageLog[2];
        }
        return error;
    };

    const removeRequiredFields = (e) => {
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
            $("#" + id + "_err")
                .html("")
                .hide();
            $("#" + id + "_err")
                .siblings("input")
                .removeClass("error");
            validateFields(id, value);
        } else {
            validateFields(id, value);
        }
    };

    const validateFields = (id, value) => {
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
            oauth_new_password2: validatePassword,
            datepicker: validateName,
            session_duration: validateName,
            session_desc: validateName,
            session_name: validateName,
            session_status: validateName,
            assign_trainer: validateName,            
            user_focus: validateName,            
            user_last_commitment: validateName,            
            user_conversation: validateName,            
            user_week_commitment: validateName,            
            next_interaction_date: validateName,            
            interaction_name: validateName, 
            qualitative_param_3: validateName,        
            qualitative_param_2: validateName,        
            qualitative_param_1: validateName,        
            quantitative_param_1: validateName,        
            quantitative_param_2: validateName,        
            quantitative_param_3: validateName,        
            quantitative_desc_1: validateName,        
            quantitative_desc_2: validateName,        
            quantitative_desc_3: validateName,        
            c_performance_1: validateName,        
            c_performance_2: validateName,        
            c_performance_3: validateName,        
            qualitative_desc_1: validateName,        
            qualitative_desc_2: validateName,        
            qualitative_desc_3: validateName,        
            outcomes_param_1: validateName,   
            outcomes_param_2: validateName,   
            outcomes_param_3: validateName,   
            outcomes_desc_1: validateName,   
            outcomes_desc_2: validateName,   
            outcomes_desc_3: validateName,   
        };

        // Iterate through the validation functions
        for (var key in valParam) {
            if (valParam.hasOwnProperty(key)) {
                var valFunction = valParam[key];
                if (id === key) {
                    error_val = valFunction(value, key);
                    if (error_val) {
                        document.getElementById(key + "_err").innerHTML =
                            error_val;
                        document.getElementById(key + "_err").style.display =
                            "block";
                        valError = true;
                        Samvaarta.globalVar.errorValueInFlow = error_val;

                        // Remove autocomplete items if they exist
                        var autocompleteItems = document.querySelectorAll(
                            ".autocomplete-items"
                        );
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

    const hitAjaxApi = async (requestSet, ajaxSuccess, ajaxError) => {
        if (isOperatable(requestSet)) {
            requestSet = requestSet || {};
            requestSet.data = requestSet.data || {};
            requestSet.headers = requestSet.headers || {};
            axios({
                method: requestSet.type || "POST",
                url: requestSet.url,
                data: requestSet.data,
                headers: requestSet.headers,
            })
                .then(function (response) {
                    ajaxSuccess(response);
                })
                .catch(function (error) {
                    ajaxError(error);
                });
        }
    };

    const dateMonthYear = (timestampVal) => {
        const timestamp = timestampVal;

        // Create a Date object
        const date = new Date(timestamp);

        // Extract year, month, and day
        const year = date.getFullYear();
        const month = date.toLocaleString("default", { month: "long" }); // 'long' for full month name
        const day = date.getDate();

        // Format the date as "Month Day, Year"
        const formattedDate = `${month} ${day}, ${year}`;
        return formattedDate;
    };

    const getLocation = () => {
        var paramObject = {
            url: "https://st.etb2bimg.com/locinfo",
            type: "GET",
            data: {},
            headers: {
                Accept: "application/json",
            },
        };

        function ajaxSuccessCall(data) {
            Samvaarta.common.setLocalStorage("location", data, 1);
        }
        function ajaxErrorCall(data) {}
        if (!Samvaarta.common.getLocalStorage("location")) {
            Samvaarta.common.hitAjaxApi(
                paramObject,
                ajaxSuccessCall,
                ajaxErrorCall
            );
        } else {
            var loc = Samvaarta.common.getLocalStorage("location");
            Samvaarta.globalVar.currlocation = loc.data.city;
        }
    };

    const toastMsg = (tmsg) => {
        $('.info_consentmsg').remove();
        let cnsetMsg = `<div class="info_success info_consentmsg">
                            <div class="info_success__inner">
                            <span>${tmsg}</span>
                            <a class="info_close"><span class="sprite-icon-img close-info"></span></a>    
                            </div>                
                            </div>`;
        $('body').append(cnsetMsg);
        setTimeout(function () {
            $('.info_consentmsg').remove();
        }, 4000);
        $('body').on('click', '.info_close', function () {
            $('.info_consentmsg').remove();
        });
    }
    const dataPicker = () => {
        $( "#datepicker" ).datepicker("option", "dateFormat", "yy-mm-dd");      
    }

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
        toastMsg: toastMsg,
        dataPicker: dataPicker,
        dayMonthNameYear: dayMonthNameYear,
    };
})();

Samvaarta.model = (() => {
    const open_pop = (custom_function, add_class, head, close, href) => {
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

        close_txt =
            close === "N"
                ? ""
                : '<a onclick="Samvaarta.model.close_pop(1);" class="close" style="z-index:9999">&#10005;</a>';
        append_str =
            '<div id="' +
            obj_id +
            '" class="model-container ' +
            xtra_cls +
            '" style="display:none;">' +
            close_txt +
            '<div class="model-wrapper"><div class="model-content" id="model_content_' +
            model_id +
            '"><span class="pre_loader" id="pre_loader_' +
            model_id +
            '"><span class="loader">&nbsp;</span>Loading...</span></div></div></div>';

        document.body.insertAdjacentHTML("beforeend", append_str);

        var popupElement = document.getElementById(obj_id);
        popupElement.style.display = "block";

        document.body.insertAdjacentHTML(
            "beforeend",
            '<div id="l2_overlay_bx_' + model_id + '" class="model-bg "></div>'
        );

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

    const close_pop = (obj) => {
        if (obj) {
            var popupElement = document.getElementById("model_" + obj);
            if (popupElement) {
                var overlayElement = document.getElementById(
                    "l2_overlay_bx_" + obj
                );
                var wrapperElement = document.getElementById("wrapper_" + obj);

                if (
                    document
                        .getElementById("model_" + obj)
                        .classList.contains("fadeInUp")
                ) {
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

    var showSuccessMessage = function (msg, commonStyle, popupClass = "") {
        Samvaarta.model.close_pop(1);
        if (!msg) {
            msg = "Success";
        }
        var extraMsg = "";
        if (/<\/?[a-z][\s\S]*>/i.test(msg)) {
            extraMsg = msg;
            msg = "";
        }

        Samvaarta.model.open_pop(
            "",
            "modal-confirm layer-out " + popupClass,
            1
        );
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
        showSuccessMessage: showSuccessMessage,
    };
})();

Samvaarta.system = (() => {
    const createRegForm = () => {
        const regForm = `
        <div class="reg-form">
            <div class="heading">
                <h2>Create an account to get started</h2>
                <p>Kindly fill in your details to create an account</p>
            </div>
            <form class="authentication-form">
                <div class="form-elm-section input_sec ">
                    <label for="oauth_log_name"> Name</label>
                    <input required="" data-id="" placeholder="" name="" type="text" id="oauth_log_name" class="input_txt_box" value="">

                    <p id="oauth_log_name_err" class="validation error"></p>
                </div>
                <div class="form-elm-section input_sec ">
                    <label for="oauth_log_email"> Email Id</label>
                    <input required="" data-id="" placeholder="" name="" type="text" id="oauth_log_email" class="input_txt_box" value="">
                    <p id="oauth_log_email_err" class="validation error"></p>
                </div>
                <div class="form-elm-section input_sec ">
                    <label for="oauth_log_password"> Password</label>
                    <input required="" data-id="" placeholder="" name="" type="password" id="oauth_log_password" class="input_txt_box" value="">
                    <p id="oauth_log_password_err" class="validation error"></p>
                </div>
                <div class="form-elm-section input_sec_num ">
                    <label for="oauth_log_number"> Phone No</label>
                    <select>
                        <option value="+91">+91</option>
                        <option value="+91">+01</option>
                        <option value="+91">+31</option>
                        <option value="+91">+11</option>
                        <option value="+91">+90</option>
                    </select>
                    <input required="" data-id="" placeholder="" name="" type="text" id="oauth_log_number" class="input_txt_box" value="">
                    <p id="oauth_log_number_err" class="validation error"></p>
                </div>
                <div class="input-section-main">
                    <div class="form-elm-section input_sec ">
                        <label for="oauth_log_lnurl"> LinkedIn URL</label>
                        <input required="" data-id="" placeholder="" name="" type="text" id="oauth_log_lnurl" class="input_txt_box" value="">
                        <p id="oauth_log_lnurl_err" class="validation error"></p>
                    </div>
                    <div class="form-elm-section input_sec_role ">
                        <label for="oauth_log_role"> Role</label>
                        <select class="input_txt_box" id="oauth_log_role">
                            <option value="">Select your Role</option>
                            <option value="admin">Admin</option>
                            <option value="trainer">Trainer</option>
                            <option value="user">User</option>
                        </select>
                        <p id="oauth_log_role_err" class="validation error"></p>
                    </div>
                </div>
                <div class="form-elm-section input_sec_center btn-container">
                    <button class="btn" type="button" onclick="Samvaarta.system.userRegistration()">Submit</button>
                </div>
            </form>
            <p class="reg-login-toggle">Already have the Goalsnu account?
                <a role="button" tabindex="0" rel="noreferrer nofollow" class="login-link">Log in</a>
            </p>
        </div>
        `;
        if (document.querySelector(".login-module__main--right")) {
            document.querySelector(".login-module__main--right").innerHTML =
                regForm;
        }
        showFormToggle();
    };

    const createLoginForm = () => {
        const loginForm = `
        <div class="login-form">
            <div class="heading">
                <h2>Log in to your account</h2>
                <p class="hide">Kindly fill in your details to create an account</p>
            </div>
            <form class="signin-form">

                <div class="form-elm-section input_sec ">
                    <label for="oauth_log_email"> Email Id</label>
                    <input required="" data-id="" placeholder="" name="" type="text" id="oauth_log_email" class="input_txt_box" value="">
                    <p id="oauth_log_email_err" class="validation error"></p>
                </div>
                <div class="form-elm-section input_sec ">
                    <label for="oauth_log_password"> Password</label>
                    <input required="" data-id="" placeholder="" name="" type="password" id="oauth_log_password" class="input_txt_box" value="">
                    <p id="oauth_log_password_err" class="validation error"></p>
                </div>

                <div class="form-elm-section input_sec_center btn-container ">
                    <button class="btn" type="button" onclick="Samvaarta.system.loginUser()">Submit</button>
                </div>
            </form>
            <p class="reg-login-toggle">Don't have the Goalsnu account?
                <a role="button" tabindex="0" rel="noreferrer nofollow" class="signup-link">Create one</a>
            </p>
        </div>
        `;
        $(".login-module__main--right").length ? document.querySelector(".login-module__main--right").innerHTML =
            loginForm : '';
        showFormToggle();
    };

    const showFormToggle = () => {
        document
            .querySelector(".signup-link")
            ?.addEventListener("click", () => {
                createRegForm();
            });
        document.querySelector(".login-link")?.addEventListener("click", () => {
            createLoginForm();
        });
    };

    var showChangePassword = function (lid) {
        let changePwd = `
            <div id="reset-pwd" class="password-change">
                <div class="showloader"></div>
                <h2>Change Password</h2>
                <div class="row">
                    <div class="col-md-12">
                        <form method="post" id="targetform"> 
                        <div class="form-elm-section input_sec ">									
                            <i class="lg_sprite oauth-eye-slash show-pwd" aria-hidden="true" data-testid="show-password">
                            </i>
                            <label for="oauth_curr_password">
                                Current Password
                            </label>
                            <input required="" data-id="" placeholder="" name="" type="password" id="oauth_curr_password" class="input_txt_box " value=""> 
							
									<p id="oauth_curr_password_err" class="error validation">
									</p>
								</div> <div class="form-elm-section input_sec ">
									
									<i class="lg_sprite oauth-eye-slash show-pwd" aria-hidden="true" data-testid="show-password">
									</i>
                                    <label for="oauth_new_password1">
                                        New Password
                                    </label>
									<input required="" data-id="" placeholder="" name="" type="password" id="oauth_new_password1" class="input_txt_box " value=""> 
									<p id="oauth_new_password1_err" class="error validation"></p>
								</div> 
                                <div class="form-elm-section input_sec ">									
									<i class="lg_sprite oauth-eye-slash show-pwd" aria-hidden="true" data-testid="show-password">
									</i>
                                    <label for="oauth_new_password2">
                                        Confirm New Password
                                    </label>
									<input required="" data-id="" placeholder="" name="" type="password" id="oauth_new_password2" class="input_txt_box " value=""> 
									<p id="oauth_new_password2_err" class="error validation"></p>
								</div>
                                <p class="error" id="main_password_err"></p><div class="form-elm-section"><input type="button" onclick="Samvaarta.system.passwordUpdated(1);" class="btn submit-button2" name="submit_new_password" value="Continue"></div></form></div></div></div>
        `;
        $("#model_content_" + lid).html(changePwd);
    };

    const changePassword = () => {
        Samvaarta.model.open_pop(showChangePassword, "", 1);
    };
    const passwordUpdated = () => {
        var paswrd = document.getElementById("oauth_curr_password").value;
        var new_paswrd = document.getElementById("oauth_new_password1").value;
        var cnfm_paswrd = document.getElementById("oauth_new_password2").value;
        var errorElements = document.querySelectorAll(".error");
        errorElements.forEach(function (el) {
            el.innerHTML = "";
        });

        var inputElements = document.querySelectorAll(
            "#reset-pwd .input_txt_box"
        );
        for (let i = 0; i < inputElements.length; i++) {
            if (
                inputElements[i].type !== "button" &&
                inputElements[i].type !== "checkbox"
            ) {
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
                    password_old: paswrd,
                    password: new_paswrd,
                    password_confirmation: cnfm_paswrd,
                    action: "password",
                },
                headers: {
                    Authorization: `Bearer ${Samvaarta.globalVar.oauthToken.access_token}`,
                    Accept: "application/json",
                },
            };

            function ajaxSuccessCall(data) {
                Samvaarta.model.close_pop(1);
                Samvaarta.model.showSuccessMessage(
                    `<h2>Thank You</h2><p>${Samvaarta.messageLog[11]}</p>`,
                    "y"
                );
            }
            function ajaxErrorCall(data) {
                $(".showloader").hide();
                if (data.responseJSON.code != 200) {
                    $("#oauth_new_password2_err")
                        .html(data.responseJSON.message)
                        .show();
                } else {
                    Samvaarta.model.close_pop(1);
                }
            }
            Samvaarta.common.hitAjaxApi(
                paramObject,
                ajaxSuccessCall,
                ajaxErrorCall
            );
        }
    };
    const editProfile = () => {
        let getOuathData = Samvaarta.common.getLocalStorage("oauthUserData");
        getOuathData = getOuathData.data.data?.name
            ? getOuathData.data.data
            : getOuathData.data;
        let profileDetail = `
            <h2 class="align-center">Edit Profile</h2>
            <div class="edit-profile__inner component-divider">
                <div class="edit-profile__inner--left photo-upload-container">
                    <div class="circle">
                        <img width="128" height="128" class="profile-pic" src="${
                            getOuathData.avatar
                                ? getOuathData.avatar
                                : "/images/default-face.jpg"
                        }">

                    </div>
                    <div class="p-image">
                        <i class="fa fa-camera upload-button"></i>
                        <input class="file-upload" type="file" accept="image/*" />
                    </div>
                </div>

                <div class="edit-profile__inner--right">
                    <div class="form-elm-section input_sec ">
                        <label for="oauth_log_email">
                            Email ID
                        </label>
                        <input required="" data-id="" placeholder="" name="" type="text" id="oauth_log_email" class="input_txt_box readonly valid" value="${
                            getOuathData.email
                        }" readonly="true" title="">
                        <p id="oauth_log_email_err" class="error"></p>
                    </div>

                    <div class="input-section-main">
                        <div class="form-elm-section input_sec ">
                            <label for="oauth_log_name">
                                Name
                            </label>
                            <input required="" data-id="" placeholder="" name="" type="text" id="oauth_log_name" class="input_txt_box valid" value="${
                                getOuathData.name
                            }" maxlength="45" title="">
                            <p id="oauth_log_name_err" class="error">
                            </p>
                        </div>
                        <div class="form-elm-section input_sec ">
                            <label for="oauth_function">
                                Function
                            </label>
                            <input required="" data-id="" placeholder="" name="" type="text" id="oauth_function" class="input_txt_box valid" value="${
                                getOuathData?.user_function ? getOuathData?.user_function : ""
                            }" maxlength="45" title="" >
                            <p id="oauth_function_err" class="error">
                            </p>
                        </div>
                    </div>
                    <div class="input-section-main">
                    <div class="form-elm-section input_sec ">
                        <label for="oauth_doj">
                            Date of Joining
                        </label>
                        <input required="" data-id="" readonly="true" placeholder="" name="" type="text" id="oauth_doj" class="input_txt_box valid" value="${Samvaarta.common.dateMonthYear(
                            getOuathData.created_at
                        )}" maxlength="45" title="">
                        <p id="oauth_doj_err" class="error">
                        </p>
                    </div>
                    <div class="form-elm-section input_sec ">
                        <label for="oauth_experience">
                            Experience
                        </label>
                        <input required="" data-id="" placeholder="" name="" type="text" id="oauth_experience" class="input_txt_box valid" value="${getOuathData.experience}" maxlength="45" title="">
                        <p id="oauth_experience_err" class="error">
                        </p>
                    </div>
                    </div>
                    <div class="input-section-main">
                        <div class="form-elm-section input_sec ">
                            <label for="oauth_log_vision"> Vision</label>
                            <input required="" data-id="" placeholder="" name="" type="text" id="oauth_log_vision" class="input_txt_box" value="${
                                getOuathData?.vision ? getOuathData?.vision : ''
                            }">
                            <p id="oauth_log_vision_err" class="validation error"></p>
                        </div>
                        <div class="form-elm-section input_sec_role ">
                            <label for="oauth_log_description"> Description</label>
                            <input required="" data-id="" placeholder="" name="" type="text" id="oauth_log_description" class="input_txt_box" value="${
                                getOuathData?.description ? getOuathData?.description : ''
                            }">

                            <p id="oauth_log_description_err" class="validation error"></p>
                        </div>
                    </div>

                    <div class="input-section-main">
                        <div class="form-elm-section input_sec ">
                            <label for="oauth_log_lnurl"> LinkedIn URL</label>
                            <input required="" data-id="" placeholder="" name="" type="text" id="oauth_log_lnurl" class="input_txt_box" value="${
                                getOuathData?.linkedin_url
                            }">
                            <p id="oauth_log_lnurl_err" class="validation error"></p>
                        </div>
                        <div class="form-elm-section input_sec_role ">
                            <label for="oauth_log_role"> Role</label>
                            <input required="" data-id="" placeholder="" name="" type="text" id="oauth_log_role" class="input_txt_box" value="${
                                getOuathData?.user_type
                            }">

                            <p id="oauth_log_role_err" class="validation error"></p>
                        </div>
                    </div>
                    <div class="input-section-main">
                        <div class="form-elm-section input_sec_num ">
                            <label for="oauth_log_number"> Phone No</label>
                            <select>
                                <option value="+91">+91</option>
                                <option value="+91">+01</option>
                                <option value="+91">+31</option>
                                <option value="+91">+11</option>
                                <option value="+91">+90</option>
                            </select>
                            <input required="" data-id="" placeholder="" name="" type="text" id="oauth_log_number" class="input_txt_box" value="${
                                getOuathData?.phone
                            }">
                            <p id="oauth_log_number_err" class="validation error"></p>
                        </div>
                        <div class="form-elm-section input_sec ">
                            <label for="oauth_location">
                                Location
                            </label>
                            <input required="" data-id="" readonly="true" placeholder="" name="" type="text" id="oauth_location" class="input_txt_box valid" value="${
                                getOuathData.location
                                    ? getOuathData.location
                                    : Samvaarta.common.getLocalStorage(
                                          "location"
                                      )?.data?.city
                            }" maxlength="50" title="">
                            <p id="oauth_location_err" class="error"></p>
                    </div>
                    </div>
                    <div class="form-elm-section marg-t20">
                        <input type="button" class="btn submit-button2" name="submit_profile" onclick="Samvaarta.system.userEditProfileUpdated(1);" value="Update Profile Details">
                    </div>
                </div>
            </div>
        `;
        document.querySelector("#edit-profile").innerHTML = profileDetail;
        photoUploadView();
    };

    const userEditProfileUpdated = () => {
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

        var inputElements = document.querySelectorAll(
            ".edit-profile__inner .input_txt_box"
        );
        for (let i = 0; i < inputElements.length; i++) {
            if (
                inputElements[i].type !== "button" &&
                inputElements[i].type !== "checkbox"
            ) {
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
                    user_function: userfunction,
                },
                headers: {
                    Authorization: `Bearer ${Samvaarta.globalVar.oauthToken.access_token}`,
                    Accept: "application/json",
                },
            };

            const ajaxSuccessCall = (response) => {
                Samvaarta.model.showSuccessMessage(
                    `<h2>Thank You</h2><p class="marg-t20">${Samvaarta.messageLog[12]}</p>`,
                    "y"
                );
                Samvaarta.common.setLocalStorage("oauthUserData", response, 1);
            };

            const ajaxErrorCall = (response) => {
                console.log(response);
            };

            Samvaarta.common.hitAjaxApi(
                paramObject,
                ajaxSuccessCall,
                ajaxErrorCall
            );
        }
    };

    const logout = () => {
        Samvaarta.common.deleteLocalStorage("oauthUserData");
        Samvaarta.common.deleteLocalStorage("AccessToken");
        Samvaarta.common.deleteLocalStorage("sessionList");
        Samvaarta.common.deleteLocalStorage("trainer_data");
        Samvaarta.common.deleteLocalStorage("users_data");
        Samvaarta.globalVar.is_loggedin = 0;
        window.location.href = "/";
    };

    const successReg = (id) => {
        const msg = `
            <figure class="">
                <img alt="/images/" src="/images/user-default.svg" width="80" height="80" />
            </figure>
            <h3>Your profile is undes review.</h3>
            <h4>A confirmation will be sent to your email ID <span>${id}</span></h4>
        `;
        //document.querySelector('model_content_1').innerHTML = msg;
        return msg;
    };

    const getUserData = (response) => {
        var paramObject = {
            url: apiUrl + "api/profile",
            type: "GET",
            data: {},
            headers: { Authorization: `Bearer ${response.access_token}` },
        };
        var ajaxSuccessCall = (response) => {
            Samvaarta.common.setLocalStorage("oauthUserData", response, 1);
            window.location.href = "/dashboard";
        };

        var ajaxErrorCall = (response) => {
            console.log(response);
        };

        Samvaarta.common.hitAjaxApi(
            paramObject,
            ajaxSuccessCall,
            ajaxErrorCall
        );
    };

    const loginUser = () => {
        var reg_email = document.getElementById("oauth_log_email").value;
        var reg_pwd = document.getElementById("oauth_log_password").value;
        var errorElements = document.querySelectorAll(".error");
        errorElements.forEach(function (el) {
            el.innerHTML = "";
        });

        var inputElements = document.querySelectorAll(
            ".signin-form .input_txt_box"
        );
        for (let i = 0; i < inputElements.length; i++) {
            if (
                inputElements[i].type !== "button" &&
                inputElements[i].type !== "checkbox"
            ) {
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
                    password: reg_pwd,
                },
            };
            var ajaxSuccessCall = (response) => {
                if (response.data.error) {
                    $("#oauth_log_password_err")
                        .html(response.data.error)
                        .show();
                } else {
                    Samvaarta.common.setLocalStorage(
                        "AccessToken",
                        response.data,
                        1
                    );
                    getUserData(response.data);
                }
            };

            var ajaxErrorCall = (response) => {
                if (response.response) {
                    $("#oauth_log_password_err").html(
                        response.response.data.message
                    );
                }
            };

            Samvaarta.common.hitAjaxApi(
                paramObject,
                ajaxSuccessCall,
                ajaxErrorCall
            );
        }
    };

    const verifyEmail = () => {
        const urlParams = new URLSearchParams(window.location.search);
        let verify_token = urlParams.get("token");
        let getOuathData = Samvaarta.common.getLocalStorage("oauthUserData");
        if (verify_token) {
            let paramObject = {
                url: apiUrl + "auth/verify-email",
                type: "post",
                data: { email: getOuathData.user.email },
                headers: { token: verify_token },
            };
            const ajaxSuccessCall = (response) => {
                console.log(response);
            };

            const ajaxErrorCall = (error) => {
                console.log(error);
            };

            Samvaarta.common.hitAjaxApi(
                paramObject,
                ajaxSuccessCall,
                ajaxErrorCall
            );
        }
    };

    var sendVerificationMail = (response) => {
        let paramObject = {
            url: apiUrl + "auth/send-verification-email",
            type: "post",
            headers: {
                Authorization: "Bearer " + response.data.tokens.access.token,
                "Content-Type": "application/json",
            },
        };

        const ajaxSuccessCall = (response) => {
            console.log(response);
        };

        const ajaxErrorCall = (error) => {
            console.log(error);
        };

        Samvaarta.common.hitAjaxApi(
            paramObject,
            ajaxSuccessCall,
            ajaxErrorCall
        );
    };

    var userRegistration = function () {
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

        var inputElements = document.querySelectorAll(
            ".authentication-form .input_txt_box"
        );
        for (let i = 0; i < inputElements.length; i++) {
            if (
                inputElements[i].type !== "button" &&
                inputElements[i].type !== "checkbox"
            ) {
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
                    Accept: "application/json",
                },
                data: {
                    email: reg_email,
                    name: reg_name,
                    password: reg_pwd,
                    phone: reg_phone,
                    linkedin: reg_linkedin,
                    user_type: reg_role,
                    //avatar: reg_avatar,
                },
            };

            const ajaxSuccessCall = (response) => {
                console.log(response);
                Samvaarta.model.showSuccessMessage(successReg(reg_email));
            };

            const ajaxErrorCall = (response) => {
                console.log(response);
            };

            Samvaarta.common.hitAjaxApi(
                paramObject,
                ajaxSuccessCall,
                ajaxErrorCall
            );
        }
    };

    var checkLoginStatus = () => {
        var userData = Samvaarta.common.getLocalStorage("oauthUserData");
        var token = Samvaarta.common.getLocalStorage("AccessToken");
        if (userData) {
            Samvaarta.globalVar.is_loggedin = 1;
            if (window.location.pathname === "/") {
                window.location.href = "/dashboard";
            }
            displayUserInfo(userData);
            window.loginCallback ? loginCallback(response) : false;
        } else if(token){
            var paramObject = {
                url: apiUrl + "api/profile",
                type: "GET",
                headers: {
                    Authorization: `Bearer ${Samvaarta.common.getLocalStorage("AccessToken").access_token}`,
                    Accept: "application/json",
                },                
            };

            const ajaxSuccessCall = (response) => {
                Samvaarta.common.setLocalStorage("oauthUserData", response, 1);
                displayUserInfo(response);
            };

            const ajaxErrorCall = (response) => {
                console.log(response);
            };

            Samvaarta.common.hitAjaxApi(
                paramObject,
                ajaxSuccessCall,
                ajaxErrorCall
            );
        } else {
            if (window.location.pathname === "/dashboard") {
                window.location.href = "/";
            } else {
                Samvaarta.system.createLoginForm();
            }
            //Samvaarta.system.createLoginForm();
        }
    };

    const activateDeactivateUser = (id, status) => {
        var paramObject = {
            url: apiUrl + "api/admin/user/activate/"+id+"?status="+status,
            type: "GET",
            data: {status: status},
            headers: {
                Authorization: `Bearer ${Samvaarta.common.getLocalStorage("AccessToken").access_token}`,
                Accept: "application/json",
            },
        };

        const ajaxSuccessCall = (response) => {
            console.log(response);                
            let statusInfo = ''; 
            if(status === '1'){
                statusInfo = `<span class="approved">Approved</span> <span onclick="Samvaarta.system.activateDeactivateUser(${id}, '0')">Undo</span>`;
            } else if(status === '2'){
                statusInfo = `<span onclick="Samvaarta.system.activateDeactivateUser(${id}, '0')">Undo</span> <span class="denied">Denied</span>`;
            } else {
                statusInfo = `<span onclick="Samvaarta.system.activateDeactivateUser(${id}, '1')">Approve</span> <span onclick="Samvaarta.system.activateDeactivateUser(${id}, '2')">Deny</span>`;
            }  
            $('.user-data-list #status_'+id).html(statusInfo);    
            Samvaarta.common.deleteLocalStorage('users_data');
            Samvaarta.common.deleteLocalStorage('trainer_data');
            adminDashboard('users');
        };

        const ajaxErrorCall = (response) => {
            console.log(response);
        };
        if(id){
            Samvaarta.common.hitAjaxApi(
                paramObject,
                ajaxSuccessCall,
                ajaxErrorCall
            );
        }
    }

    const userDashboard = () => {
        var userdashInfo = `
        <ul>
            <li class="active" onclick="Samvaarta.userDashboard.codeOfEthics()">
                <div class="dashboard__elements--item">
                    <h2>
                        <img alt="" src="/images/ethics.png" width="25" height="25" />
                        Code of ethics
                    </h2>
                </div>                
            </li> 
            <li id="" onclick="Samvaarta.userDashboard.docConversation();">
                <div class="dashboard__elements--item">
                    <h2>
                        <img alt="" src="/images/conversation.png" width="25" height="25" />
                        Documenting Conversations
                    </h2>
                </div>
            </li>           
            <li onclick="Samvaarta.userDashboard.desObjective();">
                <div class="dashboard__elements--item">
                    <h2>
                        <img alt="" src="/images/objective.png" width="25" height="25" />
                        Desired Objective
                    </h2>
                </div>                
            </li>
            <li onclick="Samvaarta.userDashboard.desOutcomes();">
                <div class="dashboard__elements--item">
                    <h2>
                        <img alt="" src="/images/outcomes.png" width="25" height="25" />
                        Desired Outcomes
                    </h2>
                </div>                
            </li>
            
            <li onclick="Samvaarta.userDashboard.closureInteraction();">
                <div class="dashboard__elements--item">
                    <h2>
                        <img alt="" src="/images/closure.png" width="25" height="25" />
                        Closing of Interaction
                    </h2>
                </div>                
            </li>            
            
        </ul>
        <div class="user-activity-details">
            <div class="user-activity-details__inner"></div>
        </div>
        `;
        $(".user-dashboard-info").html(userdashInfo);
    };

    const trainerDashboard = () => {

    };

    const displayTypeWise = (response, type) => {
        let userInfo = '';
        let statusInfo = ``, assignTrainer = '', userList = '', adminList = '';
        var trainerdata = Samvaarta.common.getLocalStorage('trainer_data');
        if(type === 'users'){
            assignTrainer = `<td>Assign Trainer</td>`;
        } else if(type === 'trainer'){
            userList = `<td>Assigned User</td>`;
        } else {
            adminList = `<td></td>`;
        }
        userInfo += ``;
        userInfo += `<tr class="user-dashboard-info__head-list">
            <td>SNO.</td>
            <td>Name</td>
            <td>Email</td>                
            <td>Status</td>
            ${assignTrainer}
            ${userList}
            ${adminList}
        </tr>`;
        response.map((item, index) => {
            let trainerList = '';
            if(type === 'users'){  
                if(!item.trainer?.length){      
                    trainerList += `<select class="input_txt_box select-box" onchange="Samvaarta.system.assignedTrainer(this);">
                        <option value="select">Select Trainer</option>
                    `;
                    trainerdata.map((titem) => {
                        trainerList += `<option userId="${item.id}" value="${titem.id}">${titem.name}</option>`;
                    })
                    trainerList += `</select>`;
                } else {
                    trainerList = `${item.trainer[0].name}`;
                }
            } else if(type === 'trainer'){
                if(item.users.length){
                trainerList += `<div class="assigned-user-list">
                    <h3>Assigned User List</h3>
                    <ul>
                `;
                item.users?.map((titem) => {
                    trainerList += `<li trainerId="${item.id}" userId="${titem.id}">${titem.name}</li>`;
                })
                trainerList += `</ul>`;
                } else {
                    trainerList = 'No User';
                }
            }
            if(parseFloat(item.status) === 1){
                statusInfo = `<span class="approved">Approved</span> <span onclick="Samvaarta.system.activateDeactivateUser(${item.id}, '0')">Undo</span>`;
            } else if(parseFloat(item.status) === 2){
                statusInfo = `<span onclick="Samvaarta.system.activateDeactivateUser(${item.id}, '0')">Undo</span> <span class="denied">Denied</span>`;
            } else {
                statusInfo = `<span onclick="Samvaarta.system.activateDeactivateUser(${item.id}, '1')">Approve</span> <span onclick="Samvaarta.system.activateDeactivateUser(${item.id}, '2')">Deny</span>`;
            }
            userInfo += `<tr>`;
            userInfo += `<td>${index+1}</td>`;
            userInfo += `<td class="camel-case">${item.name}</td>`;
            userInfo += `<td>${item.email}</td>`;
            userInfo += `<td id="status_${item.id}">${statusInfo}</td>`;
            userInfo += `<td>${trainerList}</td>`;
            userInfo += `</tr>`;
        });
        $(".user-dashboard-info").addClass('admin-info');
        $(".user-dashboard-info .user-data-list tbody").html(userInfo);
        $('.show-role-tab').removeClass('hide');
        showRoleTab();
    }

    const getTrainerData = (type) => {
        var paramObject = {
            url: apiUrl + "api/admin/"+type+"/listing",
            type: "GET",
            data: {},
            headers: {
                Authorization: `Bearer ${Samvaarta.common.getLocalStorage("AccessToken").access_token}`,
                Accept: "application/json",
            },
        };

        const ajaxSuccessCall = async(response) => {
            response = response.data.data;
            Samvaarta.common.setLocalStorage(type+'_data', response, expireTime);
            setTimeout(() => {
                Samvaarta.userDashboard.trainerOptionList();
            }, 1000);
        };

        const ajaxErrorCall = (response) => {
            console.log(response);
        };

        Samvaarta.common.hitAjaxApi(
            paramObject,
            ajaxSuccessCall,
            ajaxErrorCall
        );
        
    }
    const adminDashboard = (type) => {
        var typeWisedata = Samvaarta.common.getLocalStorage(type+'_data');
        var paramObject = {
            url: apiUrl + "api/admin/"+type+"/listing",
            type: "GET",
            data: {},
            headers: {
                Authorization: `Bearer ${Samvaarta.common.getLocalStorage("AccessToken").access_token}`,
                Accept: "application/json",
            },
        };

        const ajaxSuccessCall = async(response) => {
            response = response.data.data;
            Samvaarta.common.setLocalStorage(type+'_data', response, expireTime);
            
            getTrainerData('trainer');
            setTimeout(() => {
                displayTypeWise(response, type);
            },1000);       
        };

        const ajaxErrorCall = (response) => {
            console.log(response);
        };

        if(!typeWisedata){
            Samvaarta.common.hitAjaxApi(
                paramObject,
                ajaxSuccessCall,
                ajaxErrorCall
            );
        } else {
            displayTypeWise(typeWisedata, type);
            setTimeout(() => {
                Samvaarta.userDashboard.trainerOptionList();
            }, 1000);
        }
    };

    const showUserInfo = (response) => {
        var coachInfo = '', cochees = '', trainer = '', plannedSess = '', 
        concluded = '', nextSession = '', completeSessCount = '', userExp = '', userFun = '', downloadReport = '';
        if (response.user_type === "admin") {
            cochees = `<li>No of Coachees: <span></span></li>`;
            trainer = `<li>No of Coaches: <span></span></li>`;            
            adminDashboard('users');
        } else if (response.user_type === "trainer") {
            cochees = `<li>No of Coachees: <span></span></li>`;
            completeSessCount = `<li>No of sessions completed: <span></span></li>`;
            trainerDashboard();
        } else {
            userDashboard();
            coachInfo = `<li id="${response?.trainer?.length ? response?.trainer[0]?.id : ''}">Coach Name: <span style="text-transform:capitalize;">${response?.trainer?.length ? response.trainer[0]?.name : ''}</span></li>`;
            plannedSess = `<li>Planned Sessions: <span>${response.plannedSession ? response.plannedSession : ''}</span></li>`;
            concluded = `<li>Concluded: <span></span></li>`;
            nextSession = `<li>Next Session Date: <span></span></li>`;
            userExp = `<li>Experience: <span>${response.experience}</span></li>`;
            userFun = `<li>Function: <span>${response.user_function}</span></li>`;
            downloadReport = `<li class="download-report"><button class="btn">Download Report</button></li>`;

        }
        const userInfo = `
        <h3 class="userName">Welcome ${response.name.split(" ")[0]} </h3>
        <div class="upcoming-session">
            <a href="/upcoming_session" data-type="upcoming-session">
                <i class="fa fa-circle fa-fw"></i>
                <span class="desktop-view">Upcoming Session</span>
            </a>
        </div>
        <div class="show-user-details__inner">
            <div class="show-user-details__inner--left detail-items">
                <ul>
                    <li>Code: <span>${response.id}</span></li>
                    <li>Date of Joining: <span>${Samvaarta.common.dateMonthYear(
                        response.created_at
                    )}</span></li>
                    ${coachInfo}
                    ${userExp}
                    ${userFun}
                    <li class="role">Role: <span>${
                        response.user_type
                    }</span></li>
                    <li>Location: <span>${
                        response.location
                            ? response.location
                            : Samvaarta.common.getLocalStorage("location")?.data.city
                    }</span></li>
                </ul>
            </div>
            <div class="show-user-details__inner--mid detail-items">
                <ul>
                    <li>Vision: <span>${response.vision}</span></li>
                    <li>Brief Description: <span>${response.description}</span></li>
                    ${plannedSess}  ${cochees}  ${trainer} 
                    ${concluded} ${nextSession}  ${completeSessCount}                 
                </ul>
            </div>
            <div class="show-user-details__inner--right detail-items">
                <ul>
                    <li class="profile-img"><img src="${
                        response.avatar ? response.avatar : '/images/default-face.jpg'
                    }" width="100" height="100" alt="profile"></li>
                    <li>LinkedIn: <span>${response.linkedin_url}</span></li>
                    <li>Email Id: <span>${response.email}</span></li>
                    <li>Mobile No: <span>${response.phone}</span></li>
                    ${downloadReport}
                </ul>
            </div>
        </div>
        `;
        $(".show-user-details").html(userInfo);
    };

    var displayUserInfo = (data) => {
        oauthUserData = data.data;
        let userDetails = data.data.data?.name ? data.data.data : data.data;
        if (data) {
            showUserInfo(userDetails);
            Samvaarta.globalVar.oauthToken =
                Samvaarta.common.getLocalStorage("AccessToken");
            Samvaarta.globalVar.is_loggedin = 1;
            let username = userDetails.name.split(" ")[0];
            userType = userDetails.user_type;
            let userTypreDescription = "";
            document.querySelector(
                ".dashboard__header--welcome span"
            ).innerHTML = username;
            if (userType === "trainer") {
                userTypreDescription = `
                <li>
                    <a tabindex="0" role="button" href="/user-details">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>User Detail
                    </a>
                </li>	`;
            } else if (userType === "admin") {
                userTypreDescription = `
                <li>
                    <a tabindex="0" role="button" href="/user-details">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>User Detail
                    </a>
                </li>
                <li>
                    <a tabindex="0" role="button" href="/trainer-details">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>Trainer Detail
                    </a>
                </li>	
                `;
                Samvaarta.userDashboard.updateSessionForm();
            } else {
            }
            let userData = `
				<div class="d-flex align-items-center">
					<div class="flex-shrink-0">
					<img width="20" height="20" data-src="${userDetails.avatar}" src="/images/user-default.svg" class="unveil avatar" alt="${username}" />
					</div>					
				</div>
				
				<div class="header-user-nav">
					<div class="hvr_bx">
						<ul>
                            <li>
                                <a tabindex="0" role="button" href="/dashboard">
                                <i class="fa fa-tachometer" aria-hidden="true"></i>Dashboard
                                </a>
                            </li>	
							<li>
								<a tabindex="0" role="button" href="/myaccount">
									<i class="fa fa-pencil"></i>Edit Profile
								</a>
							</li>							
							<li class="change-password">
								<a href="/change-password" tabindex="0" role="button">
									<i class="fa fa-key"></i>Change Password
								</a>
							</li>
                            ${userTypreDescription}
							<li>
								<a href="javascript:void(0);" tabindex="0" role="button" onclick="Samvaarta.system.logout()">
									<i class="fa fa-power-off"></i>Logout
								</a>
							</li>
						</ul>
					</div>
				</div>
			`;

            $(".dashboard__header--loggedin-user").html(userData).addClass('oauth');
        }
    };

    var forgetPassword = () => {
        let reg_email = $("#oauth_log_email").val();
        $(".error").html("");

        $(".authentication-form input").each(function () {
            if (
                $(this).attr("type") != "button" &&
                $(this).attr("type") != "checkbox"
            ) {
                Samvaarta.common.removeRequiredFields($(this));
                if (valError) {
                    return false;
                }
            }
        });

        if (valError) {
            return false;
        } else {
            let paramObject = {
                url: apiUrl + "auth/forgot-password",
                type: "post",
                data: { email: reg_email },
            };

            const ajaxSuccessCall = (response) => {
                console.log(response);
            };

            const ajaxErrorCall = (error) => {
                if (error.response) {
                    $("#oauth_log_email_err")
                        .html(error.response.data.message)
                        .show();
                }
            };

            Samvaarta.common.hitAjaxApi(
                paramObject,
                ajaxSuccessCall,
                ajaxErrorCall
            );
        }
    };

    const assignedTrainer = (event) => {
        let trainerid = $(event)[0].options[$(event)[0].options.selectedIndex].getAttribute('value');
        let userId = $(event)[0].options[$(event)[0].options.selectedIndex].getAttribute('userid');
        var paramObject = {
            url: apiUrl + "api/admin/user/assign_trainer",
            type: "POST",
            data: {user_id: userId, trainer_id: trainerid},
            headers: {
                Authorization: `Bearer ${Samvaarta.common.getLocalStorage("AccessToken").access_token}`,
                Accept: "application/json",
            },
        };

        const ajaxSuccessCall = async(response) => {
            if(response.data?.success === 'true'){
                Samvaarta.common.deleteLocalStorage('users_data');
                Samvaarta.common.deleteLocalStorage('trainer_data');
                adminDashboard('users');
            } else {
                Samvaarta.common.toastMsg('User is not activate yet, Please activate first.');
            }
        };

        const ajaxErrorCall = (response) => {
            console.log(response);
        };

        Samvaarta.common.hitAjaxApi(
            paramObject,
            ajaxSuccessCall,
            ajaxErrorCall
        );
    }

    return {
        loginUser: loginUser,
        userRegistration: userRegistration,
        displayUserInfo: displayUserInfo,
        checkLoginStatus: checkLoginStatus,
        verifyEmail: verifyEmail,
        forgetPassword: forgetPassword,
        createLoginForm: createLoginForm,
        logout: logout,
        changePassword: changePassword,
        editProfile: editProfile,
        passwordUpdated: passwordUpdated,
        userEditProfileUpdated: userEditProfileUpdated,
        assignedTrainer: assignedTrainer,
        activateDeactivateUser: activateDeactivateUser,
        adminDashboard: adminDashboard,        
    };
})();

Samvaarta.userDashboard = (() => {
    
    const codeOfEthics = () => {
        let codeOfEthics = `
        <div class="details codeofethics">
            <h3>Code of ethics</h3>
            <p>CoE refers to the responsible behavior that will be displayed by partied involved during the interaction period</p>
            <div class="details--items">
                <h3>Coachee’s Code of Ethics</h3>
                <ul class="list-view">
                    <li>I shall be sharing the details truthfully without any fear</li>
                    <li>I commit to implement my commitments made in the interaction</li>
                    <li>The responsibility of my growth life within me</li>
                </ul>
            </div>
            <div class="details--items">
                <h3>The coach / Mentor has agreed to the following</h3>
                <ul class="list-view">
                    <li>The coach will be 100% invested in you during the interaction</li>
                    <li>The coach’s role will be to ask you question to help you explore</li>
                    <li>The coach maintain the confidentiality of the interaction.</li>
                </ul>
            </div>            
        </div>
        `;
        $('.user-activity-details__inner').html(codeOfEthics);
    }
    const closureInteraction = () => {
        let closure = `
        <div class="details codeofethics">
            <h3>Closure</h3>
            <p>Please document your experience on your journey </p>
            <div class="details--items">
                <h3>User Experience</h3>
                <ul class="list-view">
                    <li>
                        <label for="user_enjoyed">I enjoyed....</label>
                        <textarea rows="2" cols="50" type="text" id="user_enjoyed" value="" class="input_txt_box"></textarea>
                    </li>
                    <li>
                        <label for="user_wished">I wish....</label>
                        <textarea rows="2" cols="50" type="text" id="user_wished" value="" class="input_txt_box"></textarea>
                    </li>
                    <li>
                        <label for="user_gained">I gained by way of....</label>
                        <textarea rows="2" cols="50" type="text" id="user_gained" value="" class="input_txt_box"></textarea>
                    </li>
                </ul>
            </div>
            <div class="details--items">
                <h3>Manager Experience</h3>
                <ul class="list-view">
                    <li>
                        <label for="manager_enjoyed">I enjoyed....</label>
                        <textarea rows="2" cols="50" type="text" id="manager_enjoyed" value="" class="input_txt_box"></textarea>
                    </li>
                    <li>
                        <label for="manager_wished">I wish....</label>
                        <textarea rows="2" cols="50" type="text" id="manager_wished" value="" class="input_txt_box"></textarea>
                    </li>
                </ul>
            </div>   
            <button class="btn" onclick="Samvaarta.setGetUserDashboard.closure()">Submit</button>         
        </div>
        `;
        $('.user-activity-details__inner').html(closure);
    }    
    const trainerOptionList = () => {
        var trainerdata = Samvaarta.common.getLocalStorage('trainer_data');
        if(trainerdata){
            let trainerList = '';
            trainerList += `<select id="assign_trainer" class="input_txt_box select-box">
                <option value="select">Select Trainer</option>
            `;
            trainerdata.map((titem) => {
                trainerList += `<option value="${titem.id}">${titem.name}</option>`;
            })
            trainerList += `</select>`;
            $('.upcoming_session_container .trainer-list').html(trainerList);
        } 
    }
    const updateSessionForm = () => {
        
        let sessionForm = `
            <div class="input-section-main">
                <div class="form-elm-section input_sec">
                    <label for="datepicker">
                        Session Date
                    </label>
                    <input readonly class="input_txt_box" type="text" id="datepicker" placeholder="Date"
                        maxlength="10">                    
                    <script>setTimeout(() => { $("#datepicker").datepicker()}, 1000)</script>  
                    <p id="datepicker_err" class="error validation"></p>                  
                </div>
                <div class="form-elm-section input_sec ">
                    <label for="session_duration">
                        Session Duration
                    </label>
                    <input placeholder="" name="" type="text" id="session_duration" class="input_txt_box" value="" title="">
                    <p id="session_duration_err" class="error validation"></p>
                </div>
            </div>
            <div class="input-section-main">
                <div class="form-elm-section input_sec ">
                    <label for="session_name">
                        Session Name
                    </label>
                    <input placeholder="" name="" type="text" id="session_name" class="input_txt_box" value="" title="">
                    <p id="session_name_err" class="error validation"></p>
                </div>
                <div class="form-elm-section input_sec ">     
                    <label for="session_name">
                        Session Status
                    </label>           
                    <select id="session_status" class="input_txt_box select-box">
                        <option value="select">Select Session Status</option>
                        ${generateOptions(sessionStatus)}
                    </select>
                    <p id="session_name_err" class="error validation"></p>
                </div>
            </div>
            <div class="input-section-main">
                <div class="form-elm-section input_sec ">
                    <label for="session_desc">
                        Session Description
                    </label>
                    <input placeholder="" name="" type="text" id="session_desc" class="input_txt_box" value="" title="">
                    <p id="session_desc_err" class="error validation"></p>
                </div>
                <div class="form-elm-section input_sec ">
                    <label for="assign_trainer">
                        Assign Trainer
                    </label>
                    <div class="trainer-list">
                        <select class="input_txt_box select-box">
                            <option value="select">Select Trainer</option>
                        </select>
                    </div>
                    
                    <p id="assign_trainer_err" class="error validation"></p>
                </div>
            </div>
            <div class="form-elm-section marg-t20">
                <input type="button" class="btn submit-button2" name="submit_profile" onclick="Samvaarta.userDashboard.updateSession(1);" value="Update Session">
            </div>
        `;
        $('.upcoming_session_container').html(sessionForm);
    }
    const updateSession = () => {
        var datepicker = document.getElementById("datepicker").value;
        var sesDuration = document.getElementById("session_duration").value;
        var session_name = document.getElementById("session_name").value;
        var session_status = document.getElementById("session_status").value;
        var session_desc = document.getElementById("session_desc").value;
        var assign_trainer = document.getElementById("assign_trainer").value;
        var errorElements = document.querySelectorAll(".error");
        let formattedDate = '';
        if(datepicker){
            const date = new Date(datepicker);
            formattedDate = date.toISOString().split('T')[0];
        }
        errorElements.forEach(function (el) {
            el.innerHTML = "";
        });

        var inputElements = document.querySelectorAll(
            ".upcoming_session_container .input_txt_box"
        );
        for (let i = 0; i < inputElements.length; i++) {
            if (
                inputElements[i].type !== "button" &&
                inputElements[i].type !== "checkbox"
            ) {
                Samvaarta.common.removeRequiredFields(inputElements[i]);
                if (valError) {
                    return false;
                }
            }
        }

        if (valError) {
            return false;
        } else {
            let paramObject = {
                url: apiUrl + "api/admin/session/add",
                type: "POST",
                headers: {
                    Authorization: `Bearer ${Samvaarta.globalVar.oauthToken.access_token}`,
                    Accept: "application/json",
                },
                data: {
                    session_date: formattedDate,
                    trainer_id: assign_trainer,
                    duration: sesDuration,
                    topic: session_name,
                    description: session_desc,
                    session_status: session_status,
                },
            };

            const ajaxSuccessCall = (response) => {
                $('.upcoming_session_container input').val('');
                getSessionList("api/admin/sessions");
            };

            const ajaxErrorCall = (error) => {
                if (error.response) {
                    $("#oauth_log_email_err")
                        .html(error.response.data.message)
                        .show();
                }
            };

            Samvaarta.common.hitAjaxApi(
                paramObject,
                ajaxSuccessCall,
                ajaxErrorCall
            );
        }
    }
    const displaySessionList = (response) => {
        let sessionList = '';
        response?.data?.data.map((item, index) => {
            sessionList += `
                <tr>
                    <td>${index+1}</td>
                    <td>${(item.session_date).split(' ')[0]}</td>
                    <td>${item.topic}</td>
                    <td>${item.duration}</td>
                    <td>${item?.trainer?.name}</td>
                </tr>
            `;
        });
        $('.upcoming_session_list tbody').html(sessionList);
    }
    const getSessionList = (sessionURL) => {
        let paramObject = {
            url: apiUrl + sessionURL,
            type: "GET",
            headers: {
                Authorization: `Bearer ${Samvaarta.globalVar.oauthToken.access_token}`,
                Accept: "application/json",
            },
        };

        const ajaxSuccessCall = (response) => {            
            if(response?.data?.data?.length){                
                Samvaarta.common.setLocalStorage('sessionList', response, expireTime);
                displaySessionList(response);
            } else {
                $('.upcoming_session_list').html('<h2>No upcoming session available.</h2>');
            }            
        };

        const ajaxErrorCall = (error) => {
            if (error.response) {
                $("#oauth_log_email_err")
                    .html(error.response.data.message)
                    .show();
            }
        };

        Samvaarta.common.hitAjaxApi(
            paramObject,
            ajaxSuccessCall,
            ajaxErrorCall
        );
        
    }
    const interactionList = () => {
        const interactionNameList = Samvaarta.common.getLocalStorage('sessionList');
        let interactions = '<option value="">Choose Session</option>';
        if(interactionNameList?.data?.data?.length){
            interactionNameList?.data?.data.map((item, index) => {
                interactions += `<option value="${item.session_id}">${item.topic}</option>`;
            })
            $('.details--items__topics #interaction_name, .session-data #interaction_name').html(interactions);
        }
    }
    const docConversation = () => {
        let docCon = `
        <div class="details">
            <h3>Documenting Conversations</h3>
            <p>They are filled in weekly ideally</p>
            <p>Firstly – When a formal conversation with coach has taken place</p>
            <p>Secondly – When you want to discuss any situation, share any development</p>
            <p>You can upload a voice or video file, ppt, pdf, word or excel file</p>
            <div id="" class="details--items previous">
                <h3>Previous Interactions</h3>
                <div class="previous-transactions">
                </div>
            </div>
            <div id="" class="details--items current">
                <h3>Current Interactions</h3>
                <ul class="details--items__topics">
                    <li class="">
                        <label for="user_focus" class="topic">Focus of the day</label>
                        <textarea rows="2" cols="50" type="text" id="user_focus" value="" class="input_txt_box" ></textarea>
                        <p id="user_focus_err" class="error"></p>
                    </li>
                    <li>
                        <label for="user_last_commitment" class="topic">Last weeks commitment</label>
                        <textarea rows="2" cols="50" type="text" id="user_last_commitment" value="" class="input_txt_box" ></textarea>
                        <p id="user_last_commitment_err" class="error"></p>
                    </li>
                    <li>
                        <label for="user_conversation" class="topic">Today’s conversation</label>
                        <textarea rows="2" cols="50" type="text" id="user_conversation" value="" class="input_txt_box" ></textarea>
                        <p id="user_conversation_err" class="error"></p>
                    </li>
                    <li>
                        <label for="user_week_commitment" class="topic">Commitment for the week</label>
                        <textarea rows="2" cols="50" type="text" id="user_week_commitment" value="" class="input_txt_box" ></textarea>
                        <p id="user_week_commitment_err" class="error"></p>
                    </li>
                    <li>
                        <label for="user_comments" class="topic">Coach’s Comments</label>
                        <input readonly type="text" id="user_comments" value="" class="input_txt_box" />
                    </li>
                    <li>
                        <label for="next_interaction_date" class="topic">Next Interaction Date</label>
                        <input readonly placeholder="Next Interaction Date" type="text" id="next_interaction_date" value="" class="input_txt_box" />
                        <script>$('#next_interaction_date').datepicker();</script>
                        <p id="next_interaction_date_err" class="error"></p>
                    </li>
                    <li>
                        <label for="interaction_name" class="topic">Interaction Name</label>                        
                        <div class="interaction_name">
                            <select id="interaction_name" class="input_txt_box">
                                
                            </select>
                            <p id="interaction_name_err" class="error"></p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="form-elm-section btn-container marg-t10">
                <input type="file" id="hiddenFileInput" style="display:none;" onchange="displayFileName()">
                <button class="btn" onclick="document.getElementById('hiddenFileInput').click();">Upload File</button>
                <span id="fileNameDisplay"></span>
                <button class="btn" onclick="Samvaarta.setGetUserDashboard.setDocConversation()">Save</button>
                <script>
                    function displayFileName() {
                        const fileInput = document.getElementById('hiddenFileInput');
                        const fileNameDisplay = document.getElementById('fileNameDisplay');
                        
                        if (fileInput.files.length > 0) {
                            // Get the name of the selected file
                            const fileName = fileInput.files[0].name;
                            fileNameDisplay.textContent = fileName;
                        } else {
                            fileNameDisplay.textContent = "";
                        }
                    }
                </script>
            </div>
        </div>
        `;
        $('.user-activity-details__inner').html(docCon);
        setTimeout(() => {
            interactionList();
            Samvaarta.setGetUserDashboard.getDocConversation();
        },1000);
    }
    const desObjective = () => {
        let objective = `
        <div class="details">
            <h3>Desired Objective</h3>
            <div class="session-data">
                <div class="interaction_name">
                    <select id="interaction_name" class="input_txt_box">
                        
                    </select>
                    <p id="interaction_name_err" class="error"></p>
                </div>
            </div>
            <div class="details--items quantitative">
                <h3>Quantitative Parameters – <span>They refer to the past, current and future performance</span></h3>
                <h4>The following details needs to be filled up</h4>
                <ul class="details--items__topics">
                    <li>Measurable parameters – 3</li>
                    <li>Mention the units of measurement for example in% or unit</li>
                    <li>Performance of the parameter over of last two month and current month Future months</li>
                    <li>For example –
                        <ul>
                            <li>Parameter - Emp attrition</li>
                            <li>Measurement - %: Performance jun - 16%, Jul - 17%, Aug - 16%</li>
                        </ul> 
                    </li>
                </ul>
                <div class="quantitative__data">
                    <table class="complex-view">
                        <thead>
                            <tr class="user-dashboard-info__head-list">
                                <td>Parameter</td>
                                <td>Unit of Measurement</td>
                                <td>Performance</td>
                            </tr>                            
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="details--items qualitative">
                <h3>Qualitative Parameters – <span>They refer to the behavioural shift you desire</span></h3>
                <h4>The following details needs to be filled up</h4>
                <ul class="details--items__topics">
                    <li>Mention the parameter</li>
                    <li>Give a brief description of the parameter</li>
                    <li>They should be influencing the quantitative parameter</li>
                    <li>For Example 
                        <ul>
                            <li>Parameter - Customer Relationship</li>
                            <li>Brief Description - Develop and maintain strong relationships with key clients and accounts</li>
                        </ul>
                    </li>
                </ul>
                <div class="qualitative__data">
                    <table class="light-view">
                        <thead>
                            <tr class="user-dashboard-info__head-list">
                                <td>Parameter</td>
                                <td>Brief Description</td>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="form-elm-section marg-t10">
                <button onclick="Samvaarta.setGetUserDashboard.setDesiredObjective()" class="btn">Submit</button>
            </div>
        </div>
        `;
        $('.user-activity-details__inner').html(objective);
        Samvaarta.setGetUserDashboard.getDesiredObjective();
        interactionList();
    }
    const desOutcomes = () => {
        let outcome = `
        <div class="details">
            <h3>Desired Outcomes</h3>
            <p>Desired outcomes refers to the state you desire at the end of the period                    </p>
            <div class="details--items outcomes">
                <h4>The following details needs to be filled up</h4>
                <ul class="details--items__topics">
                    <li>Mention the parameter</li>
                    <li>Describe the outcome you like. This will include the way you will feel, hear, say and do after a desired a period of time</li>
                    <li>For example
                        <ul>
                            <li>Parameter – Manager Relationship</li>
                            <li>Brief Description – My manager is talking is trusting me by giving important tasks beyond the KRAs</li>
                        </ul>
                    </li>
                </ul>
                <div class="outcomes__data">
                    <table class="light-view">
                        <thead>
                            <tr class="user-dashboard-info__head-list">
                                <td>Parameter</td>
                                <td>Brief Description</td>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                    <div class="form-elm-section marg-t10">
                        <button onclick="Samvaarta.setGetUserDashboard.setDesiredOutcomes()" class="btn">Submit</button>
                    </div>
                </div>
            </div>
            
        </div>
        `;
        $('.user-activity-details__inner').html(outcome);
        Samvaarta.setGetUserDashboard.getDesiredOutcomes();
    }
    return {
        codeOfEthics: codeOfEthics,
        updateSession: updateSession,
        getSessionList: getSessionList,
        updateSessionForm: updateSessionForm,
        docConversation: docConversation,
        desObjective: desObjective,
        desOutcomes: desOutcomes,
        trainerOptionList: trainerOptionList,
        displaySessionList: displaySessionList,
        closureInteraction: closureInteraction,
    }
})();

Samvaarta.setGetUserDashboard = (() => {
    const setDocConversation = () => {
        var user_focus = document.getElementById("user_focus").value;
        var last_commitment = document.getElementById("user_last_commitment").value;
        var user_conversation = document.getElementById("user_conversation").value;
        var week_commitment = document.getElementById("user_week_commitment").value;
        var next_interaction_date = document.getElementById("next_interaction_date").value;
        var interaction_name = document.getElementById("interaction_name").value;
        var fileupload = document.getElementById("hiddenFileInput").files[0];
        var formattedDate = '';
        if(next_interaction_date){
            const date = new Date(next_interaction_date);
            formattedDate = date.toISOString().split('T')[0];
        }
        let formData = new FormData();
        formData.append("doc_file", fileupload);
        formData.append("focus_of_the_day", user_focus);
        formData.append("today_conversion", user_conversation);
        formData.append("feedback", week_commitment);
        formData.append("next_date", formattedDate);
        formData.append("last_week_comments", last_commitment);
        formData.append("session_id", interaction_name);
        
        var errorElements = document.querySelectorAll(".error");
        
        errorElements.forEach(function (el) {
            el.innerHTML = "";
        });

        var inputElements = document.querySelectorAll(
            ".details--items__topics .input_txt_box"
        );
        for (let i = 0; i < inputElements.length; i++) {
            if (
                inputElements[i].type !== "button" &&
                inputElements[i].type !== "checkbox"
            ) {
                Samvaarta.common.removeRequiredFields(inputElements[i]);
                if (valError) {
                    return false;
                }
            }
        }

        if (valError) {
            return false;
        } else {
            let paramObject = {
                url: apiUrl + "api/profile/documenting-conversations",
                type: "POST",
                headers: {
                    Authorization: `Bearer ${Samvaarta.globalVar.oauthToken.access_token}`,
                    Accept: "application/json",
                },
                "mimeType": "multipart/form-data",
                data: formData                
            };

            const ajaxSuccessCall = (response) => {
                $('.details--items__topics input').val('');
                if(response?.data?.success === 'true'){
                    getDocConversation();
                    Samvaarta.model.showSuccessMessage(
                        `<h2>Thank You</h2><p class="marg-t20">${Samvaarta.messageLog[16]}</p>`,
                        "y"
                    );
                } else {
                    $("#interaction_name_err")
                        .html(response?.data)
                        .show();
                }
            };

            const ajaxErrorCall = (error) => {
                if (error.response) {
                    $("#interaction_name_err")
                        .html(error.response.data.message)
                        .show();
                }
            };

            Samvaarta.common.hitAjaxApi(
                paramObject,
                ajaxSuccessCall,
                ajaxErrorCall
            );
        }
    }
    const previousTransactions = (response) => {
        console.log(response);
        let previous = ``;
        if(response?.data?.length){
            previous += `<table>
                <tr class="user-dashboard-info__head-list">
                    <td>S.No</td>
                    <td>Date</td>
                    <td>Transaction</td>
                    <td>Trainer</td>
                    <td>Edit/Update</td>
                </tr>
            `;
            response?.data.map((item, index) => {
                previous += `<tr class="pre-tracs-data">
                    <td doc-id="${item?.id}">${index+1}</td>
                    <td>${getDateFormat(item?.created_at)}</td>
                    <td session-id="${item?.session?.session_id}">${item.session?.topic}</td>
                    <td trainer-id="${item?.session?.trainer?.id ? item?.session?.trainer?.id : oauthUserData?.trainer[0]?.id}">${item.session?.trainer?.name ? item.session?.trainer?.name : oauthUserData?.trainer[0]?.name}</td>
                    <td class="edit-transaction" onclick="Samvaarta.setGetUserDashboard.editTransaction(${item.id})">Edit</td>
                    <div class="update-transaction-container hide" id="edit-doc-${item.id}" data-docId="${item.id}" data-session="${item?.session?.session_id}">
                        <ul class="details--items__topics">
                            <li class="section_${index+1}">
                                <label for="user_focus_${item.id}" class="topic">Focus of the day</label>
                                <textarea rows="2" cols="50" type="text" id="user_focus_${item.id}" class="input_txt_box"></textarea>
                            </li>
                            <li class="section_${index+1}">
                                <label for="user_last_commitment_${item.id}" class="topic">Last weeks commitment</label>
                                <textarea rows="2" cols="50" type="text" id="user_last_commitment_${item.id}" class="input_txt_box"></textarea>
                            </li>
                            <li class="section_${index+1}">
                                <label for="user_conversation_${item.id}" class="topic">Today’s conversation</label>
                                <textarea rows="2" cols="50" type="text" id="user_conversation_${item.id}" class="input_txt_box"></textarea>
                            </li>
                            <li class="section_${index+1}">
                                <label for="user_week_commitment_${item.id}" class="topic">Commitment for the week</label>
                                <textarea rows="2" cols="50" type="text" id="user_week_commitment_${item.id}" class="input_txt_box"></textarea>
                            </li>
                        </ul>
                        <input type="hidden" id="next_interaction_date_${item.id}" value="${item.next_date}" />
                        <input type="file" style="display:none;" id="hiddenFileInput_${item.id}" value="${item.doc_file}" />
                        <input type="hidden" id="hiddenFileInputValue_${item.id}" value="${item.doc_file}" />
                        <button onclick="Samvaarta.setGetUserDashboard.updateTransaction(${item.id}, ${item?.session_id})" class="btn">Update</button>
                        <button style="margin-left:10px;" class="btn close-transaction">Close</button>
                        <script>
                            $('#user_focus_${item.id}').val("${item?.focus_of_the_day}");
                            $('#user_last_commitment_${item.id}').val("${item?.last_week_comments}");
                            $('#user_conversation_${item.id}').val("${item?.today_conversion}");
                            $('#user_week_commitment_${item.id}').val("${item?.feedback}");
                            $('body').on('click', '.close-transaction', ()=>{
                                $('.update-transaction-container').addClass('hide');
                            })
                        </script>
                    </div>
                </tr>`;
            })
            $('.previous-transactions').html(previous);
        } else {
            $('.previous-transactions').html('<p>No previous interactions</p>');
        }
        
    }
    const editTransaction = (docId) => {
        $('.update-transaction-container').addClass('hide');
        $('#edit-doc-'+docId).removeClass('hide');
        console.log('edit-transaction-'+docId);
    }
    const updateTransaction = (docId, sesId) => {
        var user_focus = document.getElementById("user_focus_"+docId).value;
        var last_commitment = document.getElementById("user_last_commitment_"+docId).value;
        var user_conversation = document.getElementById("user_conversation_"+docId).value;
        var week_commitment = document.getElementById("user_week_commitment_"+docId).value;
        var next_interaction_date = document.getElementById("next_interaction_date_"+docId).value;
        var fileupload = document.getElementById("hiddenFileInputValue_"+docId).value;
        var filesdata = document.getElementById("hiddenFileInput_"+docId).files[0];
        var errorElements = document.querySelectorAll(".error");
        var formattedDate = '';
        if(next_interaction_date){
            const date = new Date(next_interaction_date);
            formattedDate = date.toISOString().split('T')[0];
        }

        let formData = new FormData();
        formData.append("focus_of_the_day", user_focus);
        formData.append("today_conversion", user_conversation);
        formData.append("feedback", week_commitment);
        formData.append("next_date", next_interaction_date);
        formData.append("last_week_comments", last_commitment);
        formData.append("session_id", sesId);
        formData.append("document_conversation_id", docId);

        errorElements.forEach(function (el) {
            el.innerHTML = "";
        });

        var inputElements = document.querySelectorAll(
            "#edit-doc-"+docId+" .input_txt_box"
        );
        for (let i = 0; i < inputElements.length; i++) {
            if (
                inputElements[i].type !== "button" &&
                inputElements[i].type !== "checkbox"
            ) {
                Samvaarta.common.removeRequiredFields(inputElements[i]);
                if (valError) {
                    return false;
                }
            }
        }

        if (valError) {
            return false;
        } else {
            let paramObject = {
                url: apiUrl + "api/profile/update-documenting-conversations",
                type: "POST",
                headers: {
                    Authorization: `Bearer ${Samvaarta.globalVar.oauthToken.access_token}`,
                    Accept: "application/json",
                },
                "mimeType": "multipart/form-data",
                data: formData,
            };

            const ajaxSuccessCall = (response) => {
                if(response?.data?.success === 'true'){
                    $('.update-transaction-container').addClass('hide');
                    getDocConversation();
                } else {
                    $("#interaction_name_err")
                        .html(response?.data)
                        .show();
                }
            };

            const ajaxErrorCall = (error) => {
                if (error.response) {
                    $("#interaction_name_err")
                        .html(error.response.data.message)
                        .show();
                }
            };

            Samvaarta.common.hitAjaxApi(
                paramObject,
                ajaxSuccessCall,
                ajaxErrorCall
            );
        }
    }
    const getDocConversation = () => {
        let paramObject = {
            url: apiUrl + "api/profile/documenting-conversations",
            type: "GET",
            headers: {
                Authorization: `Bearer ${Samvaarta.globalVar.oauthToken.access_token}`,
                Accept: "application/json",
            },            
        };

        const ajaxSuccessCall = (response) => {
            if(response?.data?.success === 'true'){
                previousTransactions(response?.data);
            } else {
                $('.previous-transactions').html('<p>No previous interactions</p>');                
            }
        };

        const ajaxErrorCall = (error) => {
            if (error.response) {
                $("#interaction_name_err")
                    .html(error.response.data.message)
                    .show();
            }
        };

        Samvaarta.common.hitAjaxApi(
            paramObject,
            ajaxSuccessCall,
            ajaxErrorCall
        );
    }
    const setDesiredObjective = () => {
        var qparam1 = document.getElementById("quantitative_param_1").value;
        var qparam2 = document.getElementById("quantitative_param_2").value;
        var qparam3 = document.getElementById("quantitative_param_3").value;
        var qparam4 = document.getElementById("qualitative_param_1").value;
        var qparam5 = document.getElementById("qualitative_param_2").value;
        var qparam6 = document.getElementById("qualitative_param_3").value;
        var qdesc1 = document.getElementById("quantitative_desc_1").value;
        var qdesc2 = document.getElementById("quantitative_desc_2").value;
        var qdesc3 = document.getElementById("quantitative_desc_3").value;
        var qdesc4 = document.getElementById("qualitative_desc_1").value;
        var qdesc5 = document.getElementById("qualitative_desc_2").value;
        var qdesc6 = document.getElementById("qualitative_desc_3").value;
        var cperf1 = document.getElementById("c_performance_1").value;
        var cperf2 = document.getElementById("c_performance_2").value;
        var cperf3 = document.getElementById("c_performance_3").value;
        var interaction_name = document.getElementById("interaction_name").value;
        var pDate = document.getElementById("next_interaction_date").getAttribute('data-date');

        var errorElements = document.querySelectorAll(".error");        
        errorElements.forEach(function (el) {
            el.innerHTML = "";
        });
        var inputElements = document.querySelectorAll(
            ".user-activity-details__inner .input_txt_box"
        );
        for (let i = 0; i < inputElements.length; i++) {
            if (
                inputElements[i].type !== "button" &&
                inputElements[i].type !== "checkbox"
            ) {
                Samvaarta.common.removeRequiredFields(inputElements[i]);
                if (valError) {
                    return false;
                }
            }
        }

        if (valError) {
            return false;
        } else {
            let paramObject = {
                url: apiUrl + "api/profile/desired-objective",
                type: "POST",
                headers: {
                    Authorization: `Bearer ${Samvaarta.globalVar.oauthToken.access_token}`,
                    Accept: "application/json",
                },
                data: {
                    parameter:[qparam1, qparam2, qparam3],
                    other_parameter:[qparam4, qparam5, qparam6],
                    performance:[cperf1, cperf2, cperf3],
                    unit_measurement: [qdesc1, qdesc2, qdesc3],
                    description: [qdesc4, qdesc5, qdesc6],
                    session_id: interaction_name,
                    performance_date: pDate,
                },
            };

            const ajaxSuccessCall = (response) => {
                getDesiredObjective();
                Samvaarta.model.showSuccessMessage(
                    `<h2>Thank You</h2><p class="marg-t20">${Samvaarta.messageLog[15]}</p>`,
                    "y"
                );
            };

            const ajaxErrorCall = (error) => {
                if (error.response) {
                    $("#interaction_name_err")
                        .html(error.response.data.message)
                        .show();
                }
            };

            Samvaarta.common.hitAjaxApi(
                paramObject,
                ajaxSuccessCall,
                ajaxErrorCall
            );
        }
    }
    const getDesiredObjective = () => {
        let paramObject = {
            url: apiUrl + "api/profile/desired-objective",
            type: "GET",
            headers: {
                Authorization: `Bearer ${Samvaarta.globalVar.oauthToken.access_token}`,
                Accept: "application/json",
            },            
        };

        const ajaxSuccessCall = (response) => {
            if(response.data){
                quantitativeData(response.data.data);
                qualitativeData(response.data.odata);
            }
        };

        const ajaxErrorCall = (error) => {
            if (error.response) {
                $("#interaction_name_err")
                    .html(error.response.data.message)
                    .show();
            }
        };

        Samvaarta.common.hitAjaxApi(
            paramObject,
            ajaxSuccessCall,
            ajaxErrorCall
        );        
    }
    
    const quantitativeData = (response) => {
        let prevMonthDate = '';
        let prevAllData = '';
        let allPerformanceData = '';
        response.reverse().map((item, index) => {
            prevMonthDate += `<td>
                <input data-date="" readonly type="text" id="next_interaction_date_${index}" 
                    value="${Samvaarta.common.dayMonthNameYear(item.performance_date)}" 
                    class="input_txt_box sdate">
                </td>
            `;            
            if([0].includes(index)){
                for(let i=0;i<3;i++){
                    prevAllData += `
                    <tr id="qant_${i+1}">
                        <td>
                            <input ${item?.parameter ? 'readonly' : ''} 
                                id="quantitative_param_${i+1}" class="input_txt_box" 
                                type="text" value="${item?.parameter ? item?.parameter[i] : ''} " />
                            <p id="quantitative_param_${i+1}_err" class="error"></p>
                        </td>
                        <td>
                            <input ${item?.unit_measurement ? 'readonly' : ''} 
                            id="quantitative_desc_${i+1}" class="input_txt_box" 
                            type="text" value="${item?.unit_measurement ? item?.unit_measurement[i] : ''}" />
                            <p id="quantitative_desc_${i+1}_err" class="error"></p>
                        </td>
                        <td>
                            <table class="table-layer-2">
                                <tr>                                    
                                    <td><input id="c_performance_${i+1}" maxlength="3" class="input_txt_box" type="number" value="">
                                    <p id="c_performance_${i+1}_err" class="error"></p></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    `;
                }
            }
        })
        let quanData = `
        <tr>
            <td></td>
            <td></td>
            <td>
                <table class="table-layer-2">
                    <tr>
                        ${prevMonthDate}
                        <td>
                            <input data-date="" onchange="changeDateFormat();" placeholder="Select Date" type="text" id="next_interaction_date" value="" class="input_txt_box sdate">
                            <script>
                                $('#next_interaction_date').datepicker();
                                function changeDateFormat(){
                                    const date = new Date(document.getElementById("next_interaction_date").value);
                                    $("#next_interaction_date").attr('data-date', date.toISOString().split('T')[0]);
                                    formattedDate = date.toUTCString().split(' ');
                                    let acDate = formattedDate[1] +' '+ formattedDate[2] +' '+ formattedDate[3];
                                    $('#next_interaction_date').val(acDate);
                                }
                            </script>
                            <p id="next_interaction_date_err" class="error"></p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        ${prevAllData}
        `;
        $('.quantitative__data tbody').html(quanData);
        response.reverse().map((item, index) => {
            for(let i=0;i<3;i++){
                allPerformanceData = '';
                allPerformanceData = `<td>
                    <input readonly id="c_performance_1_${index}" 
                        class="input_txt_box" type="number" value="${item.performance[i]}">
                    </td>
                `;
                $('#qant_'+(i+1)+ ' .table-layer-2 tr').prepend(allPerformanceData);
            }
        })
    }
    const qualitativeData = (response) => {
        let qualityData = '';
        for(let i=0;i<3;i++){
            qualityData += `
            <tr>
                <td>
                    <input ${response?.parameter ? 'readonly' : ''} id="qualitative_param_${i+1}" class="input_txt_box" type="text" value="${response?.parameter ? response?.parameter[i] : ''}" />
                    <p id="qualitative_param_${i+1}_err" class="error"></p>
                </td>
                <td>
                    <textarea ${response?.description ? 'readonly' : ''} id="qualitative_desc_${i+1}" class="input_txt_box" type="text" value="" ></textarea>
                    <p id="qualitative_desc_${i+1}_err" class="error"></p>
                </td>
            </tr>
            <script>
                $('#qualitative_desc_${i+1}').val("${response?.description[i]}");
            </script>
            `;            
        }
        $('.qualitative__data tbody').html(qualityData);
    }
    const setDesiredOutcomes = () => {
        var qparam1 = document.getElementById("outcomes_param_1").value;
        var qparam2 = document.getElementById("outcomes_param_2").value;
        var qparam3 = document.getElementById("outcomes_param_3").value;
        var qparam4 = document.getElementById("outcomes_desc_1").value;
        var qparam5 = document.getElementById("outcomes_desc_2").value;
        var qparam6 = document.getElementById("outcomes_desc_3").value;

        var errorElements = document.querySelectorAll(".error");        
        errorElements.forEach(function (el) {
            el.innerHTML = "";
        });
        var inputElements = document.querySelectorAll(
            ".outcomes__data .input_txt_box"
        );
        for (let i = 0; i < inputElements.length; i++) {
            if (
                inputElements[i].type !== "button" &&
                inputElements[i].type !== "checkbox"
            ) {
                Samvaarta.common.removeRequiredFields(inputElements[i]);
                if (valError) {
                    return false;
                }
            }
        }

        if (valError) {
            return false;
        } else {
            let paramObject = {
                url: apiUrl + "api/profile/learning-outcome",
                type: "POST",
                headers: {
                    Authorization: `Bearer ${Samvaarta.globalVar.oauthToken.access_token}`,
                    Accept: "application/json",
                },
                data: {
                    parameter:[qparam1, qparam2, qparam3],
                    outcome_description: [qparam4, qparam5, qparam6],
                },
            };

            const ajaxSuccessCall = (response) => {
                getDesiredOutcomes();
                Samvaarta.model.showSuccessMessage(
                    `<h2>Thank You</h2><p class="marg-t20">${Samvaarta.messageLog[14]}</p>`,
                    "y"
                );
            };

            const ajaxErrorCall = (error) => {
                if (error.response) {
                    $("#interaction_name_err")
                        .html(error.response.data.message)
                        .show();
                }
            };

            Samvaarta.common.hitAjaxApi(
                paramObject,
                ajaxSuccessCall,
                ajaxErrorCall
            );
        }
    }
    const getDesiredOutcomes = () => {
        let paramObject = {
            url: apiUrl + "api/profile/learning-outcome",
            type: "GET",
            headers: {
                Authorization: `Bearer ${Samvaarta.globalVar.oauthToken.access_token}`,
                Accept: "application/json",
            },            
        };

        const ajaxSuccessCall = (response) => {
            desiredData(response);
        };

        const ajaxErrorCall = (error) => {
            if (error.response) {
                $("#interaction_name_err")
                    .html(error.response.data.message)
                    .show();
            }
        };
        Samvaarta.common.hitAjaxApi(
            paramObject,
            ajaxSuccessCall,
            ajaxErrorCall
        );        
    }
    const desiredData = (response) => {
        let desieredData = '', outcome_description = '', parameter = '';
        if(response.data?.data?.outcome_description){
            outcome_description = JSON.parse(response.data.data.outcome_description);
            parameter = JSON.parse(response.data.data.parameter);
            for(let i=0;i<3;i++){
                desieredData += `
                <tr>
                    <td>
                        <input readonly id="outcomes_param_${i+1}" class="input_txt_box" type="text" value="${parameter[i]}" />
                    </td>
                    <td>
                        <textarea readonly rows="2" cols="50" type="text" id="outcomes_desc_${i+1}" value="${outcome_description[i]}" class="input_txt_box"></textarea>                        
                        <script>
                            $('#outcomes_desc_${i+1}').val("${outcome_description[i]}");                            
                        </script>
                    </td>
                </tr>`;
            }
            $('.outcomes__data .form-elm-section .btn').addClass('disabled');
        } else {
            response = [1, 2, 3];
            response.map((item, index) => {
                desieredData += `
                <tr>
                    <td>
                        <input id="outcomes_param_${item}" class="input_txt_box" type="text" value="" />
                        <p id="outcomes_param_${item}_err" class="error"></p>
                    </td>
                    <td>
                        <textarea rows="2" cols="50" type="text" id="outcomes_desc_${item}" value="" class="input_txt_box"></textarea>
                        <p id="outcomes_desc_${item}_err" class="error"></p>
                    </td>
                </tr>`;
            })
        }        
        $('.outcomes__data tbody').html(desieredData);
    }
    const closure = () => {

    }
    return{
        setDocConversation: setDocConversation, 
        getDocConversation: getDocConversation,
        previousTransactions: previousTransactions,
        editTransaction: editTransaction,
        updateTransaction: updateTransaction,
        setDesiredObjective: setDesiredObjective,
        getDesiredObjective: getDesiredObjective,
        setDesiredOutcomes: setDesiredOutcomes,
        getDesiredOutcomes: getDesiredOutcomes,
        closure: closure,
    }
})();

const dashboardTab = () => {
    const elm = document.querySelector(".dashboard__elements--inner");
    Samvaarta.userDashboard.codeOfEthics();
    if (elm) {
        $("body").on("click", ".user-dashboard-info li", (event) => {
            if (!event.currentTarget.classList.contains("active")) {
                $(".user-dashboard-info li").removeClass("active");
                event.currentTarget.classList.add("active");               
            }
        });
    }
};

const photoUploadView = () => {
    var readURL = function (input) {
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

const showRoleTab = () => {
    const elm = document.querySelector(".show-role-tab");
    if (elm) {
        $("body").on("click", ".show-role-tab button", (event) => {
            if (!event.currentTarget.classList.contains("active")) {
                $(".show-role-tab button").removeClass("active");
                event.currentTarget.classList.add("active");
                Samvaarta.system.adminDashboard(event.currentTarget.dataset.type);
            }
        });
    }
}

document.addEventListener("readystatechange", (event) => {
    // When HTML/DOM elements are ready:
    if (event.target.readyState === "interactive") {
        Samvaarta.system.checkLoginStatus();
        dashboardTab();
        photoUploadView();
        if (document.querySelector("#edit-profile")) {
            Samvaarta.system.editProfile();
        }
        Samvaarta.common.getLocation();
        if($('.user-details-page').length){            
            Samvaarta.system.adminDashboard('users');
        }
        if($('.trainer-details-page').length){
            Samvaarta.system.adminDashboard('trainer');
        }
    }

    if (event.target.readyState === "complete") {
        unvielImg();   
        if(!Samvaarta.common.getLocalStorage('sessionList')){                    
            Samvaarta.userDashboard.getSessionList(userType === 'admin' ? "api/admin/sessions" : "api/profile/session-listing");
        } else {
            Samvaarta.userDashboard.displaySessionList(Samvaarta.common.getLocalStorage('sessionList'));
        }        
    }
});

// const people = [
//     {name:'john', hobbies:['cricket', 'javascript']},
//     {name:'ajay', hobbies:'singing'},
//     {name:'akhil', hobbies:['running', 'food']}
// ]
// const hobby = people.flatMap((p) => p.hobbies);
// console.log(hobby);
