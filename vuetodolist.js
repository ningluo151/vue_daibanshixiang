const { createApp } = Vue; // 从 Vue 对象中解构出createApp
//创建vue实例
createApp({
    // 注意：Vue 3 中 data 必须是函数，返回数据对象
    //书写固定数据
    data() {
        return {
            todos: [],//任务数组{
            //     id: Date.now(),用时间戳作为唯一ID,防止数组索引变化导致的问题
            //     text:input.value.trim();任务文字
            //     completed: false 任务默认都是"未完成",不添加completed这个下划线类名
            // }
            newTodoText: ''//输入框输入的文本
        }
    },

    
    // 生命周期：页面加载时执行
    mounted() {
        this.loadFromLocalStorage();
    },

    // 计算属性：自动计算衍生数据
    computed: {
        // 总任务数
        totalCount() {
            return this.todos.length;
        },
        // 已完成任务数
        completedCount() {
            return this.todos.filter(todo => todo.completed).length;
        }
    },

    //方法：处理各种操作。  书写函数，调用data数据直接用this指代
    methods: {
        //添加任务,   用;分割（语句结束），每个动作之间用分号分隔，表示“这一步做完了，开始下一步”
        addTodo: function () {
            const text = this.newTodoText.trim();
            if (!text) {//如果为空则什么都不做，退出函数
                return;
            };

            // 用,分割（对象属性）
            const newTodo = {
                id: Date.now(),// 用时间戳作为唯一ID
                text: text,
                completed: false
            };

            this.todos.push(newTodo);
            this.saveToLocalStorage();//本地保存
            this.newTodoText = '';//清空输入框
        },
        // 切换任务完成状态
        toggleTodo(id) {
            const todo = this.todos.find(t => t.id === id);
            if (todo) {
                todo.completed = !todo.completed;//切换状态，不能使用true，还有可能是falsh
                this.saveToLocalStorage();//本地保存
            }
        },
        //删除单个任务
        removeTodo(id) {
            this.todos = this.todos.filter(todo => todo.id !== id);
            this.saveToLocalStorage();//本地保存
        },
        // 清除已完成的任务
        removeCompleted() {
            this.todos = this.todos.filter(todo => !todo.completed);
            this.saveToLocalStorage();//本地保存
        },
        // 清除所有任务
        removeAll() {
            this.todos = [];
            this.saveToLocalStorage();//本地保存
        },
        // 保存到本地存储
        saveToLocalStorage() {
            localStorage.setItem('vueTodo', JSON.stringify(this.todos));
        },
        // 从本地存储加载
        loadFromLocalStorage() {
            const saved = localStorage.getItem('vueTodo');
            if (saved) {
                this.todos = JSON.parse(saved)
            }
        }
    }

}).mount('#app');// 挂载