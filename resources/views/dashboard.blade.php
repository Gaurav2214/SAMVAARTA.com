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
                    <p>You are documenting the interaction of the day and uploading documents to support your effort</p>
                    <div id="" class="details--items previous">
                        <h3>Previous Interactions</h3>
                    </div>
                    <div id="" class="details--items current">
                        <h3>Current Interactions</h3>
                    </div>
                    <!-- <textarea name="" id="" cols="30" rows="10"></textarea> -->
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
                <div class="details">
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
                            <li>The coach will be 100% invested  in you during the interaction</li>
                            <li>The coach’s  role will be to ask you question to help you explore</li>
                            <li>The coach maintain the confidentiality of the interaction……</li>
                        </ul>
                    </div>
                    <div class="form-elm-section marg-t10">
                        <button class="btn">Submit</button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>
@endsection