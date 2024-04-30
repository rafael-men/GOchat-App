(function(){
    const App = document.querySelector('.app');
    const socket = io();
    let uname;

    App.querySelector(".join-screen #join").addEventListener('click',function() {
        let username = App.querySelector(".join-screen #username").value;
        if(username.length == 0) {
            return;
        }
        socket.emit('newuser',username);
        uname = username;
        App.querySelector('.join-screen').classList.remove('active');
        App.querySelector('.chat-screen').classList.add('active');
    });

    App.querySelector(".chat-screen #send-message").addEventListener('click',function(){
        let message = App.querySelector(".chat-screen #message-input").value;

        if(message.length == 0) {
            return;
        }

        renderMessage('my',{
            username:uname,
            text:message,
        });
        socket.emit('chat',{
            username:uname,
            text:message
        });
        App.querySelector(".chat-screen #message-input").value = "";
    });

    App.querySelector('.chat-screen #exit-chat').addEventListener('click',function() {
        socket.emit('exituser',uname);
        window.location.href = window.location.href;
    });

    socket.on('update',function(update) {
        renderMessage('update',update);
    });
    socket.on('chat',function(message) {
        renderMessage('other',message);
    });

    function renderMessage(type,message) {
        let messageContainer = App.querySelector('.chat-screen .messages');
        if(type === 'my') {
            let el = document.createElement('div');
            el.setAttribute('class','message my-message');
            el.innerHTML = `
            <div>
                <div class="name">You</div>
                <div class="text">${message.text}</div>
            </div>
            `;
            messageContainer.appendChild(el);
        }
        else if(type === 'other') { // Correção aqui
            let el = document.createElement('div');
            el.setAttribute('class','message other-message');
            el.innerHTML = `
            <div>
                <div class="name">${message.username}</div>
                <div class="text">${message.text}</div>
            </div>
            `;
            messageContainer.appendChild(el);
        }
        else if(type === 'update') { // Correção aqui
            let el = document.createElement('div');
            el.setAttribute('class','update');
            el.innerText = message;
            messageContainer.appendChild(el);
        }
        messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
    }
})();
