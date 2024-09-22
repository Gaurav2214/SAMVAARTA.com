@extends('app')
@section('content')

<div class="dashboard__elements">
    <div class="container dashboard__elements--inner">
        <div class="show-user-details">
            <div class="skeleton-container">
                <ul class="skeleton-container__list">
                    <li>
                        <div class="skeleton large">
                            <div class="skeleton__left">
                                <div class="line w40"></div>
                                <div class="line h18"></div>
                                <div class="line h12"></div>
                                <div class="line h12"></div>
                                <div class="line-space"></div>
                                <div class="line w40"></div>
                            </div>
                            <div class="skeleton__right">
                                <div class="square circle"></div>
                                <div class="square circle"></div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="skeleton large">
                            <div class="skeleton__left">
                                <div class="line w40"></div>
                                <div class="line h18"></div>
                                <div class="line h12"></div>
                                <div class="line h12"></div>
                                <div class="line-space"></div>
                                <div class="line w40"></div>
                            </div>
                            <div class="skeleton__right">
                                <div class="square circle"></div>
                                <div class="square circle"></div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="user-dashboard-info component-divider">
            <div class="show-role-tab hide">
                <button data-type="users" class="active">User</button>
                <button data-type="trainer">Trainer</button>
                <button data-type="admin">Admin</button>                
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