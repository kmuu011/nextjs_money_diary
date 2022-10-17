import {FunctionComponent, useState} from "react";
import * as styles from "../../../styles/todoGroup/TodoGroup.style";
import Link from "next/link";
import TodoItem from "./todo/todoItem";
import moreImage from "../../../public/static/button/more/more.svg";
import confirmImage from "../../../public/static/button/confirm/confirm.svg";
import cancelImage from "../../../public/static/button/cancel/cancel.svg";
import Image from "next/image";
import {deleteTodoGroupApi, updateTodoGroupApi} from "../../api/todoGroup";
import {TodoGroupItemProps} from "../../interface/props/todoGroup";

const TodoGroupItem: FunctionComponent<TodoGroupItemProps> = (
    {
        index, title, todoList, updatedAt,
        reloadTodoGroupList
    }
) => {
    const [showMore, setShowMore] = useState(false);
    const [todoGroupTitle, setTodoGroupTitle] = useState(title);
    const [modifyMode, setModifyMode] = useState(false);

    const showMoreMenu = (): void => {
        setShowMore(true)
    }

    const modifyStart = (): void => {
        setShowMore(false);
        setModifyMode(true);
    }

    const cancelModify = (): void => {
        setModifyMode(false);
    }

    const updateTodoGroup = async (): Promise<void> => {
        const response = await updateTodoGroupApi(index, {title: todoGroupTitle});

        if (response?.status !== 200) {
            alert(response?.data.message);
            return;
        }

        setModifyMode(false);
        reloadTodoGroupList(undefined, true);
    }

    const deleteTodoGroup = async (): Promise<void> => {
        const response = await deleteTodoGroupApi(index);

        if (response?.status !== 200) {
            alert(response?.data.message);
            return;
        }

        setModifyMode(false);
        reloadTodoGroupList(undefined, true);
    }

    return (
        <div
            className={styles.todoGroupItem}
        >
            <Link href={`/todoGroup/${index}/todo`}>
                <div className={styles.todoWrap}>
                    {
                        todoList.map((todo, i) => {
                            return <TodoItem
                                preview={true}
                                todoGroupIdx={index}
                                index={todo.idx}
                                content={todo.content}
                                completedAt={todo.completedAt}
                                key={i}
                            />
                        })
                    }
                </div>
            </Link>

            {
                modifyMode ?
                    <div className={styles.modifyModeWrap}>
                        <input
                            type={"text"} defaultValue={todoGroupTitle}
                            onChange={(e) => setTodoGroupTitle(e.target.value)}
                        />
                        <div onClick={() => updateTodoGroup()}>
                            <Image src={confirmImage} alt="수정완료버튼" width={30} height={30}/>
                        </div>
                        <div onClick={() => cancelModify()}>
                            <Image src={cancelImage} alt="삭제버튼" width={30} height={30}/>
                        </div>
                    </div>
                    :
                    <div className={styles.todoGroupTitle}>
                        {title}
                    </div>

            }
            <div>
                {updatedAt}
            </div>
            <div className={styles.moreButtonWrap} onClick={() => showMoreMenu()}>
                <Image src={moreImage} alt="할일그룹옵션버튼" width={30} height={30}/>
            </div>

            {
                showMore ?
                    <div className={styles.moreWrap}>
                        <div onClick={() => modifyStart()}>수정</div>
                        <div onClick={() => deleteTodoGroup()}>삭제</div>
                        <div onClick={() => setShowMore(false)}>취소</div>
                    </div>
                    :
                    ''
            }
        </div>
    )
}

export default TodoGroupItem
