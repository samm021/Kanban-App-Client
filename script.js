const app = new Vue ({
    el: '#app',
    data: {
        page: '',
        task: {
            title: '',
            detail: '',
            due_date: ''
        },
        tasks: '',
        msg: '',
        login: {
            email: '',
            password: ''
        },
        register: {
            email: '',
            name: '',
            password: ''
        },
        baseUrl: 'http://localhost:3000',
    },
    methods: {
        changePage(page){
            this.page = page;
        },
        logout() {
            localStorage.clear();
            this.changePage('login');
        },
        goRegister() {
            this.changePage('register');
        },
        checkAuth() {
            if (localStorage.getItem('access_token')) {
                this.changePage('content');
                this.getTasks();
            } else {
                this.changePage('login');
            }
        },
        async loginPost() {
            try {
                const user = await axios.post(`${this.baseUrl}/login`, {
                    email: this.login.email,
                    password: this.login.password
                });
                localStorage.setItem('access_token', user.data.access_token);
                this.checkAuth();
            }
            catch(err) {
                console.log(err.response);
            }
            finally {
                this.login.email = '';
                this.login.password = '';
            }
            
        },
        async registerPost(){
            try {
                await axios.post(`${this.baseUrl}/register`, {
                    email: this.register.email,
                    name: this.register.name,
                    password: this.register.password
                });
                this.changePage('login');
            }
            catch(err) {
                console.log(err.response);
            }
            finally {
                this.register.email = '';
                this.register.name = '';
                this.register.password = '';
            }
        },
        async getTasks() {
            try {
                let tasks = await axios({
                    method: 'GET',
                    url: `${this.baseUrl}/tasks`,
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                });
                console.log(tasks.data);
                this.tasks = tasks.data;
            }
            catch(err) {
                console.log(err.response);
            }
        },
        async getTask(id) {
            try {
                let task = await axios({
                    method: 'GET',
                    url:`${this.baseUrl}/tasks/${id}`,
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    }
                });
                console.log(task);
                this.task.title = task.data.title;
                this.task.detail = task.data.detail;
                this.task.due_date = task.data.due_date;
            }
            catch(err) {
                console.log(err.response)
            }
        },
        async putTask(id) {
            try {
                await axios({
                    method: 'PUT',
                    url: `${this.baseUrl}/tasks/${id}`,
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    },
                    data: {
                        title: this.task.title,
                        detail: this.task.detail,
                        due_date: this.task.due_date
                    }
                });
                this.task.title = '';
                this.task.detail = '';
                this.task.due_date = '';
            }
            catch(err) {
                console.log(err.response)
            }
        },
        async patchTask(id, category) {
            try {
                await axios({
                    method: 'PATCH',
                    url: `${baseUrl}/tasks/${id}`,
                    headers: {
                        access_token: localStorage.getItem('access_token')
                    },
                    data: {
                        category
                    }
                });
            }
            catch(err) {
                console.log(err.response)
            }
        },
        async deleteTask(id) {
            try {
                const task = await axios.delete(`${this.baseUrl}/tasks/${id}`);
                console.log(task.data)
            }
            catch(err) {
                console.log(err.response)
            }
        }
    },
    created() {
        this.checkAuth();
    },
    computed: {
        backlogTasks() {
            return this.tasks.filter(task => task.category == 'backlog');
        },
        todoTasks() {
            return this.tasks.filter(task => task.category == 'todo');
        },
        doingTasks() {
            return this.tasks.filter(task => task.category == 'doing');
        },
        doneTasks() {
            return this.tasks.filter(task => task.category == 'done');
        }
    }
})