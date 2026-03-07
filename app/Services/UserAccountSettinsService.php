<?php

namespace App\Services;

use App\Enums\AddressType;
use App\Models\User;
use App\Models\UserAddresse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserAccountSettinsService
{
    public function getUserWithAddresses(): array
    {
        $user = Auth::user();
        $addresses = UserAddresse::where('user_id', $user->id)->get();

        return [
            'user' => $user,
            'addresses' => $addresses,
        ];
    }

    public function updateAccountSettings(array $data): User
    {
        $user = Auth::user();

        $validated = validator($data, [
            'name'   => ['required', 'string', 'max:100'],
            'email'        => ['required', 'email', 'max:150'],
            'phone'        => ['required', 'string', 'max:20'],
        ])->validate();

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
        ]);

        return $user;
    }

    public function changePassword(array $data): bool
    {
        $validated = validator($data, [
            'oldPassword' => ['required', 'string'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ])->validate();

        $user = Auth::user();

        // Check if old password matches current password
        if (!Hash::check($validated['oldPassword'], $user->password)) {
            throw new \Illuminate\Validation\ValidationException(
                validator([], ['oldPassword' => 'The old password is incorrect.'])
            );
        }

        // Update password
        $user->update([
            'password' => Hash::make($validated['password']),
        ]);

        return true;
    }

    public function updateProfileImage($image): string
    {
        $user = Auth::user();

        if ($image) {
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $imagePath = $image->storeAs('user-images', $imageName, 'public');

            $user->update([
                'image_url' => '/storage/' . $imagePath,
            ]);

            return $user->image_url;
        }

        throw new \Exception('No image file provided');
    }

    public function updateBillingAddress(array $data): UserAddresse
    {
        $validated = validator($data, [
            'full_name'   => ['required', 'string', 'max:100'],
            'address_line1' => ['required', 'string', 'max:255'],
            'address_line2' => ['nullable', 'string', 'max:255'],
            'city'         => ['required', 'string', 'max:100'],
            'state'        => ['required', 'string', 'max:100'],
            'postal_code'  => ['required', 'string', 'max:20'],
            'country'      => ['required', 'string', 'max:100'],
            'phone'        => ['required', 'string', 'max:20'],
        ])->validate();

        $user = Auth::user();

        return UserAddresse::updateOrCreate(
            ['user_id' => $user->id, 'type' => AddressType::BILLING->value],
            [
                'full_name' => $validated['full_name'],
                'address_line1' => $validated['address_line1'],
                'address_line2' => $validated['address_line2'],
                'city' => $validated['city'],
                'state' => $validated['state'],
                'postal_code' => $validated['postal_code'],
                'country' => $validated['country'],
                'phone' => $validated['phone'],
                'is_default' => true,
            ]
        );
    }

    public function updateShippingAddress(array $data): UserAddresse
    {
        $validated = validator($data, [
            'full_name'   => ['required', 'string', 'max:100'],
            'address_line1' => ['required', 'string', 'max:255'],
            'address_line2' => ['nullable', 'string', 'max:255'],
            'city'         => ['required', 'string', 'max:100'],
            'state'        => ['required', 'string', 'max:100'],
            'postal_code'  => ['required', 'string', 'max:20'],
            'country'      => ['required', 'string', 'max:100'],
            'phone'        => ['required', 'string', 'max:20'],
        ])->validate();

        $user = Auth::user();

        return UserAddresse::updateOrCreate(
            ['user_id' => $user->id, 'type' => AddressType::SHIPPING->value],
            [
                'full_name' => $validated['full_name'],
                'address_line1' => $validated['address_line1'],
                'address_line2' => $validated['address_line2'],
                'city' => $validated['city'],
                'state' => $validated['state'],
                'postal_code' => $validated['postal_code'],
                'country' => $validated['country'],
                'phone' => $validated['phone'],
                'is_default' => true,
            ]
        );
    }
}
