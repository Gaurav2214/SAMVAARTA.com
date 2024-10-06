<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Register</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333333;
        }
        p {
            color: #555555;
            line-height: 1.6;
        }
        .button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            text-align: center;
            display: inline-block;
            border-radius: 5px;
            text-decoration: none;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #999999;
        }
    </style>
</head>
<body>
    <div class="container">
    <table border="0" style="width:100%">
        <tbody>
        <tr>
        <td colspan="2"><strong>Hi {!!$data['member_name']!!},</strong></td>
        </tr>
        <tr>
        <td colspan="2">We are happy to have you as the newest member of {!!$data['site_name']!!} !</td>
        </tr>
        <tr>
        <td colspan="2">This is a registration email as per the details submitted by you. You are now registered on {!!$data['site_name']!!} with the following details::</td>
        </tr>
        <tr>
        <td colspan="2"> </td>
        </tr>
        <tr>
        <td><strong>Email ID:</strong></td>
        <td>{!!$data['email']!!}</td>
        </tr>
        <tr>
        <td><strong>User Type:</strong></td>
        <td>{!!$data['user_type']!!}</td>
        </tr>

        <tr>
        <td><strong>Mobile:</strong></td>
        <td>{!!$data['phone']!!}</td>
        </tr>
        <tr>
        <td colspan="2"> </td>
        </tr>
        
        <tr>
        <td colspan="2"> </td>
        </tr>
        <tr>
        <td colspan="2">Thank you.<br />
        {!!$data['site_name']!!}</td>
        </tr>
        <tr>
        <td colspan="2" style="text-align:center">{!!$data['site_name']!!}. All right reserved.</td>
        </tr>
        </tbody>
        </table>
    </div>
    <div class="footer">
       
    </div>
</body>
</html>