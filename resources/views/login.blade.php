<!-- <header class="login-header">
    <div class="container">
        <a href="/">
            <img width="103" height="60" src="/images/goalnu-logo.png" alt="" />
        </a>
    </div>
</header> -->
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
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                </div>
            </div>
            <div class="login-module__main--right">
            </div>
        </div>
    </div>
</section>
@endsection