@extends('app')
@section('content')
<div class="dashboard__elements">
    <div class="container dashboard__elements--inner form-container-pop">
        <div id="reset-pwd" class="password-change">
            <div class="showloader"></div>
            <h2 class="align-center">Change Password</h2>
            <div class="row marg-t20">
                <div class="col-md-12">
                    <form method="post" id="targetform">
                        <div class="form-elm-section input_sec "> <i class="lg_sprite oauth-eye-slash show-pwd" aria-hidden="true" data-testid="show-password"> </i> <label for="oauth_curr_password"> Current Password </label> <input required="" data-id="" placeholder="" name="" type="password" id="oauth_curr_password" class="input_txt_box " value="">
                            <p id="oauth_curr_password_err" class="error validation"></p>
                        </div>
                        <div class="form-elm-section input_sec "><i class="lg_sprite oauth-eye-slash show-pwd" aria-hidden="true" data-testid="show-password"></i> <label for="oauth_new_password1"> New Password </label><input required="" data-id="" placeholder="" name="" type="password" id="oauth_new_password1" class="input_txt_box " value="">
                            <p id="oauth_new_password1_err" class="error validation"></p>
                        </div>
                        <div class="form-elm-section input_sec "><i class="lg_sprite oauth-eye-slash show-pwd" aria-hidden="true" data-testid="show-password"></i> <label for="oauth_new_password2"> Confirm New Password </label><input required="" data-id="" placeholder="" name="" type="password" id="oauth_new_password2" class="input_txt_box " value="">
                            <p id="oauth_new_password2_err" class="error validation"></p>
                        </div>
                        <p class="error" id="main_password_err"></p>
                        <div class="form-elm-section marg-t20">
                            <input type="button" onclick="Samvaarta.system.passwordUpdated(1);" class="btn submit-button2" name="submit_new_password" value="Continue"></div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection