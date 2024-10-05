@include('layouts.top_application')
@include('layouts.header')
@include('layouts.nav')

<section class="sitemap container dashboard__elements--inner">
    <div class="rev-main-heading">
        <h2>Upcoming Events</h2>        
    </div>
    <div class="upcoming-events">
        <table>
            <tr class="user-dashboard-info__head-list">
                <td>S.No.</td>
                <td>NAME OF PROGRAM</td>
                <td>DATE</td>
                <td>DURATION</td>
                <td>FACILITATOR</td>                
            </tr>
            <tr>
                <td>1</td>
                <td>Design Thinking Practitioner Certification</td>
                <td>14/15 - Dec</td>
                <td>2 Days</td>
                <td>Deepak Kumar</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Masterful Communication</td>
                <td>28/29 - Dec</td>
                <td>2 Days</td>
                <td>Deepak Kumar</td>
            </tr>
            <tr>
                <td>3</td>
                <td>Dealing with Conflicts</td>
                <td>1 - Dec</td>
                <td>1 Days</td>
                <td>Deepak Kumar</td>
            </tr>
        </table>
    </div>
</section>

@include('layouts.footer')
@include('layouts.bottom')