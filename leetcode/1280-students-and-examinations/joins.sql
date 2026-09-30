-- LeetCode 1280. Students and Examinations —
-- https://leetcode.com/problems/students-and-examinations/
-- For every student and every subject, count how often the student took
-- that subject's exam, 0 included; order by student_id, then subject_name.
--
-- Joins: CROSS JOIN pairs every student with every subject, one row per
-- pair, whether or not any exam was taken. LEFT JOIN then attaches the
-- pair's exams and keeps the pairs that have none. COUNT of an Examinations
-- column counts only attached rows, so those pairs get 0, where COUNT(*)
-- would count the unmatched row itself and give 1.
--
-- student_name is grouped too. Selecting a column that is neither grouped
-- nor aggregated is not standard SQL: PostgreSQL, and MySQL in its default
-- ONLY_FULL_GROUP_BY mode, accept it only when student_id is a declared
-- primary key; SQLite always accepts it. test_joins.py runs this query with
-- Python's sqlite3.
--
-- Learning source: https://leetcode.cn/problems/students-and-examinations/solutions/80906/san-biao-lian-he-cha-xun-cross-join-left-join-by-s/

SELECT s.student_id, s.student_name, sub.subject_name, COUNT(e.subject_name) AS attended_exams
FROM Students s
CROSS JOIN Subjects sub
LEFT JOIN Examinations e
  ON e.student_id = s.student_id AND e.subject_name = sub.subject_name
GROUP BY s.student_id, s.student_name, sub.subject_name
ORDER BY s.student_id, sub.subject_name
