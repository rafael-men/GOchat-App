(function(){
    const App = document.querySelector('.app')
    const socket = io()
    let uname

    App.querySelector(".join-screen #join").addEventListener('click',function() {
        let username = App.querySelector(".join-screen #username").value;
        if(username.length == 0) {
            return;
        }
        socket.emit('newuser',username)
        uname = username
        App.querySelector('.join-screen').classList.remove('active')
        App.querySelector('.chat-screen').classList.add('active')
    })

    App.querySelector(".chat-screen #send-message").addEventListener('click',function(){
        let message = App.querySelector(".chat-screen #message-input").value;

        if(message.length == 0) {
            return;
        }

    })    
})();