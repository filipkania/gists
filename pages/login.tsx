import { useWrapper } from "@libs/WrapperContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";

import style from "@styles/pages/Login.module.scss";
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
		<>
			<Head>
				<title>Login - GistEditor</title>
			</Head>

			<motion.div
				className={style.container}
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
				<motion.input
					type="password"
					value={inputValue}
					placeholder={"Paste your token here."}
					disabled={!!inputValue}
					autoComplete="off"
					className={style.input}
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
		</>
	);
};

export default Login;
