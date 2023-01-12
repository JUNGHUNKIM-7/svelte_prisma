import type { ServerLoad } from '@sveltejs/kit';
import type { Actions } from './$types';
import { parseToObject, type Register } from '../util/helpers';
import { client } from '$lib/prisma_client/seed';

export const load = (async ({ params }) => {
    return {
        users: await client.user.findMany()
    };
}) satisfies ServerLoad;

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const user: Register = parseToObject(formData);
        delete user['password']
        await client.user.create({
            data: {
                ...user
            }
        });
    }
};
