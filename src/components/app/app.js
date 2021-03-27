import React from "react";

import AppHeader from "../app-header";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import ItemAddForm from "../item-add-form";
import SearchPanel from "../search-panel";
import './app.css';


export default class App extends React.Component {

    maxId = 1;

    constructor(props) {
        super(props);
        this.state = {
            todoData: [
                this.createTodoItem('Выпить кофе'),
                this.createTodoItem('Выгулять собаку'),
                this.createTodoItem('Позвонить маме')
            ],
            term: '',
            status: 'all',
        }
    }

    createTodoItem(text) {
        return {
            label: text,
            important: false,
            done: false,
            id: this.maxId++,
        }
    }

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const newTodo = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];
            return {
                todoData: newTodo,
            }
        })
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text);
        this.setState(({todoData}) => {
            const newTodo = [
                ...todoData,
                newItem
            ];
            return {
                todoData: newTodo
            }
        })
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ]
    }

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important'),
            }
        })
    };

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done'),
            }
        })
    };

    onSearchItem = (term) => {
        this.setState({term})
    };

    onFilterItem = (status) => {
        this.setState({status})
    };

    search(items, term) {
        if (term.length === 0) {
            return items
        }
        return items.filter((item) => {
            return item.label.toLowerCase().includes(term.toLowerCase())
        })

    }

    filter(items, status) {
        switch (status) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done === true);
            case 'done':
                return items.filter((item) => item.done === true);
            default:
                return items;
        }
    }

    render() {
        const {todoData, term, status} = this.state;

        const visibleItems = this.filter((this.search(todoData, term)), status);

        const doneCount = todoData.filter((el) => el.done === true).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className='todo-app'>
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className='top-panel d-flex'>
                    <SearchPanel onSearchItem={this.onSearchItem}/>
                    <ItemStatusFilter
                        filter={status}
                        onFilterItem={this.onFilterItem}
                    />
                </div>
                <TodoList
                    todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <ItemAddForm addItem={this.addItem}/>
            </div>
        )
    }
}
