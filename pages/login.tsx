import * as yup from "yup";

import {
	Controller,
	FieldValues,
	SubmitHandler,
	useForm,
} from "react-hook-form";
import {
	Form,
	LoginBase,
	LoginContainer,
	Title,
} from "../styles/pages/Login/Login.style";
import { emailValidation, passwordValidation } from "../utils/loginValidation";

import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { login } from "../services/userApi";
import { PrimaryButton } from "../styles/components/Button/Button";
import MailInput from "../styles/components/Input/MailInput";
import PasswordInput from "../styles/components/Input/PasswordInput";
import General from "../styles/layouts/General/General";
import { redirectUser } from "../utils/checkUser";
import { promiseToast } from "../utils/promiseToast";

export type LoginForm = {
	email: string;
	password: string;
};

const Login = () => {
	const router = useRouter();

	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<LoginForm>({
		resolver: yupResolver(
			yup.object({
				email: emailValidation,
				password: passwordValidation,
			})
		),
		reValidateMode: "onSubmit",
	});

	const signinWithCredentials: SubmitHandler<FieldValues> = async (form) => {
		if (form.email && form.password) {
			const res = await promiseToast(
				login({ email: form.email, password: form.password }),
				"login_logout_toast_id",
				"Login Successful",
				"Login Failed"
			);

			if (res && res.token) {
				router.push("/");
			}
		}
	};

	return (
		<General>
			<LoginBase>
				<LoginContainer>
					<Title>Login</Title>
					<Form
						id="chess_website_login_form"
						onSubmit={handleSubmit(signinWithCredentials)}
					>
						<Controller
							name={"email"}
							defaultValue=""
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<MailInput
									label={"E-mail"}
									error={Boolean(errors.email)}
									helperText={errors.email?.message}
									{...field}
								/>
							)}
						/>
						<Controller
							name={"password"}
							defaultValue=""
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<PasswordInput
									label={"Password"}
									error={Boolean(errors.password)}
									helperText={errors.password?.message}
									{...field}
								/>
							)}
						/>
						<PrimaryButton type="submit">Login</PrimaryButton>
					</Form>
				</LoginContainer>
			</LoginBase>
		</General>
	);
};

export default Login;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return redirectUser(ctx) ?? { props: {} };
}
