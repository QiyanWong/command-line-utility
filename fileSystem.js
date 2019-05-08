const fs = require('fs');

const ls = (path, options) => {
	var curPath;
	//check if user enter a customized path otherwise it will use current directory (__dirname)
	if (path) curPath = path;
	else curPath = __dirname;
	//read files information
	fs.lstat(curPath, (err, stats) => {
		if (err) console.log(err)
		//check if it is a directory
		else if (stats.isDirectory()) {
			fs.readdir(curPath, (err, items) => {
				var result = [];
				for (let i = 0; i < items.length; i++) {
					var dirname = curPath + '/' + items[i];
					const stats = fs.lstatSync(dirname)
					stats.name = items[i];
					var suffix = "";
					// -F  '/' for a directory. Regular files have no suffix.
					if(stats.isDirectory()) suffix = "/"
					stats.suffix = suffix;
					result.push(stats);
				}
				// -t sort the list of files by modification time.
				if (options.sortBymtime) {
					result.sort((a, b) => {
						if (a.mtimeMs === b.mtimeMs) return 0;
						if (a.mtimeMs < b.mtimeMs) return -1;
						return 1;
					});
				}
				// -s sort the list of files by size.
				if (options.sortBysize) {
					result.sort((a, b) => {
						if (a.size === b.size) return 0;
						if (a.size < b.size) return -1;
						return 1;
					});
				}
				// -h print sizes in human readable format
				if (options.humanreadable) {
					for (item of result) {
						item.size = getReadableFileSizeString(item.size);
					}
				}
				//pre process
				result = preprocess(result, options);
				//print the result
				for (item of result) {
					console.info(...Object.values(item));
				}
				return result;
			});
		}
		else {
			console.log(`${curPath} is not a valid directory`);
		}
	});
	
}

function preprocess(arr, options) {
	var result = [];
	for(item of arr){
		var obj = {};
		// -l long format
		if(options.long){
			obj.size = item.size;
			obj.metime = item.mtime.toLocaleString();
		}
		// -h print sizes in human readable format
		if(options.humanreadable) {
			obj.size = item.size;
		}
		// -F  '/' for a directory. Regular files have no suffix.
		obj.name = item.name;
		if(options.suffix) {
			obj.suffix = item.suffix;
		}
		result.push(obj);
	}
	return result;
}

function getReadableFileSizeString(fileSizeInBytes) {
    var i = -1;
    var byteUnits = [' KB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
    do {
        fileSizeInBytes = fileSizeInBytes / 1024;
        i++;
    } while (fileSizeInBytes > 1024);

    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
};

//remove file
const rm = (filename) => {
	fs.lstat(filename, (err, stats) => {
		if (err) return console.log(err); //Handle error
		if (stats.isFile()) {
			fs.unlink(filename, (err) => {
				if (err) {
					if (err.code === 'ENOENT') console.log(`${filename} no such file`)
					else throw err;
				}
				console.log(`successfully deleted ${filename}`);
			});
		}
		else {
			console.log(`${filename} is not a valid file`);
		}
	});
}

//make directory
const mkdir = (filename) => {
	fs.mkdir(filename, {}, (err) => {
		if (err) {
			if (err.code === 'EEXIST') console.log("Folder already exists")
			else if (err.code === 'ENOENT') console.log("No such path")
			else return console.log(err);
		}
		else console.log('Folder created...');
	});
}

//remove directory
const rmdir = (dircname) => {
	fs.lstat(dircname, (err, stats) => {
		if (err) return console.log(err); //Handle error
		if (stats.isDirectory()) {
			fs.rmdir(dircname, (err) => {
				if (err) {
					if (err.code === 'ENOENT') console.log(`${dircname} no such directory`)
					else throw err;
				}
				console.log(`successfully remove ${dircname}`);
			});
		}
		else {
			console.log(`${dircname} is not a valid directory`);
		}
	});
}

module.exports = {
	ls,
	rm,
	mkdir,
	rmdir,
}