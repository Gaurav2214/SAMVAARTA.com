@extends('app')
@section('content')

<div class="dashboard__elements">
    <div class="container dashboard__elements--inner">
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
                    <textarea name="" id="" cols="30" rows="10"></textarea>
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
                <div class="details">
                    <h3>Code of ethics</h3>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                    <div class="form-elm-section marg-t10">
                        <button class="btn">Submit</button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>
@endsection