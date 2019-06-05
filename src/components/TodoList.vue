<template>
        <div id="todoList">
            <div>
                <span>
                    <input v-model.trim ="list.newTask" type="text" :placeholder="list.placeHolder">
                    <button type="button" @click="addTask" class="btn btn-info el2">add task</button>
                    <button type="button" @click="toggle"  class="btn btn-info el2">{{buttonStatus}}</button> 
                    <button type="button" @click="clearTasks" class="btn btn-danger el2">clear all tasks</button>
                </span>
            </div>    
            <ul v-show="list.showList" class="list-group" >
                <li class="list-group-item list-group-item-info">TASKS:</li>
                <li v-for="(task,i) in list.tasks" :key="i"
                    :class="[task.checked ? list.class.done : list.class.toDo]"
                    class="list-group-item list-group-item-action"
                > 
                    <input v-model="task.checked" type="checkbox" class="el"> 
                    <span v-if="task.checked" style="text-decoration: line-through">{{task.task}}</span> 
                    <span v-else>{{task.task}}</span>
                    <button 
                        @click="removeTask(i)" 
                        :class="{'btn btn-info': !task.checked,
                                'btn btn-success': task.checked }"
                        class="el"         
                        type="button">remove task
                    </button>
                </li>
            </ul>
        </div>
</template>

<style>
    div {
        padding:  10px;
    }
    input[type=checkbox] {
        transform: scale(2);
    }
    .el{
        padding: 30px;
        margin: 15px;
    }
    .el2 {
        margin: 5px;
    }
</style>

<script>
    

    export default {
        
        name: 'TodoList',
        data: function(){	
            return{
                list: {
                    placeHolder: 'enter a task...',
                    newTask: '',
                    tasks: [],
                    showList: false,
                    class: {  
                        done: 'list-group-item list-group-item-success',
                        toDo: 'list-group-item list-group-item-light'
                    } 
                }
            }    
        },
        methods:{
            addTask: function(){   
                // this.list.newTask = this.list.newTask.toLowerCase();
                // const duplicates = this.list.tasks.filter(obj => obj.task === this.list.newTask);
                    
                // if(duplicates.length === 0  && this.list.newTask != ''){
                //     this.list.tasks.push({
                //         task: this.list.newTask,
                //         checked: false
                //     });
                //     this.list.showList = true;  
                // }  
                // this.list.newTask = '';
            },
            toggle: function(){
                this.list.showList = !this.list.showList;
            },
            removeTask: function(i){
                this.list.tasks.splice(i,1);
            },
            clearTasks: function(){
                this.list.tasks = [];
            }
        },
        computed:{
            buttonStatus: function(){
                return this.list.showList ? 'hide tasks' : 'show tasks';
            }
        }
    }
</script>