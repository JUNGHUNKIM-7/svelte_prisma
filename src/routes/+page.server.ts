import { error, type ServerLoad } from '@sveltejs/kit';
import type { Actions } from './$types';
import { parseToObject, type Login, type Register } from '../util/helpers';
import { client } from '$lib/prisma_client/seed';

export const load = (async ({ params }) => {
	return { user: true };
}) satisfies ServerLoad;

export const actions: Actions = {
	register: async ({ request }) => {
		const formData = await request.formData();
		const user: Register = parseToObject(formData);
		delete user['password'];
		await client.user.create({
			data: {
				...user
			}
		});
	},

	login: async ({ request }) => {
		const formData = await request.formData();
		const user: Login = parseToObject(formData);
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
