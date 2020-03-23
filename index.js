class MailClient {

    constructor(axios, options = {}){
        const { token, baseURL } = options
        if(!axios) throw('axios is required')
        if(!token) throw('token is required')
        this.http = axios.create({
            baseURL: baseURL ? baseURL : 'http://192.168.50.251:3500/api/auth/mailer',
            headers: {
                authorization: token
            }
        })
    }
    to(to){
        this._to = to
        return this
    }

    subject(subject){
        this._subject = subject
        return this
    }

    template(template){
        this._template = template
        return this
    }

    data(data){
        this._data = data
        return this
    }

    cc(cc){
        this._cc = cc
        return this
    }

    bcc(bcc){
        this._bcc = bcc
        return this
    }

    async send(options = {}){
        const to = options.to ? options.to : this._to
        const subject = options.subject ? options.subject : this._subject
        const template = options.template ? options.template : this._template

        if(!to) throw('to is required')
        if(!subject) throw('subject is required')
        if(!template) throw('template is required')

        const config = { to, subject, template }

        if(options.data) config.data = options.data
        if(options.cc) config.cc = options.cc
        if(options.bcc) config.bcc = options.bcc

        const { data } = await this.http.post('/send', config)
        return data
    }

}

module.exports = (axios, options) => new MailClient(axios, options)