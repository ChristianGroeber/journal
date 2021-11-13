Vue.component('todo-item', {
    template: '<li>{{ todo.text }}</li>',
    props: ['todo'],
});

var app = new Vue({
    el: '#app',
    data: {
        groceryList: [
            {id: 0, text: 'something'},
            {id: 1, text: 'another thing'},
            {id: 2, text: 'a third thing'},
        ]
    }
})