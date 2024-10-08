
@extends('app')
@section('content')

<section class="login-module">
    <div class="login-module__inner container">
        <div class="login-module__main">
            <div class="login-module__main--left photo-upload-container desktop-view">
                <div class="circle">
                    <img width="128" height="128" class="profile-pic" src="/images/default-face.jpg" />
                    <div class="p-image">
                        <i class="fa fa-camera upload-button"></i>
                        <input class="file-upload" type="file" accept="image/*" />
                    </div>
                </div>

                <div class="desc">
                    <h2>Welcome User</h2>
                    <p>The greatest enemy of knowledge is not ignorance; it is the illusion of knowledge</p>
                </div>
            </div>
            <div class="login-module__main--right">
            </div>
        </div>
    </div>
</section>
@endsection