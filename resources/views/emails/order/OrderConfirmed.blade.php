<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmed</title>
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
        .order-box {
            background-color: #F8F8F8;
            border-radius: 6px;
            padding: 20px;
            margin: 20px 0;
            border-left: 4px solid #D02738;
        }
        .order-box p {
            margin: 6px 0;
            font-size: 14px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 14px;
        }
        table th {
            background-color: #D02738;
            color: #fff;
            padding: 10px 12px;
            text-align: left;
        }
        table td {
            padding: 10px 12px;
            border-bottom: 1px solid #EFEFEF;
            color: #373737;
        }
        table tr:last-child td {
            border-bottom: none;
        }
        .total-row td {
            font-weight: bold;
            color: #D02738;
            border-top: 2px solid #D02738;
        }
        .address-box {
            background-color: #F8F8F8;
            border-radius: 6px;
            padding: 16px 20px;
            margin: 20px 0;
            font-size: 14px;
            line-height: 1.8;
            color: #555;
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
            <h1>Order Confirmed!</h1>
            <p>Thank you for your purchase.</p>
        </div>

        <div class="body">
            <p>Hi <span class="highlight">{{ $order->orderAddress->full_name }}</span>,</p>
            <p>
                Your order has been successfully placed on <strong>{{ config('app.name') }}</strong>.
                We'll notify you once it's on its way!
            </p>

            {{-- Order Info --}}
            <div class="order-box">
                <p><strong>Order Number:</strong> <span class="highlight">{{ $order->order_number }}</span></p>
                <p><strong>Order Date:</strong> {{ $order->created_at->format('d M Y') }}</p>
                <p><strong>Payment Status:</strong> {{ $order->payment_status?->value ?? $order->payment_status }}</p>
                <p><strong>Order Status:</strong> {{ $order->order_status?->value ?? $order->order_status }}</p>
            </div>

            {{-- Order Items --}}
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($order->orderItems as $item)
                    <tr>
                        <td>{{ $item->product_name }}</td>
                        <td>{{ $item->quantity }}</td>
                        <td>${{ number_format($item->price, 2) }}</td>
                        <td>${{ number_format($item->total, 2) }}</td>
                    </tr>
                    @endforeach
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3">Subtotal</td>
                        <td>${{ number_format($order->subtotal, 2) }}</td>
                    </tr>
                    <tr>
                        <td colspan="3">Shipping</td>
                        <td>${{ number_format($order->shipping_cost, 2) }}</td>
                    </tr>
                    @if($order->discount > 0)
                    <tr>
                        <td colspan="3">Discount</td>
                        <td>-${{ number_format($order->discount, 2) }}</td>
                    </tr>
                    @endif
                    <tr class="total-row">
                        <td colspan="3">Total</td>
                        <td>${{ number_format($order->total, 2) }} USD</td>
                    </tr>
                </tfoot>
            </table>

            {{-- Shipping Address --}}
            <p><strong>Shipping Address:</strong></p>
            <div class="address-box">
                {{ $order->orderAddress->full_name }}<br>
                {{ $order->orderAddress->address_line1 }}
                @if($order->orderAddress->address_line2)
                    , {{ $order->orderAddress->address_line2 }}
                @endif
                <br>
                {{ $order->orderAddress->city }}, {{ $order->orderAddress->state }} {{ $order->orderAddress->postal_code }}<br>
                {{ $order->orderAddress->country }}<br>
                {{ $order->orderAddress->phone }}
            </div>

            <p style="text-align: center;">
                <a href="{{ route('frontend.orders.order-confirmed') }}" class="btn">View Order</a>
            </p>

            <p>If you have any questions, feel free to reach out to our support team.</p>
            <p>Thank you for shopping with us!</p>
        </div>

        <div class="footer">
            &copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.<br>
            This email was sent to {{ $order->orderAddress->email }}.
        </div>
    </div>
</body>
</html>