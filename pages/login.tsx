import { useWrapper } from "@libs/WrapperContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "@styles/pages/Login.module.scss";

import { motion, Variants } from "framer-motion";

const variants: Variants = {
	failed: {
		x: -10,
		transitionEnd: {
			x: 0,
		},
		transition: {
			stiffness: 1000,
			damping: 15,
		},
	},
	success: {
		opacity: 0,
		transition: {
			delay: 0.5,
		},
	},
};

const Login = () => {
	const { wrapper, changeToken, loading } = useWrapper();
	const router = useRouter();

	const [inputValue, setInputValue] = useState("");
	const [verificationStatus, setVerificationStatus] = useState<string>("");

	useEffect(() => {
		if (!loading && wrapper?.token && !inputValue) router.push("/");
	}, [loading, wrapper?.token]);

	return (
		<div className={styles.wrapper}>
			<Head>
				<title>Login - GistEditor</title>
			</Head>

			<motion.div
				variants={variants}
				animate={verificationStatus}
				onAnimationComplete={() => {
					if (verificationStatus === "failed") {
						setVerificationStatus("");
						setInputValue("");
					} else if (verificationStatus === "success") {
						router.push("/");
					}
				}}
			>
				<input
					type="password"
					value={inputValue}
					placeholder={"Token"}
					id="loginInput"
					disabled={!!inputValue}
					className={styles.input}
					autoComplete="off"
					onChange={(e) => {
						const { value } = e.target;

						if (value.match(/ghp_[A-Za-z0-9_]{20,255}/g)) {
							setInputValue(value);
							changeToken(value).then((r) => {
								setVerificationStatus(r ? "success" : "failed");
							});
						}
					}}
				/>
			</motion.div>
		</div>
	);
};

export default Login;
