import type {NextPage} from 'next';
import * as styles from '../styles/Home.style';
import {FormEventHandler, useRef, useState} from "react";
import SetHead from "../src/component/common/Head";
import {loginApi} from "../src/api/member";
import Link from "next/link";
import {goToPage} from "../src/utils/utils";
import {AxiosResponse} from "axios";

const Home: NextPage = () => {
    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [keepCheck, setKeepCheck] = useState<boolean>(false);

    const idInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const login: FormEventHandler = async (e): Promise<void> => {
        e.preventDefault();

        if(id.replace(/\s/g, '') === ''){
            alert('아이디를 입력해주세요.');
            idInputRef.current?.focus();
            return;
        }

        if(id.replace(/\s/g, '').length < 3){
            alert('아이디는 3글자 이상 입력해야합니다.');
            idInputRef.current?.focus();
            return;
        }

        if(password.replace(/\s/g, '') === ''){
            alert('비밀번호를 입력해주세요.');
            passwordInputRef.current?.focus();
            return;
        }

        const result: AxiosResponse | undefined = await loginApi({id, password, keepCheck});

        if (result?.status !== 200) {
            alert(result?.data.message);
            return;
        }

        localStorage.setItem('token-code', result.data.tokenCode);

        goToPage('/todoGroup');
    };

    return (
        <div className={styles.container}>
            <SetHead/>

            <div className={styles.title}>가계부</div>

            <div className={styles.titleDesc}>
                로그인
            </div>

            <form onSubmit={login}>
                <div className={styles.idDiv}>
                    <input ref={idInputRef} type="text" value={id} id="id" placeholder="아이디"
                           onChange={(e) => setId(e.target.value)} />
                </div>

                <div className={styles.passwordDiv}>
                    <input ref={passwordInputRef} type="password" value={password} id="password" placeholder="비밀번호"
                           onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className={styles.keepLoginDiv}>
                    <input type={"checkbox"} id={"cb"} defaultChecked={keepCheck}
                           onChange={(e) => setKeepCheck(e.target.checked)} />
                    <label htmlFor={"cb"}>
                        <div className={styles.keepLoginLabel}>
                            로그인 상태 유지
                        </div>
                    </label>
                </div>

                <div className={styles.buttonDiv}>
                    <button>로그인</button>
                </div>
            </form>

            <div className={styles.buttonDiv}>
                <Link href={'/signUp'}>
                    <button>회원가입</button>
                </Link>
            </div>
        </div>
    )
}

export default Home;
