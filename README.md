# Mail Manager Client

```js
const env = require('./config')
const axios = require('axios')
const mailer = require('./mail-client')(axios, env)
```

```js
const main = async () => {
    // first aproach
    const result = await mailer
        .to('chen7david@me.com')
        .subject('wow message')
        .template('this is html')
        .send()
    
    // second aproach
    const result = await mailer.send({
        to: "chen7david@me.com",
        subject: "new message",
        template: "hello ${user.name}",
    })

    console.log(result)
}

main()
```

output

```js
{
  isCargo: true,
  serial: '44974',
  createdAt: '2020-03-23T10:49:18.161Z',
  details: {
    accepted: [ 'some-email@me.com' ],
    rejected: [],
    envelopeTime: 882,
    messageTime: 1570,
    messageSize: 270,
    response: '250 2.0.0 OK  1584960562 b26sm4901759oti.3 - gsmtp',
    envelope: { from: 'some-sender-email@gmail.com', to: [Array] },
    messageId: '<f6ea3a5c-b712-8143-7390-0455e25bc1e5@gmail.com>',
    sent: true
  }
}
```