import Vue from 'vue';
import Event from '../Events/Event.js';

/*Echo.channel('chat')
    .listen('.public.messages', (e) => {
        //console.log(e);
    });*/

/*
Echo.join('chat')
    .here(users => {
        Event.$emit('users.here', users);
    })
    .joining(user => {
        Event.$emit('users.joined', user);
    })
    .leaving(user => {
        Event.$emit('users.left', user);
    })
    .listen('.public.message', (data) => {
        console.log(data);
        Event.$emit('added_message', data);
    });
*/


/*
Echo.join('chat')
    .here(users => {
        console.log(users)
        /!*this.users = users;*!/
    })
    .joining(user => {
        console.log(user)
        //this.users.push(user);
    })
    .leaving(user => {
        console.log(user)
        //this.users = this.users.filter(u => u.id !== user.id);
    })

    .listen('MessageCreated', (event) => {

        console.log(event)

        /!*Vue.$store.dispatch('ADD_MESSAGE', Message.build(this.content));*!/

        /!*this.messages.push({
            messages: event.messages.messages,
            user: event.user
        });

        this.users.forEach((user, index) => {
            if (user.id === event.user.id) {
                user.typing = false;
                this.$set(this.users, index, user);
            }
        });*!/
    });
*/
