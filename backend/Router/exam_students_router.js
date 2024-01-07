import express from 'express';
import { getExamStudents, createExamStudents, deleteExamStudents } from '../controller/exam_students';
import { urlencoded } from 'body-parser';

const exam_students_router = express.Router();

exam_students_router
    .get('/:exam_id', (req, res) => {
        const exam_id = req.params.exam_id;
        getExamStudents(exam_id)
            .then(result => {
                if (result) {
                    res.status(201).json(result);
                }
                else {
                    res.status(400).send('Error 400: bad request!');
                }
            })
            .catch(err => res.status(500).json(err));

    })
    .post('/', urlencoded, (req, res) => {
        const exam_id = req.body.exam_id;
        const student_id = req.body.student_id;
        createExamStudents(exam_id, student_id)
            .then(result => {
                if (result) {
                    res.status(201).json(result);
                }
                else {
                    res.status(400).send('Error 400: bad request!');
                }
            })
            .catch(err => res.status(500).json(err));
    })
    .delete('/:exam_student_id', (req, res) => {
        const exam_student_id = req.params.exam_id;

        deleteExamStudents(exam_student_id)
            .then(result => {
                if (result) {
                    res.status(201).json(result);
                }
                else {
                    res.status(400).send('Error 400: bad request!');
                }
            })
            .catch(err => res.status(500).json(err));
    })