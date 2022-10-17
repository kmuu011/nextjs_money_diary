import type {NextPage} from 'next';
import * as styles from '../../../styles/todoGroup/todo/Todo.style';
import SetHead from "../../../src/component/common/Head";
import CircleButton from "../../../src/component/common/button/CircleButton";
import InfiniteScroll from 'react-infinite-scroller';
import addImage from "../../../public/static/button/add/add.svg";
import {createTodoApi, selectTodoApi} from "../../../src/api/todo";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {TodoItemType} from "../../../src/interface/type/todo";
import TodoItem from "../../../src/component/todoGroup/todo/todoItem";
import {CircleButtonProps} from "../../../src/interface/props/common";

const Todo: NextPage = () => {
    const todoGroupIdx: number = Number(useRouter().query.todoGroupIdx);

    const [todoList, setTodoList] = useState<TodoItemType[]>([]);
    const [page, setPage] = useState<number>(1);
    const [last, setLast] = useState<number>(0);
    const [totalCount, setTotalCount] = useState<number>(0);

    const createTodo = async (): Promise<void> => {
        const response = await createTodoApi(todoGroupIdx, {content: `할일 ${totalCount+1}`});

        if(response?.status !== 201){
            alert(response?.data.message);
            return;
        }

        await getTodoList(undefined, true);
    }

    const getTodoList = async (nextPage?: boolean, initial?: boolean): Promise<void> => {
        if (isNaN(todoGroupIdx)) return;

        const selectPage = initial ? 1 : nextPage ? page + 1 : page;

        if (last !== 0 && last < selectPage) return;

        const response = await selectTodoApi(todoGroupIdx, {page: selectPage, count: 30});

        if(response?.status !== 200){
            alert(response?.data.message);
            return;
        }

        setTodoList(initial ?
            response.data.items : [...todoList, ...response.data.items]
        );
        setPage(response.data.page);
        setLast(response.data.last)
        setTotalCount(response.data.totalCount);
    }

    const circleButtonProps: CircleButtonProps = {
        image: addImage,
        action: createTodo
    }

    useEffect(() => {
        getTodoList();
    }, [todoGroupIdx]);

    return (
        <div className={styles.container}>
            <SetHead/>

            <div className={styles.circleButtonWrap}>
                <CircleButton {...circleButtonProps}/>
            </div>

            <InfiniteScroll
                className={styles.todoListWrap}
                initialLoad={false}
                pageStart={1}
                loadMore={() => getTodoList(true)}
                hasMore={true}
            >
                {
                    todoList.map((todo, i) => {
                        return <TodoItem
                            todoGroupIdx={todoGroupIdx}
                            index={todo.idx}
                            content={todo.content}
                            completedAt={todo.completedAt}
                            reloadTodoList={getTodoList}
                            key={todo.idx}
                        />
                    })
                }
            </InfiniteScroll>

        </div>
    )
}

export default Todo
