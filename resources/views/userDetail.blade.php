@include('layouts.top_application')
@include('layouts.header')

<div class="container dashboard__elements--inner deep-user-route">
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
        <ul>
            <li class="active" onclick="Samvaarta.userDashboard.codeOfEthics()">
                <div class="dashboard__elements--item">
                    <h2>
                        <img alt="" src="/images/ethics.png" width="25" height="25">
                        Code of ethics
                    </h2>
                </div>                
            </li> 
            <li id="" onclick="Samvaarta.deepDisplayUser.displayDocument();">
                <div class="dashboard__elements--item">
                    <h2>
                        <img alt="" src="/images/conversation.png" width="25" height="25">
                        Documenting Conversations
                    </h2>
                </div>
            </li>           
            <li onclick="Samvaarta.deepDisplayUser.displayObjective();">
                <div class="dashboard__elements--item">
                    <h2>
                        <img alt="" src="/images/objective.png" width="25" height="25">
                        Desired Objective
                    </h2>
                </div>                
            </li>
            <li onclick="Samvaarta.deepDisplayUser.displayOutcomes();">
                <div class="dashboard__elements--item">
                    <h2>
                        <img alt="" src="/images/outcomes.png" width="25" height="25">
                        Desired Outcomes
                    </h2>
                </div>                
            </li>
            
            <li onclick="Samvaarta.deepDisplayUser.displayClosure();">
                <div class="dashboard__elements--item">
                    <h2>
                        <img alt="" src="/images/closure.png" width="25" height="25">
                        Closing of Interaction
                    </h2>
                </div>                
            </li>            
            
        </ul>
        <div class="user-activity-details">
            <div class="user-activity-details__inner"></div>
        </div>
    </div>
</div>


@include('layouts.footer')
@include('layouts.bottom')