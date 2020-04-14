<?php

namespace App\Http\Requests\Users;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'phone' => ['required', 'min:4', 'max:24', 'unique:users'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:4', 'confirmed'],
        ];
    }

    /**
     * Возращает правила валидации
     * пользовательской
     * регистрации
     *
     * @return array
     */
    public function messages()
    {
        return [
            'phone.required' => 'Необходимо указать номер телефона',
            'phone.unique' => 'Такой номер телефона уже существует',
            'phone.min' => 'Номер телефона не может быть менее 4-х цифр',
            'phone.max' => 'Номер телефона не может превышать 24-х символов',

            'email.required' => 'Адресс эл. почты не может быть пустым',
            'email.string' => 'Вы ввели не валидный адресс эл. почты',
            'email.email' => 'Вы ввели не валидный адресс эл. почты',
            'email.max' => 'Адресс эл. почты не может превышать 255-ти символов',
            'email.unique' => 'Такой адресс эл. почты уже существует',



            'password.required' => 'Необходимо ввести пароль',
            'password.string' => 'Пароль не может быть цифровым',
            'password.min' => 'Длина пароль должна быть не менее 4-х символов',
            'password.confirmed' => 'Пароли не совпадают',
        ];
    }
}
