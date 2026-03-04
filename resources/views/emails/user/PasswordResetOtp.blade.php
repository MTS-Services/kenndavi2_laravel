<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Password Reset OTP</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 520px; margin: 40px auto; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
        .header { background: #1a1a2e; padding: 30px; text-align: center; }
        .header h1 { color: #fff; margin: 0; font-size: 22px; letter-spacing: 1px; }
        .body { padding: 36px 40px; text-align: center; }
        .body p { color: #555; font-size: 15px; line-height: 1.6; margin-bottom: 24px; }
        .otp-box { display: inline-block; background: #f0f4ff; border: 2px dashed #4f6ef7; border-radius: 10px; padding: 18px 40px; margin: 16px 0; }
        .otp-code { font-size: 38px; font-weight: bold; letter-spacing: 12px; color: #1a1a2e; }
        .expiry { color: #e53e3e; font-size: 13px; margin-top: 16px; }
        .footer { background: #f8f8f8; padding: 18px; text-align: center; color: #aaa; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Password Reset</h1>
        </div>
        <div class="body">
            <p>You requested a password reset. Use the OTP code below to verify your identity.</p>
            <div class="otp-box">
                <div class="otp-code">{{ $data['otp'] }}</div>
            </div>
            <p class="expiry">⏳ This code expires in <strong>10 minutes</strong>.</p>
            <p style="color:#888; font-size:13px;">If you did not request this, please ignore this email.</p>
        </div>
        <div class="footer">
            &copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.
        </div>
    </div>
</body>
</html>