import {FunctionComponent} from "react";
import * as styles from "../../../styles/common/Common.style";
import Image from "next/image";
import logoImage from "../../../public/violet.png";

const Footer: FunctionComponent = () => {
    return (
        <footer css={styles.footer}>
            <a
                href="https://github.com/kmuu011/NextJS_Boilerplate"
                target="_blank"
                rel="noopener noreferrer"
            >
                Made by {' '}
                <span css={styles.logo}>
                    <Image src={logoImage} alt="Violet Logo" width={"44"} height={"44"}/>
                </span>
            </a>
        </footer>
    )
}

export default Footer
