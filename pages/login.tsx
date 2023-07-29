import * as yup from "yup";

import {
	Controller,
	FieldValues,
	SubmitHandler,
	useForm,
} from "react-hook-form";
import {
	AuthenticationBase,
	AuthenticationContainer,
	Form,
	Title,
} from "../styles/layouts/Authentication/Authentication.style";
import {
	passwordValidation,
	usernameValidation,
} from "../utils/authenticationValidation";

import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { LoginForm } from "../data/api";
import { login } from "../services/authenticationApi";
import { PrimaryButton } from "../styles/components/Button/Button";
import PasswordInput from "../styles/components/Input/PasswordInput";
import TextInput from "../styles/components/Input/TextInput";
import { TextLink } from "../styles/components/Link/TextLink";
import General from "../styles/layouts/General/General";
import { redirectUser } from "../utils/checkUser";
import { promiseToast } from "../utils/promiseToast";

const Login = () => {
	const router = useRouter();

	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<LoginForm>({
		resolver: yupResolver(
			yup.object({
				username: usernameValidation,
				password: passwordValidation,
			})
		),
		reValidateMode: "onSubmit",
	});

	const signinWithCredentials: SubmitHandler<FieldValues> = async (form) => {
		if (form.username && form.password) {
			const res = await promiseToast(
				login({ username: form.username, password: form.password }),
				"register_login_logout_toast_id",
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
			<AuthenticationBase>
				<AuthenticationContainer>
					<Title>Login</Title>
					<Form
						id="chess_website_login_form"
						onSubmit={handleSubmit(signinWithCredentials)}
					>
						<Controller
							name={"username"}
							defaultValue=""
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<TextInput
									label={"Username"}
									error={Boolean(errors.username)}
									helperText={errors.username?.message}
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
						<TextLink href="/register">Not yet have an account?</TextLink>
					</Form>
				</AuthenticationContainer>
			</AuthenticationBase>
		</General>
	);
};

export default Login;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return redirectUser(ctx) ?? { props: {} };
}
