import type {NextPage} from 'next';
import * as styles from '../../styles/todoGroup/TodoGroup.style';
import {useEffect, useState} from "react";
import SetHead from "../../src/component/common/Head";
import CircleButton from "../../src/component/common/button/CircleButton";
import addImage from "../../public/static/button/add/add.svg";
import {createTodoGroupApi, selectTodoGroupApi} from "../../src/api/todoGroup";
import TodoGroupItem from "../../src/component/todoGroup/todoGroupItem";
import {TodoGroupItemType} from "../../src/interface/type/todoGroup";
import InfiniteScroll from 'react-infinite-scroller';
import {CircleButtonProps} from "../../src/interface/props/common";

const TodoGroup: NextPage = () => {
    const [todoGroupList, setTodoGroupList] = useState<TodoGroupItemType[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [last, setLast] = useState<number>(0)

    const createTodoGroup = async (): Promise<void> => {
        const response = await createTodoGroupApi({title: `할일 그룹 ${totalCount + 1}`});

        if (response?.status !== 201) {
            alert(response?.data.message);
            return;
        }

        await getTodoGroupList(undefined, true);
    }

    const getTodoGroupList = async (nextPage?: boolean, initial?: boolean): Promise<void> => {
        const selectPage = initial ? 1 : nextPage ? page + 1 : page;

        if (last !== 0 && last < selectPage) return;

        const response = await selectTodoGroupApi({page: selectPage, count: 12});

        if (response?.status !== 200) {
            alert(response?.data.message);
            return;
        }

        setTotalCount(response.data.totalCount);

        setTodoGroupList(initial ?
            response.data.items : [...todoGroupList, ...response.data.items]
        );

        setPage(response.data.page);
        setLast(response.data.last);
    }

    const circleButtonProps: CircleButtonProps = {
        image: addImage,
        action: createTodoGroup
    }

    useEffect(() => {
        getTodoGroupList();
    }, []);

    return (
        <div className={styles.container}>
            <SetHead/>

            <div className={styles.circleButtonWrap}>
                <CircleButton {...circleButtonProps}/>
            </div>

            <InfiniteScroll
                className={styles.todoGroupListWrap}
                initialLoad={false}
                pageStart={1}
                loadMore={() => getTodoGroupList(true)}
                hasMore={true}
            >
                {
                    todoGroupList.map((todoGroup, i) => {
                        return <TodoGroupItem
                            index={todoGroup.idx}
                            title={todoGroup.title}
                            updatedAt={todoGroup.updatedAt}
                            todoList={todoGroup.todoList}
                            key={todoGroup.idx}
                            reloadTodoGroupList={getTodoGroupList}
                        />
                    })
                }
            </InfiniteScroll>

        </div>
    )
}

export default TodoGroup
