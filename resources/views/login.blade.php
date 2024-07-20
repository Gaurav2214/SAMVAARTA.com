<section class="login-module">
    <div class="login-module__inner container">
        <div class="login-module__main">
            <div class="login-module__main--left">
                <div class="upload-photo">
                    <img />
                    <input type="file" id="upload" accept="image/*" class="file-upload" value="Upload Photo">
                    <span>Add a photo</span>
                </div>
                <div class="desc">
                    <h2>Welcome User</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                </div>
            </div>
            <div class="login-module__main--right">
                <div class="login-form">
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
                            <input required="" data-id="" placeholder="" name="" type="password" id="oauth_log_number" class="input_txt_box" value="">
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
                                    <option value="teacher">Trainer</option>
                                    <option value="user">User</option>
                                </select>
                                <p id="oauth_log_role_err" class="validation error"></p>
                            </div>
                        </div>
                        <div class="form-elm-section input_sec_center ">
                            <button class="btn" type="button" onclick="Samvaarta.system.userRegistration()">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>