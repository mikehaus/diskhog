Problem
My hard drive filled up today at home. I need to quickly purge some crap before my OS crashes.
Then in the office I see the NAS sitting under my desk has a red message about "exceeding threshold".
  
Solution
   a.txt         1 B         1           4,096 bytes	      4 KB	
   b.midi    4,000 B         1           4,096 bytes	      4 KB	
   c.zip     4,099 B         2           8,192 bytes	      8 KB	

Invocation Examples
/* start in current directory, sort alphabetically*/
/* display sizes in bytes, e.g., 10,000 B */
node diskHog --sort alpha
node diskHog -s alpha

/* root directory is c:/users,  display folders before files, with larger folders first, only output files with size on disk > a million bytes */
/* display sizes in metric,  e.g., 10,000 B becomes 10 KB */
node diskHog -p "c:/users" --sort -t 1 -m

/* start in current directory, size sort, output in "KB, MB" instead of B */
node diskHog -m
node diskHog --metric

/*only output help */
node diskHog -h
node diskHog --help
 
Example 
C:\dev\js> node diskhog --metric
(24.56 MB) .\
  (12 KB) dbs.json
  (4 KB) dbSpike.js
  (4 KB) diskhog.js
  (4 KB) dogDao.js
  (24.45 MB) node_modules\
    (120 KB) node_modules\.bin\
      (4 KB) node_modules\.bin\atob
      (4 KB) node_modules\.bin\atob.cmd
      (4 KB) node_modules\.bin\detect-libc
      (4 KB) node_modules\.bin\detect-libc.cmd
      (4 KB) node_modules\.bin\knex
      (4 KB) node_modules\.bin\knex.cmd
      (4 KB) node_modules\.bin\mkdirp
    (16 KB) node_modules\abbrev\
      (4 KB) node_modules\abbrev\abbrev.js
      (4 KB) node_modules\abbrev\LICENSE
      (4 KB) node_modules\abbrev\package.json
      (4 KB) node_modules\abbrev\README.md
    (1.08 MB) node_modules\ajv\
      (4 KB) node_modules\ajv\.tonic_example.js
      (528 KB) node_modules\ajv\dist\
        (268 KB) node_modules\ajv\dist\ajv.bundle.js
        (120 KB) node_modules\ajv\dist\ajv.min.js
        (140 KB) node_modules\ajv\dist\ajv.min.js.map
      (464 KB) node_modules\ajv\lib\

More Details

Out of Scope
Sad Path
Globbing and RegEx
hidden/system/linked files
hidden/system/linked directories
