import fs from 'fs';

const ensureDataFolder = async () => {
	try {
		await fs.promises.mkdir('./data');
	} catch (err) {
		if (err.code !== 'EEXIST') {
			throw err;
		}
	}
};

const buildFilePath = (fileName) => `./data/${fileName}`;

export const createJsonFile = async (fileName, data) => {
	ensureDataFolder();
	await fs.promises.writeFile(
		buildFilePath(fileName),
		JSON.stringify(data, null, 2)
	);
};

export const readJsonFile = async (fileName) => {
	const data = await fs.promises.readFile(buildFilePath(fileName), 'utf8');
	return JSON.parse(data);
};
