
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>GOALSNU | Skip The Thinking Start To Grow</title>
    <meta itemprop="name" content="GOALSNU | Skip The Thinking Start To Grow" />
    <link rel="shortcut icon" type="image/x-icon" href="/public/images/favicon.ico">
</head>

<body>
    <style>
        .top-section {
            margin-top: 40px;
        }

        .top-section .logo {
            text-align: center;
        }

        .user-container {
            margin-top: 30px;
            display: flex;
            padding: 0 25px;
        }

        .user-container ul {
            padding-left: 0;
        }

        .user-container li {
            font-size: 14px;
            line-height: 24px;
            font-family: "Open Sans", sans-serif;
            font-weight: 500;
            color: #262626;
            list-style-type: none;
        }

        .user-info-left {
            width: 70%;
        }

        .doc-conversion {
            padding: 0 25px;
        }

        table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
            margin-top: 20px;
        }

        td,
        th {
            font-size: 14px;
            line-height: 21px;
            font-family: "Open Sans", sans-serif;
            font-weight: 500;
            color: #262626;
            padding: 8px;
            position: relative;
            width: 30%;
            text-align: left;
        }

        thead tr {
            box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            background: linear-gradient(180deg, #eff5ff 0%, rgba(239, 245, 255, 0) 100%);
            border: none;
        }

        .component-divider {
            -o-border-image: linear-gradient(90deg, #fff, #ccc, #fff);
            border-image: linear-gradient(90deg, #fff, #ccc, #fff);
            border-image-slice: 1;
            border-top: 1px solid #ccc;
            padding-top: 22px;
            margin-top: 22px;
        }

        h2 {
            font-size: 24px;
            line-height: 32px;
            font-family: "Open Sans", sans-serif;
            font-weight: 700;
            color: #191b1f;
            text-transform: capitalize;
            margin: 0;
        }
        .complex-view table td,.complex-view table th {
            width: 30%;
        }
        .conversation-detail{
            margin-top: 25px;
        }
    </style>
    <section class="top-section">
        <div class="logo">
            <img width="103" height="60" src="https://goalsnu.com/images/goalnu-logo.png" alt="">
        </div>
        <div class="user-container">
            <div class="user-info-left">
                <ul>
                    <li>Name: {!!$user['name']!!}</li>
                    <li>Email Id: {!!$user['email']!!}</li>
                    <li>Mobile No: {!!$user['phone']!!}</li>                    
                </ul>
            </div>
            <div class="user-info-right">
                <ul>
                    <li>Coach: {!!@$user['trainer']['name']!!}</li>
                    <li>Date: {!!$user['date_of_joining']!!}</li>
                </ul>
            </div>
        </div>
        <?php
        if(!empty($DocumentConversations)){
            ?>
        <div class="doc-conversion component-divider">
            <h2>Documenting Conversations</h2>
            <?php
            foreach($DocumentConversations as $val){
                ?>
            <div class="conversation-detail"><h3><?php echo $val['session']['topic']?></h3>
                <ul>
                    <li>
                        <p class="topic">Focus of the day</p>
                        <p class="desc"><?php echo $val['focus_of_the_day']?></p>
                    </li>
                    <li>
                        <p class="topic">Status of last week's commitment</p>
                        <p class="desc"><?php echo $val['last_week_comments']?></p>
                    </li>
                    <li>
                        <p class="topic">Today’s conversation</p>
                        <p class="desc"><?php echo $val['today_conversion']?></p>
                    </li>
                    <li>
                        <p class="topic">Commitment for the week</p>
                        <p class="desc"><?php echo $val['feedback']?></p>
                    </li>
                    <li>
                        <p class="topic">Supporting Doc</p>
                        <p class="desc"><a href="<?php echo $val['doc_file']?>"><?php echo $val['doc_file']?></a></p>
                    </li>
                </ul>
                </div>    
                <?php } ?>
        </div>
        <?php  
        }
        if(!empty($PerformanceData)){
            ?>
       
        <div class="doc-conversion component-divider">
            <h2>Desired Objective</h2>
            <h4>Quantitative Parameters</h4>
            <div class="quantitative__data">
                <table class="complex-view">
                    <thead>
                        <tr class="user-dashboard-info__head-list">
                            <td>Parameter</td>
                            <td>Unit of Measurement</td>
                            <td>Performance</td>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        foreach($PerformanceData as $val){
                            $unit_measurement=json_decode($val['unit_measurement'],true);
				            $performance=json_decode($val['performance'],true);
				            $parameter=json_decode($val['parameter'],true);
                            ?>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>
                                <table class="table-layer-2">
                                    <tbody>
                                        <tr>
                                            <td>
                                              <?php echo $val['performance_date']?>
                                            </td>                                            
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <?php
                            foreach($unit_measurement as $k=>$v){
                                ?>
                        <tr id="qant_1">
                            <td>
                            <?php echo $parameter[$k] ?>
                            </td>
                            <td>
                                <?php echo $v ?>
                            </td>
                            <td>
                                <table class="table-layer-2">
                                    <tbody>
                                        <tr>
                                            <td><?php echo $performance[$k] ?>%</td>                                            
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <?php }  } ?>
                    </tbody>
                </table>
            </div>
            <?php } 
            if(!empty($PerformanceDataOthers)){
				
				$PerformanceDataOthers_parameter=json_decode($PerformanceDataOthers['parameter'],true);
				$PerformanceDataOthers_description=json_decode($PerformanceDataOthers['description'],true);

			
            ?>
            <h4 style="margin:20px 0;">Qualitative Parameters</h4>
            <table>
                <thead>
                    <tr>
                        <th>Parameter</th>
                        <th>Brief Description</th>
                    </tr>
                </thead>
                <tbody>
                    <?php 
                    foreach($PerformanceDataOthers_parameter as $k=>$v){
                        ?>
                    <tr>
                        <td>{!!$v!!}</td>
                        <td>{!!$PerformanceDataOthers_description[$k]!!}</td>
                    </tr>
                    <?php } ?>
                </tbody>
            </table>
            <?php } ?>
        </div>
        <?php
        if(!empty($LearningOutcomes)){

				$LearningOutcomes_parameter=json_decode($LearningOutcomes['parameter'],true);
				$LearningOutcomes_description=json_decode($LearningOutcomes['outcome_description'],true);
            ?>

        <div class="doc-conversion component-divider">
            <h2>Desired Outcomes</h2>
            <table>
                <thead>
                    <tr>
                        <th>Parameter</th>
                        <th>Brief Description</th>
                    </tr>
                </thead>
                <tbody>
                <?php 
                    foreach($LearningOutcomes_parameter as $k=>$v){
                        ?>
                    <tr>
                        <td>{!!$v!!}</td>
                        <td>{!!$LearningOutcomes_description[$k]!!}</td>
                    </tr>
                    <?php } ?>
                </tbody>
            </table>
        </div>
        <?php } ?>
    </section>
</body>
</html>