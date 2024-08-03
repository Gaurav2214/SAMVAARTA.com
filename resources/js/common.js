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
    10: 'Please enter a new password',
    11: 'Password has been changed successfully.',
};

var valError = true;
var apiUrl = "http://127.0.0.1:8000/";

Samvaarta.globalVar = Samvaarta.globalVar || {
    errorValueInFlow: "",
    is_Loggedin: 0,
    oauthToken:'',
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
                var newpass = document.getElementById("oauth_new_password1").value;
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
            oauth_new_password2: validatePassword
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
            <p class="reg-login-toggle">Already have the Samvaarta account?
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
            <p class="reg-login-toggle">Don't have the Samvaarta account?
                <a role="button" tabindex="0" rel="noreferrer nofollow" class="signup-link">Create one</a>
            </p>
        </div>
        `;
        document.querySelector(".login-module__main--right").innerHTML =
            loginForm;
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
                    current_password: paswrd,
                    password: new_paswrd,
                    password_confirmation: cnfm_paswrd,
                    action: "password",
                },
                headers: { Authorization: `Bearer ${Samvaarta.globalVar.oauthToken.access_token}`,"Accept":'application/json' },
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
    const editProfile = () => {};
    const logout = () => {
        Samvaarta.common.deleteLocalStorage("oauthUserData");
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
                Samvaarta.common.setLocalStorage('AccessToken', response.data, 1);
                getUserData(response.data);
            };

            var ajaxErrorCall = (response) => {
                $(".showloader").hide();
                if (response.response) {
                    $("#b2boauth_log_main_err").html(
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
                data: {
                    email: reg_email,
                    name: reg_name,
                    password: reg_pwd,
                    phone: reg_phone,
                    linkedin: reg_linkedin,
                    user_type: reg_role,
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

    var displayUserInfo = (data) => {
        if (data) {
            Samvaarta.globalVar.oauthToken = Samvaarta.common.getLocalStorage('AccessToken');
            Samvaarta.globalVar.is_loggedin = 1;
            let username = data.data.name;
            document.querySelector(
                ".dashboard__header--welcome span"
            ).innerHTML = username;
            let userData = `
				<div class="d-flex align-items-center">
					<div class="flex-shrink-0">
					<img width="20" height="20" src="/images/user-default.svg" class="avatar" alt="" />
					</div>					
				</div>
				
				<div class="header-user-nav">
					<div class="hvr_bx">
						<ul>
							<li>
								<a onclick="/myaccount" tabindex="0" role="button" href="javascript:void(0);">
									<i class="fa fa-pencil"></i>Account
								</a>
							</li>							
							<li class="change-password">
								<a href="javascript:void(0);" tabindex="0" role="button" onclick="/change-password">
									<i class="fa fa-key"></i>Change Password
								</a>
							</li>
							<li>
								<a href="javascript:void(0);" tabindex="0" role="button" onclick="Samvaarta.system.logout()">
									<i class="fa fa-power-off"></i>Logout
								</a>
							</li>
						</ul>
					</div>
				</div>
			`;
            $(".dashboard__header--loggedin-user").html(userData);
            //$('.main-header__inner--logo').css('width','585px');
            if ($(".account-setting").length) {
                $("#user_name").val(username);
                $("#user_email").val(data.user.email);
                $("#display_name").val(username);
                $(".prettyprint").html(data.user.api_key);
            }
            if ($(".dashboard-setting").length) {
                $(".page-title h3 span").html(username);
            }
        }
    };

    var forgetPassword = () => {
        let reg_email = $("#b2boauth_log_email").val();
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
                    $("#b2boauth_log_email_err")
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
    };
})();

const dashboardTab = () => {
    const elm = document.querySelector('.dashboard__elements--inner');
    if(elm){
        $('body').on('click', '.dashboard__elements--inner li', (event) => {
            if(!event.currentTarget.classList.contains('active')){
                $('.dashboard__elements--inner li').removeClass('active');
                event.currentTarget.classList.add('active');                
            } 
        })
    }
}

document.addEventListener("readystatechange", (event) => {
    // When HTML/DOM elements are ready:
    if (event.target.readyState === "interactive") {
        Samvaarta.system.checkLoginStatus();
        dashboardTab();
    }

    if (event.target.readyState === "complete") {
    }
});
