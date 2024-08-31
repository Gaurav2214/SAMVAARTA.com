@extends('app')
@section('content')

<div class="dashboard__elements">
    <div class="container dashboard__elements--inner">
        <div class="show-user-details">
            <h3 class="userName">Welcome </h3>
            <div class="show-user-details__inner">
                <div class="show-user-details__inner--left detail-items">
                    <ul>
                        <li>Code: </li>
                        <li>Date of Joining: </li>
                        <li>Experience: </li>
                        <li>Function: </li>
                        <li>Role: </li>
                        <li>Location: </li>
                    </ul>
                </div>

                <div class="show-user-details__inner--mid detail-items">
                    <ul>
                        <li>Vision: </li>
                        <li>Brief Description: </li>
                        <li>No of Coachees: </li>
                        <li>No of Coaches: </li>
                    </ul>
                </div>

                <div class="show-user-details__inner--right detail-items">
                    <ul>
                        <li>
                            <div class="skeleton no-shadow">
                                <div class="skeleton__right">
                                    <div class="square"></div>
                                </div>
                            </div>
                        </li>
                        <li>LinkedIn: </li>
                        <li>Email Id: </li>
                        <li>Mobile No: </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="user-dashboard-info component-divider">
            <div class="show-role-tab hide">
                <button data-type="users" class="active">User</button>
                <button data-type="trainer">Trainer</button>
                <button data-type="admin">Admin</button>
                <button data-type="upcoming-session">Upcoming Session</button>
            </div>
            <div id="" class="user-data-list">
                <table>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
@endsection