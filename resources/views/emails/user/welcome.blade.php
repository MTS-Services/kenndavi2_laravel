<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #F4F4F4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 7px 29px 0px #64646F33;
        }
        .header {
            background-color: #D02738;
            padding: 40px 30px;
            text-align: center;
        }
        .header h1 {
            color: #fff;
            margin: 0;
            font-size: 28px;
        }
        .header p {
            color: #ADB7BC;
            margin: 8px 0 0;
            font-size: 15px;
        }
        .body {
            padding: 40px 30px;
            color: #373737;
        }
        .body p {
            font-size: 15px;
            line-height: 1.7;
        }
        .highlight {
            color: #D02738;
            font-weight: bold;
        }
        .btn {
            display: inline-block;
            margin: 20px 0;
            padding: 12px 30px;
            background-color: #D02738;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 6px;
            font-size: 15px;
            font-weight: bold;
        }
        .footer {
            background-color: #F8F8F8;
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #9B9B9F;
            border-top: 1px solid #ADB7BC;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Welcome!</h1>
            <p>We're glad to have you on board.</p>
        </div>
        <div class="body">
            <p>Hi <span class="highlight">{{ $data['name'] }}</span>,</p>
            <p>
                Thank you for joining <strong>{{ config('app.name') }}</strong>! Your account has been verified and is ready to use.
            </p>
            <p>
                You can now log in and explore everything we have to offer.
            </p>
            <p style="text-align: center;">
                <a href="{{ route('login') }}" class="btn">Go to Dashboard</a>
            </p>
            <p>If you have any questions, feel free to reach out to our support team.</p>
            <p>Welcome aboard! 🚀</p>
        </div>
        <div class="footer">
            &copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.<br>
            This email was sent to {{ $data['email'] }}.
        </div>
    </div>
</body>
</html>
