const redis = require('redis');
const client = redis.createClient(6379, '47.105.105.165', { password: 'zhang123' });
client.on('error', (err) => {
    console.log('redis client is error:' + err);
});
client.on('connect', () => {
    console.log('redis client');
});
// string
client.set('age', '56', redis.print);
client.get('age', (err, val) => {
    if (err) throw err;
    console.log('age = ' + val);
    client.quit();
});

// hash
client.hmset('kitty', {
    'age': '23',
    'sex': 'male'
}, redis.print);
client.hget('kitty', 'age', (err, val) => {
    if (err) throw err;
    console.log('kitty age is ' + val);
});
client.hkeys('kitty', (err, val) => {
    if (err) throw err;
    val.forEach((key, item) => {
        console.log(key, item);
    });
    client.quit();
});
// list
client.lpush('tasks', ['111', '3333', '333332'], redis.print);
client.lrange('tasks', 0, -1, (err, items) => {
    if (err) throw err;
    items.forEach((item, i) => {
        console.log(item, i);
    });
    client.quit();
});
// set
client.sadd('ip', '192.168.3.7', redis.print);
client.sadd('ip', '192.168.3.7', redis.print);
client.sadd('ip', '192.168.3.9', redis.print);
client.smembers('ip', function (err, members) {
    if (err) throw err;
    console.log(members);
    client.quit();
});
// SUBSCRIBE
const client1 = redis.createClient(6379, '47.105.105.165', { password: 'zhang123' });
const client2 = redis.createClient(6379, '47.105.105.165', { password: 'zhang123' });
client1.on('message', (channel, message) => {
    console.log('Client  got message from channel %s: %s', channel, message);
});
client1.on('subscribe', (channel, count) => {
    client2.publish('main_chat_room', 'Hello world!');
});
client1.subscribe('main_chat_room');