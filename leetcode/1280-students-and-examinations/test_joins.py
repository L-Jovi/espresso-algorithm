"""Run joins.sql with Python's sqlite3, on LeetCode's example and on random tables."""

import random
import sqlite3
import unittest
from collections import Counter
from pathlib import Path

QUERY = (Path(__file__).resolve().parent / "joins.sql").read_text()


def run_query(students, subjects, exams):
    db = sqlite3.connect(":memory:")
    db.execute("CREATE TABLE Students (student_id INTEGER PRIMARY KEY, student_name TEXT)")
    db.execute("CREATE TABLE Subjects (subject_name TEXT PRIMARY KEY)")
    db.execute("CREATE TABLE Examinations (student_id INTEGER, subject_name TEXT)")
    db.executemany("INSERT INTO Students VALUES (?, ?)", students)
    db.executemany("INSERT INTO Subjects VALUES (?)", [(name,) for name in subjects])
    db.executemany("INSERT INTO Examinations VALUES (?, ?)", exams)
    return db.execute(QUERY).fetchall()


def expected_rows(students, subjects, exams):
    """Count in Python: every (student, subject) pair, sorted like ORDER BY."""
    taken = Counter(exams)
    return [(sid, name, subject, taken[(sid, subject)])
            for sid, name in sorted(students) for subject in sorted(subjects)]


class StudentsAndExaminationsTests(unittest.TestCase):
    def test_example(self):
        students = [(1, "Alice"), (2, "Bob"), (13, "John"), (6, "Alex")]
        subjects = ["Math", "Physics", "Programming"]
        exams = [(1, "Math"), (1, "Physics"), (1, "Programming"), (2, "Programming"), (1, "Physics"), (1, "Math"),
                 (13, "Math"), (13, "Programming"), (13, "Physics"), (2, "Math"), (1, "Math")]
        rows = run_query(students, subjects, exams)
        self.assertEqual(len(rows), 12)
        self.assertEqual(rows[:3], [(1, "Alice", "Math", 3), (1, "Alice", "Physics", 2), (1, "Alice", "Programming", 1)])
        self.assertEqual(rows[6:9], [(6, "Alex", "Math", 0), (6, "Alex", "Physics", 0), (6, "Alex", "Programming", 0)])
        self.assertEqual(rows, expected_rows(students, subjects, exams))

    def test_random_tables(self):
        rng = random.Random(1280)
        for _ in range(200):
            ids = rng.sample(range(1, 50), rng.randint(0, 5))
            students = [(sid, f"student{sid}") for sid in ids]
            subjects = rng.sample(["Art", "Math", "Music", "Physics"], rng.randint(0, 4))
            exams = [(rng.choice(ids), rng.choice(subjects)) for _ in range(rng.randint(0, 12))] if ids and subjects else []
            with self.subTest(students=students, subjects=subjects, exams=exams):
                self.assertEqual(run_query(students, subjects, exams), expected_rows(students, subjects, exams))


if __name__ == "__main__":
    unittest.main()
