import type {NextPage} from 'next';
import * as styles from '../../styles/SignUp.style';
import {BaseSyntheticEvent, FormEventHandler, useMemo, useRef} from "react";
import SetHead from "../../src/component/common/Head";
import {duplicateCheckApi, signUpApi} from "../../src/api/member";
import _ from "lodash";
import {SignUpDto} from "../../src/interface/dto/member";
import Link from "next/link";
import {goToPage} from "../../src/utils/utils";
import {AxiosResponse} from "axios";
import {keyDescription} from "../../src/const/keyDescription";

const rules = {
    id: /^[0-9a-zA-Z]*$/i,
    nickname: /^[0-9a-zA-Z가-힣]*$/i,
    email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
}

const Index: NextPage = () => {
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordCheckRef = useRef<HTMLInputElement>(null);

    const typingCheck = (e: BaseSyntheticEvent) => {
        e.persist();

        debounceHandler(e.target.id, e.target);
    }

    const debounceHandler = useMemo(() =>
        _.debounce(async (id: string, e: HTMLInputElement) => {
            if ((/^id$|^nickname$|^email$/).test(id)) {
                await duplicateCheck(id, e);
            } else {
                if (!(passwordRef?.current && passwordCheckRef?.current)) return;
                const passwordIsSame: boolean = passwordRef.current.value === passwordCheckRef.current.value;

                passwordRef.current.style.borderColor = passwordIsSame ? 'green' : 'red';
                passwordCheckRef.current.style.borderColor = passwordIsSame ? 'green' : 'red';
            }
        }, 400), []
    );

    const duplicateCheck = async (id: string, e: HTMLInputElement) => {
        const result: AxiosResponse | undefined = await duplicateCheckApi({
            type: Object.keys(rules).indexOf(id),
            value: e.value
        });

        e.style.borderColor = result?.data.result ? 'green' : 'red';

        return result?.data.result;
    }

    const signUp: FormEventHandler = async (e: BaseSyntheticEvent): Promise<void> => {
        e.preventDefault();

        const divList: Element[] = e.target.children;
        const inputList: Element[] = [];
        const signUpDto: SignUpDto = {
            id: '',
            nickname: '',
            email: '',
            password: ''
        };

        for (const div of divList) {
            if (div.children[1]?.tagName !== 'INPUT') continue;
            inputList.push(div.children[1]);
        }

        for (const input of inputList as HTMLInputElement[]) {
            const inputValue = input.value;
            const inputId: keyof SignUpDto = input.id as keyof SignUpDto;

            if (inputValue.toString().replace(/\s/g, '') === '') {
                alert('입력하지 않은 항목이 있습니다');
                input.focus();
                return;
            }

            signUpDto[inputId] = inputValue;

            if (
                inputId === 'id' ||
                inputId === 'nickname' ||
                inputId === 'email'
            ) {
                if (!rules[inputId].test(inputValue)) {
                    alert('입력값이 올바르지 않습니다.');
                    input.focus();
                    return;
                }

                const duplicateCheckResult: boolean = await duplicateCheck(inputId, input);

                if (!duplicateCheckResult) {
                    alert(`이미 존재하는 ${keyDescription[inputId]} 입니다.`);
                    input.focus();
                    return;
                }
            }
        }

        if (signUpDto.password !== signUpDto.passwordCheck) {
            alert('비밀번호와 비밀번호 확인이 서로 일치하지 않습니다.');
            return;
        }

        delete signUpDto.passwordCheck;

        const signUpResult = await signUpApi(signUpDto);

        if (signUpResult?.status !== 201) {
            alert(signUpResult?.data.message);
            return;
        }

        alert('회원가입이 완료되었습니다.\n로그인 페이지로 돌아갑니다.');
        goToPage('/');
    };


    return (
        <div className={styles.container}>
            <SetHead/>

            <div className={styles.title}>회원가입</div>

            <form onSubmit={signUp}>
                <div className={styles.dataDiv}>
                    <div>아이디</div>
                    <input type="text" id="id" placeholder="아이디"
                           onChange={(e) => typingCheck(e)}/>
                </div>

                <div className={styles.dataDiv}>
                    <div>닉네임</div>
                    <input type="text" id="nickname" placeholder="닉네임"
                           onChange={(e) => typingCheck(e)}/>
                </div>

                <div className={styles.dataDiv}>
                    <div>이메일</div>
                    <input type="text" id="email" placeholder="이메일"
                           onChange={(e) => typingCheck(e)}/>
                </div>

                <div className={styles.dataDiv}>
                    <div>비밀번호</div>
                    <input type="password" id="password"
                           ref={passwordRef}
                           onChange={(e) => typingCheck(e)}
                           placeholder="비밀번호"/>
                </div>

                <div className={styles.dataDiv}>
                    <div>비밀번호 확인</div>
                    <input type="password" id="passwordCheck"
                           ref={passwordCheckRef}
                           onChange={(e) => typingCheck(e)}
                           placeholder="비밀번호 확인"/>
                </div>

                <div className={styles.buttonDiv}>
                    <button>회원가입</button>
                </div>
            </form>

            <div className={styles.buttonDiv}>
                <Link href={"/"}>
                    <button>메인으로</button>
                </Link>
            </div>
        </div>
    )
}

export default Index
