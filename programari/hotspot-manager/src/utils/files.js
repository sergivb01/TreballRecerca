const path = require('path')

const getFile = (fileName) => {
	return path.resolve(`static/${fileName}.html`)
}

const getFileExtension = (file) => {
	return path.extname(file)
}

module.exports = {
	getFile
}