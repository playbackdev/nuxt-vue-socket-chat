const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const users = require('./users')();

//функция для удобства, возвращающая объект
const m = (name, text, id) => ({
  name, text, id
});

io.on('connection', socket => {

  //обработка входа пользователя в комнату
  //data - то что прищло от клиента
  //cb - коллбек, который надо вызвать по результатам.
  //аргумент в колбеке - то, что возвращаем клиенту
  socket.on('userJoined', (data, cb) => {
    if(!data.name || !data.room) {
      return cb('Данные некорректны');
    }
    //Программно добавляем юзера в комнату, передаем номер комнаты
    socket.join(data.room);
    //возвращаем объект с id подключения
    users.remove(socket.id);
    users.add({
      id: socket.id,
      name: data.name,
      room: data.room
    });
    //возвращаем ответ клиенту
    cb({ userId: socket.id });
    //обновляем список пользователей
    io.to(data.room).emit('updateUsers', users.getByRoom(data.room));
    //отправляем системеное сообщение
    socket.emit('newMessage', m('admin',
      `Добро пожаловать в чат, ${data.name}`
    ));
    //broadcast вычеркивает текущего пользователя,
    // но оставляет всех других пользователей
    //to(data.room) - только в эту комнату
    socket.broadcast.to(data.room)
      .emit('newMessage', m('admin', `Пользователь ${data.name} зашел в чат`))
  });

  //получаем сообщение от клиента
  socket.on('createMessage', (data, cb) => {
    if(!data.text) {
      return cb('Введите текст сообщения');
    }

    const user = users.get(data.id);
    if(user) {
      io.to(user.room).emit('newMessage', m(user.name, data.text, data.id));
    }
    cb();
  });

  //обработка выхода из чата
  socket.on('userLeft', (id, cb) => {
    const user = users.remove(id);
    if(user) {
      io.to(user.room).emit('updateUsers', users.getByRoom(user.room));
      io.to(user.room).emit('newMessage', m('admin',
        `Пользователь ${user.name} вышел из чата`));
      cb();
    }
  });

  //если пользователь закрыл вкладку
  socket.on('disconnect', () => {
    const user = users.remove(socket.id);
    if(user) {
      io.to(user.room).emit('updateUsers', users.getByRoom(user.room));
      io.to(user.room).emit('newMessage', m('admin',
        `Пользователь ${user.name} вышел из чата`));
    }
  });
});

module.exports = {
  app,
  server
};
