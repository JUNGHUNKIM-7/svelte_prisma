import { error, type ServerLoad } from '@sveltejs/kit';
import type { Actions } from './$types';
import parseToObject, { type Login, type Register } from '$lib/util/helpers';
import { client } from '$lib/util/seed';

export const load = (async ({ params }) => {
	return { user: true };
}) satisfies ServerLoad;

export const actions: Actions = {
	register: async ({ request }) => {
		const formData = await request.formData();
		const user = parseToObject<Register>(formData);
		delete user['password'];
		await client.user.create({
			data: {
				...user
			}
		});
		return { success: 'true' };
	},

	login: async ({ request }) => {
		const formData = await request.formData();
		const user = parseToObject<Login>(formData);
		delete user['password'];
		const found = await client.user.findUnique({
			where: {
				email: user.email
			}
		});
		if (!found) {
			throw error(404, {
				message: 'user not found'
			});
		}
		return { success: 'true' };
	}
};
