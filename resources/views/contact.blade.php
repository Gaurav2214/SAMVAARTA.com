@include('layouts.top_application')
@include('layouts.header')
@include('layouts.nav')

<section class="contact-us container">
    <div class="rev-main-heading">
        <h2>Contact Us</h2>        
    </div>
    <div class="contact-form">
        <div class="form-elm-section input_sec ">
            <label for="oauth_log_name">
                Name
            </label>
            <input required="" data-id="" placeholder="" name="" type="text" id="oauth_log_name" class="input_txt_box valid" value="" />
            <p id="oauth_log_name_err" class="error"></p>
        </div>
        <div class="form-elm-section input_sec ">
            <label for="oauth_log_email">
                Email ID
            </label>
            <input required="" data-id="" placeholder="" name="" type="text" id="oauth_log_email" class="input_txt_box valid" value="" >
            <p id="oauth_log_email_err" class="error"></p>
        </div>
        <div class="form-elm-section input_sec ">
            <label for="oauth_log_number">
                Phone No
            </label>
            <input required="" data-id="" placeholder="" name="" type="number" id="oauth_log_number" class="input_txt_box valid" value="" >
            <p id="oauth_log_number_err" class="error"></p>
        </div>
        <div class="form-elm-section input_sec ">
            <label for="oauth_log_msg">
                What would you like to share?
            </label>
            <input required="" data-id="" placeholder="" name="" type="text" id="oauth_log_msg" class="input_txt_box valid" value="" >
            <p id="oauth_log_msg_err" class="error"></p>
        </div>
        <div class="form-elm-section marg-t10">
            <input type="button" class="btn submit-button2" name="submit_profile" onclick="Samvaarta.system.userInfoDetail();" value="Submit">
        </div>
    </div>
    <div class="cinfo component-divider">
        <strong>Shweta Dayal - Founder </strong><br>
        Email Id: <a href="mailto:shweta@goalsnu.com">shweta@goalsnu.com</a><br />
        Contact No: +91-8511044072<br />
        Whatsapp: +91-8511044072<br />        
    </div>
</section>

@include('layouts.footer')
@include('layouts.bottom')
