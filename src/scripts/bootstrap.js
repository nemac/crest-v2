// Bootstrap dependencies
window.$ = window.jQuery = require('jquery') // required for bootstrap
window.Popper = require('popper.js') // required for tooltip, popup...
import 'bootstrap';

//scss
import '../css/index.scss' // include bootstrap css file with own modifications

import { Store } from './store'

var state = new Store({renderCount:0});
state.renderCount =+ 1


// tooltip and popover require javascript side modification to enable them (new in Bootstrap 4)
// use tooltip and popover components everywhere
$(function (){
  $('[data-toggle="tooltip"]').tooltip()
  $('[data-toggle="popover"]').popover()
})

console.log('b')
console.log('1', state.getName())
