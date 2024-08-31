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
};

var valError = true;
var apiUrl = "http://127.0.0.1:8000/";
var expireTime = 2 / (24 * 60);

Samvaarta.globalVar = Samvaarta.globalVar || {
    errorValueInFlow: "",
    is_Loggedin: 0,
    oauthToken: "",
    currlocation: "",
};

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
                        <label for="b2boauth_email">
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
            <li class="active">
                <div class="dashboard__elements--item">
                    <h2>
                        <img alt="" src="/images/conversation.png" width="25" height="25" />
                        Conversational details
                    </h2>
                </div>
                <div class="details">
                    <h3>Conversational Details</h3>
                    <p>You are documenting the interaction of the day and uploading documents to support your effort</p>
                    <div id="" class="details--items previous">
                        <h3>Previous Interactions</h3>
                    </div>
                    <div id="" class="details--items current">
                        <h3>Current Interactions</h3>
                    </div>
                    <div class="form-elm-section marg-t10">
                        <button class="btn">Submit</button>
                    </div>
                </div>
            </li>
            <li>
                <div class="dashboard__elements--item">
                    <h2>
                        <img alt="" src="/images/objective.png" width="25" height="25" />
                        Learning Objective
                    </h2>
                </div>

                <div class="details">
                    <h3>Learning Objective</h3>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                    <div class="form-elm-section marg-t10">
                        <button class="btn">Submit</button>
                    </div>
                </div>
            </li>
            <li>
                <div class="dashboard__elements--item">
                    <h2>
                        <img alt="" src="/images/outcomes.png" width="25" height="25" />
                        Learning Outcomes
                    </h2>
                </div>
                <div class="details">
                    <h3>Learning Outcomes</h3>
                    <p>Please express yourself as how you plan to see yourself at the end of the interaction period in terms of how you will be experiencing</p>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                    <div class="form-elm-section marg-t10">
                        <button class="btn">Submit</button>
                    </div>
                </div>
            </li>
            <li>
                <div class="dashboard__elements--item">
                    <h2>
                        <img alt="" src="/images/comments.png" width="25" height="25" />
                        Managers Comment
                    </h2>
                </div>
                <div class="details">
                    <h3>Managers Comment</h3>
                    <p>The coach will share his perspective on the progress made based on the interactions</p>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                    <div class="form-elm-section marg-t10">
                        <button class="btn">Submit</button>
                    </div>
                </div>
            </li>
            <li>
                <div class="dashboard__elements--item">
                    <h2>
                        <img alt="" src="/images/upload.png" width="25" height="25" />
                        Uploading Documents
                    </h2>
                </div>
                <div class="details">
                    <h3>Upload Documents</h3>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                    <div class="form-elm-section marg-t10">
                        <button class="btn">Submit</button>
                    </div>
                </div>
            </li>
            <li>
                <div class="dashboard__elements--item">
                    <h2>
                        <img alt="" src="/images/ethics.png" width="25" height="25" />
                        Code of ethics
                    </h2>
                </div>
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
                            <li>The coach maintain the confidentiality of the interaction……</li>
                        </ul>
                    </div>
                    <div class="form-elm-section marg-t10">
                        <button onclick="Samvaarta.userDashboard.codeOfEthics()" class="btn">Submit</button>
                    </div>
                </div>
            </li>
        </ul>
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
                trainerList += `<select>
                    <option value="select">Assigned User List</option>
                `;
                item.users?.map((titem) => {
                    trainerList += `<option userId="${item.id}" value="${titem.id}">${titem.name}</option>`;
                })
                trainerList += `</select>`;
                } else {
                    trainerList = 'No User';
                }
            }
            if(item.status === 1){
                statusInfo = `<span class="approved">Approved</span> <span onclick="Samvaarta.system.activateDeactivateUser(${item.id}, '0')">Undo</span>`;
            } else if(item.status === 2){
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
        }
    };

    const showUserInfo = (response) => {
        var coachInfo = '', cochees = '', trainer = '', plannedSess = '', 
        concluded = '', nextSession = '', completeSessCount = '', userExp = '', userFun = '';
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
            coachInfo = `<li>Coach Name: <span>${response.coach ? response.coach : ''}</span></li>`;
            plannedSess = `<li>Planned Sessions: <span>${response.plannedSession ? response.plannedSession : ''}</span></li>`;
            concluded = `<li>Concluded: <span></span></li>`;
            nextSession = `<li>Next Session Date: <span></span></li>`;
            userExp = `<li>Experience: <span>${response.experience}</span></li>`;
            userFun = `<li>Function: <span>${response.user_function}</span></li>`;

        }
        const userInfo = `
        <h3 class="userName">Welcome ${response.name.split(" ")[0]} </h3>
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
                </ul>
            </div>
        </div>
        `;
        $(".show-user-details").html(userInfo);
    };

    var displayUserInfo = (data) => {
        let userDetails = data.data.data?.name ? data.data.data : data.data;
        if (data) {
            showUserInfo(userDetails);
            Samvaarta.globalVar.oauthToken =
                Samvaarta.common.getLocalStorage("AccessToken");
            Samvaarta.globalVar.is_loggedin = 1;
            let username = userDetails.name.split(" ")[0];
            let userType = userDetails.user_type;
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

            $(".dashboard__header--loggedin-user").html(userData);
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
            response = response.data.data;
            Samvaarta.common.deleteLocalStorage('users_data');
            Samvaarta.common.deleteLocalStorage('trainer_data');
            adminDashboard('users');
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
})();

Samvaarta.userDashboard = (() => {
    const codeOfEthics = () => {
        let ethicsdata = $('.codeofethics ul').text();
        let paramObject = {
            url: apiUrl + "api/profile/code-of-ethics",
            type: "POST",
            data: { 'comments': ethicsdata },
            headers: {
                Authorization: `Bearer ${Samvaarta.globalVar.oauthToken.access_token}`,
                Accept: "application/json",
            },
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
    const getCodeOfEthics = () => {
        let paramObject = {
            url: apiUrl + "api/profile/code-of-ethics",
            type: "GET",
            headers: {
                Authorization: `Bearer ${Samvaarta.globalVar.oauthToken.access_token}`,
                Accept: "application/json",
            },
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
    return {
        codeOfEthics: codeOfEthics,
        getCodeOfEthics: getCodeOfEthics
    }
})();

const dashboardTab = () => {
    const elm = document.querySelector(".dashboard__elements--inner");
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
    }

    if (event.target.readyState === "complete") {
        unvielImg();
    }
});
