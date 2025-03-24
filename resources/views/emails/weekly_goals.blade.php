<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Weekly Goals Check-In</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            font-size: 20px;
            font-weight: bold;
            text-align: center;
            color: #333;
        }
        .content {
            margin-top: 15px;
            color: #555;
        }
        .goals {
            margin: 15px 0;
            padding: 10px;
            background: #eef;
            border-radius: 5px;
        }
        .checklist {
            margin-top: 15px;
        }
        .checklist li {
            margin: 10px 0;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 14px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Staying on Track – Your Weekly Goals N U Check-In</div>
        <div class="content">
            <p>Dear {{ $data['name'] }},</p>
            <p>Hope you’re doing well! Here’s a quick check-in to keep you focused on your <em>Goals N U</em> journey.</p>
            <div class="goals">
                <p><strong>Your three key outcomes:</strong></p>
                <p><strong>{{ $data['parameter1'] }}</strong> – {{ $data['description1'] }}</p>
                <p><strong>{{ $data['parameter2'] }}</strong> – {{ $data['description2'] }}</p>
                <p><strong>{{ $data['parameter3'] }}</strong> – {{ $data['description3'] }}</p>
            </div>
            <p>Take a moment to reflect:</p>
            <ul class="checklist">
                <li>✅ What progress have you made this week?</li>
                <li>✅ What’s one small action you can take to move forward?</li>
                <li>✅ Are the actions undertaken helping you to move towards our outcomes?</li>
            </ul>
        </div>
        <div class="footer">
            <p>Your commitment makes all the difference. If you need any support, feel free to reach out!</p>
        </div>
    </div>
</body>
</html>