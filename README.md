# My Command Line Utility - File System

## Summary
I implemented some of commands of File System:  
	  - **ls**      https://en.wikipedia.org/wiki/Ls  
	  - rm          https://en.wikipedia.org/wiki/Rm_(Unix)  
	  - rmdir       https://en.wikipedia.org/wiki/Rmdir  
	  - mkdir       https://en.wikipedia.org/wiki/Mkdir  
For ls command, I implemented following flags:  
	1.-l, --long : long format  
	2.-F, --suffix : Add Suffix  
	3.-t, --sortBymtime : sort the list of files by modification time  
	4.-s, --sortBysize : sort the list of files by size  
	5.-h, --humanreadable : print sizes in human readable format  
	6.path argument is not part of original UNIX ls command. In my version, it is optional parameter, if user does not pass path  argument, it will use current directory.  
	
	
## Usage:
1. Run `npm install`
2. ls: `node commands.js ls <flag> [path(optional)]`
3. rm: `node commands.js ls <filename>`
4. mkdir: `node commands.js mkdir <dirname>`
5. rmdir: `node commands.js rmdir <dirname>`
6. use following example commands on terminal:

## Examples:
```
For rm, rmdir, mkdir comands:
Test Case 1: 
$ node commands.js mkdir test_folder
Folder created...
$ node commands.js rm test.txt
successfully deleted test.txt
$ node commands.js rmdir test_folder
successfully remove test_folder
```
```
For ls command:  
Test Case 1: without any arguments

$ node commands.js ls 
README.md
commands.js
fileSystem.js
index.js
node_modules
package-lock.json
package.json
```

```
Test Case 2: with -l -h flag

$ node commands.js ls -l -h
1.5 KB 5/8/2019, 12:40:41 AM README.md
0.9 KB 5/8/2019, 12:42:46 AM commands.js
3.6 KB 5/8/2019, 12:48:40 AM fileSystem.js
0.1 KB 5/8/2019, 12:19:02 AM index.js
11.9 KB 5/7/2019, 11:40:39 PM node_modules
171.9 KB 5/7/2019, 11:26:54 PM package-lock.json
0.3 KB 5/7/2019, 11:27:00 PM package.json
```

```
Test Case 3: with -l -h -s flag  It will be sorted by detailed information

$ node commands.js ls -l -h -s
0.1 KB 5/8/2019, 12:19:02 AM index.js
0.3 KB 5/7/2019, 11:27:00 PM package.json
0.9 KB 5/8/2019, 12:42:46 AM commands.js
1.8 KB 5/8/2019, 12:49:44 AM README.md
3.6 KB 5/8/2019, 12:48:40 AM fileSystem.js
11.9 KB 5/7/2019, 11:40:39 PM node_modules
171.9 KB 5/7/2019, 11:26:54 PM package-lock.json
```

```
Test Case 4: with -l -h -t flag  It will be sorted by modification time with detailed information


$ node commands.js ls -l -h -t
171.9 KB 5/7/2019, 11:26:54 PM package-lock.json
0.3 KB 5/7/2019, 11:27:00 PM package.json
11.9 KB 5/7/2019, 11:40:39 PM node_modules
0.1 KB 5/8/2019, 12:19:02 AM index.js
0.9 KB 5/8/2019, 12:42:46 AM commands.js
3.6 KB 5/8/2019, 12:48:40 AM fileSystem.js
2.0 KB 5/8/2019, 12:50:54 AM README.md
```

```
Test Case 5: with -h -F flag 

$ node commands.js ls -h -F 
2.3 KB README.md 
0.9 KB commands.js 
3.6 KB fileSystem.js 
0.1 KB index.js 
11.9 KB node_modules /
171.9 KB package-lock.json 
0.3 KB package.json 
```





