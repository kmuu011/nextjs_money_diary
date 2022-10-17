import {FunctionComponent, useState} from "react";
import * as styles from "../../../../styles/todoGroup/todo/Todo.style";
import {deleteTodoApi, updateTodoApi} from "../../../api/todo";
import confirmImage from "../../../../public/static/button/confirm/confirm.svg";
import cancelImage from "../../../../public/static/button/cancel/cancel.svg";
import deleteImage from "../../../../public/static/button/delete/delete.svg";
import Image from "next/image";
import {css} from "@emotion/css";
import {TodoItemProps} from "../../../interface/props/todo";
import {UpdateTodoDto} from "../../../interface/dto/todo";

const emotionCss = {
    todoItemCss: (preview: boolean | undefined) => css`
      display: flex;
      justify-content: flex-start;
      align-items: center;
      column-gap: 20px;
      border-bottom: 1px solid #eaeaea;
      width: 100%;
      padding: ${preview ? 10 : 14}px 0;
    `,

    checkboxWrap: (preview: boolean | undefined) => css`
      display: ${preview ? 'none' : 'flex'};

      input[type="checkbox"] {
        position: relative;
        height: ${preview ? 0 : 20}px;
        width: ${preview ? 0 : 20}px;
      }
    `,

    content: (complete: boolean, preview: boolean | undefined) => css`
          cursor: pointer;
          color: ${complete ? '#afafaf' : '#000000'};
          font-size: ${preview ? 12 : 16}px;
          word-break: break-all;
        `
}
const TodoGroupItem: FunctionComponent<TodoItemProps> = (
    {
        preview,
        todoGroupIdx,
        index, content,
        completedAt,
        reloadTodoList
    }
) => {
    const [modifyMode, setModifyMode] = useState<boolean>(false);
    const [todoContent, setTodoContent] = useState<string>(content);
    const [todoComplete, setTodoComplete] = useState<boolean>(completedAt !== null);

    const updateTodo = async (complete?: boolean, offModifyMode?: boolean): Promise<void> => {
        const updateTodoDto: UpdateTodoDto = {
            content: todoContent
        };

        if (complete !== undefined){
            updateTodoDto.complete = complete;
            setTodoComplete(complete);
        }

        const response = await updateTodoApi(todoGroupIdx, index, updateTodoDto);

        if (response?.status !== 200) {
            alert(response?.data.message);
            return;
        }

        if (offModifyMode) {
            setModifyMode(false);
        }
    }

    const deleteTodo = async (): Promise<void> => {
        const response = await deleteTodoApi(todoGroupIdx, index);

        if (response?.status !== 200) {
            alert(response?.data.message);
            return;
        }

        if (reloadTodoList) {
            reloadTodoList(undefined, true);
        }

        setModifyMode(false);
    }

    const cancelAction = (): void => {
        setModifyMode(false);
    }

    return (
        <div
            className={emotionCss.todoItemCss(preview)}
        >
            <div className={emotionCss.checkboxWrap(preview)}>
                <input
                    type={"checkbox"}
                    defaultChecked={todoComplete}
                    onChange={(e) => {
                        updateTodo(e.target.checked);
                    }}
                />
            </div>
            {modifyMode ?
                <input
                    defaultValue={todoContent}
                    onChange={(e) => {
                        setTodoContent(e.target.value)
                    }}
                />
                :
                <div
                    className={emotionCss.content(todoComplete, preview)}
                    onClick={() => {
                        setModifyMode(true)
                    }}
                >
                    {todoContent}
                </div>
            }
            {modifyMode ?
                <div className={styles.buttonWrap}>
                    <div onClick={() => updateTodo(undefined, true)}>
                        <Image src={confirmImage} alt="적용버튼" width={34} height={34}/>
                    </div>
                    <div onClick={() => deleteTodo()}>
                        <Image src={deleteImage} alt="삭제버튼" width={34} height={34}/>
                    </div>
                    <div onClick={() => cancelAction()}>
                        <Image src={cancelImage} alt="취소버튼" width={34} height={34}/>
                    </div>
                </div>
                :
                ''
            }
        </div>
    )
}

export default TodoGroupItem
