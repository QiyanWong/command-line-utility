const program = require('commander');

const {
	ls,
	rm,
	mkdir,
	rmdir,
} = require('./fileSystem');

program 
	.version('1.0.0')
	.description('My Command Line Utility')

program
	.command('ls [path]')
	.description('List all files')
	.option('-l, --long','long format')
	.option('-F, --suffix','Add Suffix')
	.option('-t, --sortBymtime','sort the list of files by modification time')
	.option('-s, --sortBysize','sort the list of files by size')
	.option('-h, --humanreadable','print sizes in human readable format')
	.action(ls)

program
	.command('rm <filename>')
	.description('Remove files')
	.action((filename) => {
		rm(filename);
	});

program
	.command('rmdir <dircname>')
	.description('List all files in current dirctory')
	.action((dircname) => {
		rmdir(dircname);
	});
	
program
	.command('mkdir <dircname>')
	.description('Make dirctory')
	.action((dircname) => {
		mkdir(dircname);
	});
program.parse(process.argv);
