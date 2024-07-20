Samvaarta.messageLog = {
    1: "Please provide your email ID",
    2: "Please provide a valid email ID",
    3: "Please provide your name",
    4: "Name must not contain any special symbols/numbers",
    5: "Please enter your password",
    6: "Password length must be 6-20",
    7: "You have already registered with Us, Please signin",
};

valError = true;

Samvaarta.globalVar = Samvaarta.globalVar || {
    errorValueInFlow: "",
    is_Loggedin: 0,
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
        }
        return error;
    };

    const validatePhone = (value, key) => {
		var phonePattern = /^\d{10}$/;
		if (!phonePattern.test(value)) {
			return 'Please enter a valid 10-digit phone number.';
		}
		return '';
	}

    const validatePassword = (password, key) => {
        var error = "";
        password = password.replace(/ /g, "");
        switch (key) {
            case "oauth_log_password":
                if (password == "") {
                    error = Samvaarta.messageLog[5];
                } else if (password.length < 7) {
                    error = Samvaarta.messageLog[6];
                } else if (password.length > 20) {
                    error = Samvaarta.messageLog[6];
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

    const removeRequiredFields = function (e) {
        var id, value;

        // Check the type of event and get the id and value accordingly
        if (e.type !== "blur") {
            id = e.id;
            value = document.getElementById(id)?.value;
        } else {
            id = e.target.id;
            value = document.getElementById(id)?.value;
        }

        // If there is a value, encode it and handle errors
        if (value) {
            value = encodeHTML(value);
            document.getElementById(id + "_err").innerHTML = "";
            document.getElementById(id + "_err").style.display = "none";
            var inputElement = document.getElementById(id).closest("input");
            if (inputElement) {
                inputElement.classList.remove("error");
            }
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
                        document.getElementById(key).classList.add("error");
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
    const open_pop = (custom_function, add_class, head) => {
        var modelBoxes = document.querySelectorAll(".model-box");
        var model_id = modelBoxes.length === 0 ? 1 : modelBoxes.length + 1;

        var obj_id = "model_" + head;
        var xtra_cls = " ";
        if (add_class) {
            xtra_cls += add_class;
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
            '<div class="model-wrapper"><div class="model-content clearfix" id="model_content_' +
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

        custom_function(head);

        var wrapperDiv = document.createElement("div");
        wrapperDiv.className = "model-box";
        wrapperDiv.id = "wrapper_" + model_id;
        popupElement.parentNode.insertBefore(wrapperDiv, popupElement);
        wrapperDiv.appendChild(popupElement);

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

    return {
        open_pop: open_pop,
        close_pop: close_pop,
    };
})();

Samvaarta.system = (() => {
    var loginUser = () => {
        let reg_email = $("#b2boauth_log_email").val();
        let reg_pwd = $("#b2boauth_log_pswd").val();
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
            var paramObject = {
                url: apiUrl + "auth/login",
                type: "POST",
                data: {
                    email: reg_email,
                    password: reg_pwd,
                },
            };
            var ajaxSuccessCall = (response) => {
                var response = response.data;
                displayUserInfo(response);
                Samvaarta.common.setLocalStorage("oauthUserData", response, 1);
                window.loginCallback ? loginCallback(response) : false;
                Samvaarta.globalVar.is_loggedin = 1;
                window.location.href = "dashboard.html";
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

    var userRegistration = function() {
    var reg_name = document.getElementById('oauth_log_name').value;
    var reg_email = document.getElementById('oauth_log_email').value;
    var reg_pwd = document.getElementById('oauth_log_password').value;
    var reg_phone = document.getElementById('oauth_log_number').value;
    var reg_linkedin = document.getElementById('oauth_log_lnurl').value;
    var reg_role = document.getElementById('oauth_log_role').value;
    var errorElements = document.querySelectorAll('.error');
    errorElements.forEach(function(el) {
        el.innerHTML = '';
    });

    var inputElements = document.querySelectorAll('.authentication-form input');
    inputElements.forEach(function(input) {
        if (input.type !== 'button' && input.type !== 'checkbox') {
            Samvaarta.common.removeRequiredFields(input);
            if (valError) {
                return false;
            }
        }
    });

    if (valError) {
        return false;
    } else {
        var paramObject = {
            url: apiUrl + 'auth/register',
            type: 'POST',
            data: {
                email: reg_email,
                name: reg_name,
                password: reg_pwd,
				phone: reg_phone,
				linkedin: reg_linkedin,
				role: reg_role,
            }
        };

        var ajaxSuccessCall = function(response) {
            document.querySelector('.showloader').style.display = 'none';
            document.getElementById('login-form').style.display = 'block';
            document.getElementById('registration-form').style.display = 'none';
            var mainInfoElements = document.querySelectorAll('.main_info');
            mainInfoElements.forEach(function(el) {
                el.remove();
            });
            var prependElement = document.querySelector('.p-xl-5.p-3');
            var infoDiv = document.createElement('div');
            infoDiv.className = 'info_bg oauth-log-info';
            infoDiv.innerHTML = 'We have sent you a verification email at <span class="bold">' + reg_email + '</span>. Please verify your email.';
            prependElement.insertBefore(infoDiv, prependElement.firstChild);
            setTimeout(function() {
                infoDiv.style.display = 'none';
            }, 8000);
            Samvaarta.common.setLocalStorage('oauthUserData', response.data, 1);
            sendVerificationMail(response);
        };

        var ajaxErrorCall = function(response) {
            document.querySelector('.showloader').style.display = 'none';
            if (response.response) {
                if (response.response.data.message === 'Email already taken') {
                    document.getElementById('reg_main_err').innerHTML = Samvaarta.messageLog[7];
                } else {
                    document.getElementById('reg_main_err').innerHTML = response.response.data.message;
                }
            }
        };

        Samvaarta.common.hitAjaxApi(paramObject, ajaxSuccessCall, ajaxErrorCall);
    }
};


    var checkLoginStatus = () => {
        var userData = Samvaarta.common.getLocalStorage("oauthUserData");
        displayUserInfo(userData);
    };

    var displayUserInfo = (data) => {
        if (data) {
            let username = data.user.name;
            $(".loggedin-user").removeClass("hide");
            $(".init-login").addClass("hide");
            let userData = `
				<div class="d-flex align-items-center">
					<div class="flex-shrink-0">
					<img src="assets/images/avatars/img-8.jpg" class="avatar avatar-xs rounded-circle me-2" alt="" />
					</div>
					<div class="flex-grow-1 ms-1 lh-base">
					<span class="fw-semibold fs-13 d-block line-height-normal">${username}</span>
					</div>
				</div>
				
				<div class="header-user-nav">
					<div class="hvr_bx">
						<ul>
							<li>
								<a onclick="Samvaarta.system.editProfile()" tabindex="0" role="button" href="javascript:void(0);">
									<i class="fa fa-pencil"></i>Account
								</a>
							</li>							
							<li class="change-password">
								<a href="javascript:void(0);" tabindex="0" role="button" onclick="Samvaarta.system.changePassword()">
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
            $(".navbar-nav .dropdown-toggle").html(userData);
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
    };
})();
