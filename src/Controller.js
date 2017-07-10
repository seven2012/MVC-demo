import $ from 'jquery'
const Handlebars = require('handlebars');

//es6的类的写法
class Controller {
    constructor(options) {
        for(let key in options){
            this[key] = options[key]
        }
        this.$element = $(this.element)
        this.init && this.init()
        if(this.template && this.render){
            this.render()
        }
        this.bindEvents()
    }
    bindEvents() {
        for (let key in this.events) {
            //console.log('key:' + key)
            //console.log(typeof(key))
            let parts = key.split(' ')
            //console.log('parts:' + parts)
            //console.log(typeof(parts))
            let eventType = parts.shift()
            //console.log('eventType:' + eventType)
            //console.log('eventType:'+typeof(eventType))
            let selector = parts.join(' ')
            //console.log('"selector:"' + selector)
            //console.log('selector:'+typeof(selector))
            if (typeof this.events[key] === 'function') {
                this.$element.on(eventType, selector, this.events[key])
                //console.log(this.events[key])
            } else if (typeof this.events[key] === 'string') {
                let methodName = this.events[key]
                this.$element.on(eventType, selector,this[methodName].bind(this))
            }
        }
    }
    render(){
        // let html = Handlebars.compile(this.template)(this.data)
        // this.$element.html(html)
        let template = (this.template[0] === '#') ?
            (document.querySelector(this.template).innerHTML) :
            this.template
        let html = Handlebars.compile(template)(this.model.data)
        this.$element.html(html)
    }
}

export default Controller