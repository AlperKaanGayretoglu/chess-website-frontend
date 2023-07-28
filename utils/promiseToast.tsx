import { toast } from "react-hot-toast";

export async function promiseToast(
	promise: Promise<any>,
	toast_id: string = "default_toast_id",
	default_success_message: string = "Success",
	default_error_message: string = "Something Went Wrong"
) {
	try {
		toast.loading("Loading...", { id: toast_id });

		const res = await promise;

		if (!res || !res.message) {
			toast.success(default_success_message, { id: toast_id });
			return res;
		}

		toast.error(res.message, { id: toast_id });
		return res;
	} catch (error) {
		toast.error(default_error_message, { id: toast_id });
		return error;
	}
}
