import { PrismaClient } from '@prisma/client';

export const client = new PrismaClient();

async function main() {
	await client.$connect();
	// await client.user.create({
	// 	data: {
	// 		name: 'Rich',
	// 		email: 'hello@prisma.com',
	// 		posts: {
	// 			create: {
	// 				title: 'My first post',
	// 				body: 'Lots of really interesting stuff',
	// 				slug: 'my-first-post'
	// 			}
	// 		}
	// 	}
	// });

	// await client.post.deleteMany()
	// await client.user.deleteMany()
}

main()
	.then(async () => {
		await client.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await client.$disconnect();
		process.exit(1);
	});
