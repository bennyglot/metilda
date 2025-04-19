
docker run --name redis-local -p 6379:6379 -d redis


echilov steps of thinkink:

1. read the task
2. read the task.
3. download resources.
4. take look on data, trying to connect the tables no connections.
5. read the task
6. understand the task.
7 add to result_lab new column patient_id to connect help from co pilot:
i got 2 csv:

admissions and lab result,
i notice that lab result missing column patient_id as we have in admissions.

first step i want you to add to lab result csv new column patient_id and add value from admissoins.csv, do it random with next rules,

max pateint id result 3,
in lab_result.csv there is column result_unit i want that this column will be unique for each pateint

didnt work as expected,

8. worte script that will do the job, in real work each one is lambda in step function. under script folder

9 install local redis docker and wsl windows issues.

10 create etl load data to redis in docker,

11 create express server with rest,

