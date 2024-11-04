import Fastify from 'fastify';
const fastify = Fastify({
	logger: true,
});

import { createJsonFile, readJsonFile } from './fs.mjs';

fastify.get('/', async (request, reply) => {
	return { message: 'Welcome.' };
});

fastify.get('/create/:fileName', async (request, reply) => {
	const params = request.params; // Log all params
	console.log('Request Params:', params);

	const { fileName } = request.params;

	if (!fileName) {
		return reply.code(400).send({ message: 'Filename is missing!' });
	}

	console.log('fileName:', fileName);

	await createJsonFile(`${fileName}.json`, {
		message: 'Hello, Fastify with Docker!',
		date: new Date().toISOString(),
	});

	return { message: `File ${fileName}.json created` };
});

fastify.get('/read/:fileName', async (request, reply) => {
	const { fileName } = request.params;

	try {
		// Ensure file reading is awaited
		const data = await readJsonFile(`${fileName}.json`);

		// Return the data as JSON
		return { data };
	} catch (error) {
		// If there’s an error (e.g., file not found), handle it
		return reply
			.code(500)
			.send({ message: `Error reading file: ${error.message}` });
	}
});

// Start the server
const start = async () => {
	try {
		await fastify.listen({ port: 3000, host: '0.0.0.0' });
		fastify.log.info(`Server listening on http://localhost:3000`);
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};
start();
