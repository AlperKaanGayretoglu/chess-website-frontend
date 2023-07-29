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
	emailValidation,
	passwordValidation,
	usernameValidation,
} from "../utils/authenticationValidation";

import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { RegisterForm } from "../data/api";
import { register } from "../services/authenticationApi";
import { PrimaryButton } from "../styles/components/Button/Button";
import MailInput from "../styles/components/Input/MailInput";
import PasswordInput from "../styles/components/Input/PasswordInput";
import TextInput from "../styles/components/Input/TextInput";
import { TextLink } from "../styles/components/Link/TextLink";
import General from "../styles/layouts/General/General";
import { redirectUser } from "../utils/checkUser";
import { promiseToast } from "../utils/promiseToast";

const Register = () => {
	const router = useRouter();

	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<RegisterForm>({
		resolver: yupResolver(
			yup.object({
				username: usernameValidation,
				email: emailValidation,
				password: passwordValidation,
			})
		),
		reValidateMode: "onSubmit",
	});

	const registerWithCredentials: SubmitHandler<FieldValues> = async (form) => {
		if (form.username && form.email && form.password) {
			const res = await promiseToast(
				register({
					username: form.username,
					email: form.email,
					password: form.password,
				}),
				"register_login_logout_toast_id",
				"Register Successful",
				"Register Failed"
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
					<Title>Register</Title>
					<Form
						id="chess_website_register_form"
						onSubmit={handleSubmit(registerWithCredentials)}
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
						<PrimaryButton type="submit">Register</PrimaryButton>
						<TextLink href="/login">Already have an account?</TextLink>
					</Form>
				</AuthenticationContainer>
			</AuthenticationBase>
		</General>
	);
};

export default Register;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return redirectUser(ctx) ?? { props: {} };
}
