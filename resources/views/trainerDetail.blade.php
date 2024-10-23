@include('layouts.top_application')
@include('layouts.header')

<div class="container dashboard__elements--inner deep-trainer-route">
    <div class="display-user-details">        
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
            </ul>
        </div>        
    </div>
    <div class="user-dashboard-info component-divider">
        <div class="user-data-list"></div>
    </div>
</div>


@include('layouts.footer')
@include('layouts.bottom')