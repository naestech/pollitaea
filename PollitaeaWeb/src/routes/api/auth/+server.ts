import { error, json, type RequestHandler } from '@sveltejs/kit';
import { SECRET } from '$env/static/private';
import { HttpCodes } from '$lib/constants';
import { supabase } from '$lib/supabaseClient';

/**
 * @alias Get api secret
 * @returns secret: encoded secret used to confirm requests
 */
export const GET = (() => {
	return json({
		secret: SECRET
	});
}) satisfies RequestHandler;

/**
 * @description Handle supabase user creation
 */
export const POST = (async ({ request }) => {
	const payload = await isValidAuthRequest(request);

	if (!payload) {
		throw error(HttpCodes.BADREQUEST, {
			code: HttpCodes.BADREQUEST,
			message: 'Invalid signup request'
		});
	}

	return supabase.auth.admin
		.createUser({
			email: payload.email,
			password: payload.password,
			phone: payload.phone,
			user_metadata: {
				username: payload.username
			}
		})
		.then((res) => {
			if (res.error?.status) {
				throw error(res.error.status || HttpCodes.BADREQUEST, {
					code: res.error.status || HttpCodes.BADREQUEST,
					message: res.error.message
				});
			} else if (res.data?.user) {
				return json(
					{
						username: res.data.user.user_metadata.username,
						created_at: res.data.user.created_at,
						email_confirm: res.data.user.email_confirmed_at != null
					},
					{ status: 201, statusText: 'Account Created' }
				);
			} else {
				throw error(HttpCodes.INTERNALERROR, {
					code: HttpCodes.INTERNALERROR,
					message: 'Error during account creation'
				});
			}
		})
		.catch((err) => {
			console.log(err);

			throw error(HttpCodes.INTERNALERROR, {
				code: HttpCodes.INTERNALERROR,
				message: 'Error during account creation'
			});
		});
}) satisfies RequestHandler;

/**
 * Validates sign up request
 * @param request
 * @returns result of auth validation
 */
const isValidAuthRequest = async (request: Request) => {
	const payload = await request.json();
	if (
		payload.secret !== SECRET ||
		payload.secret == null ||
		payload.email == null ||
		payload.username == null ||
		payload.password == null ||
		payload.phone == null
	) {
		return null;
	} else return payload;
};
