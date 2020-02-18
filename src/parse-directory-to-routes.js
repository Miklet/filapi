const fs = require('fs');
const path = require('path');

function parseDirectoryToRoutes(directory) {
	const resultRoutes = parseDirectoryToRoutesRecursively(directory);
	return resultRoutes;
}

function parseDirectoryToRoutesRecursively(
	baseDirectory,
	currentDirectory = '',
) {
	const routes = [];

	const filesNames = fs.readdirSync(
		path.resolve(baseDirectory, currentDirectory),
	);

	const filesFullPaths = filesNames.map(fileName =>
		path.resolve(baseDirectory, currentDirectory, fileName),
	);

	filesFullPaths.forEach((routePath, index) => {
		if (!fs.statSync(routePath).isDirectory()) {
			const handler = require(routePath);

			const {path, method} = parseFilename(filesNames[index]);

			routes.push({
				path: createPath(currentDirectory, path),
				method,
				handler,
			});
		} else {
			const nextDirectoryToParse = routePath
				.split(path.sep)
				.slice(-1)
				.join('');

			const nestedRoutes = parseDirectoryToRoutesRecursively(
				currentDirectory
					? path.join(currentDirectory, nextDirectoryToParse)
					: nextDirectoryToParse,
			);

			routes.push(...nestedRoutes);
		}
	});

	return routes;
}

function parseFilename(filename) {
	let [path, method] = filename.split('.');

	if (path === 'index') {
		path = '';
	}

	path = '/' + path;

	return {
		path,
		method: method.toUpperCase(),
	};
}

function createPath(directory, path) {
	// add base path fragment
	let result = '/api';

	// if we are in root directory currently we skip adding it to result path
	result += directory.length > 0 ? '/' + directory : '';

	// finally we add path parsed from filename
	result += path;

	result = convertDynamicParams(result);

	return ensureNoTrailingSlash(result);
}

function ensureNoTrailingSlash(path) {
	return path.split('/').length > 2 && path.endsWith('/')
		? path.slice(0, -1)
		: path;
}

function convertDynamicParams(path) {
	const result = path
		.split('')
		.map(character => {
			switch (character) {
				case '[':
					return ':';
				case ']':
					return '';
				default:
					return character;
			}
		})
		.join('');

	return result;
}

module.exports = {
	parseDirectoryToRoutes,
};
