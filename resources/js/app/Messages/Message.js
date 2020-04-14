'use strict';

export default class Message {
    constructor() {};


    static build(data) {
        return {
            id: 1,
            user_name: 'Вася',
            message: data,
            selfMessage: true,
            created_at: 'сегодня в 23:36'
        }
    }
}
