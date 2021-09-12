
import { Request, Response } from 'express';
import { findCourseById } from './db-data';


export function saveCourse(req: Request, res: Response) {

  const id = req.params["id"],
    changes = req.body;

  

  const course = findCourseById(id);

  course.titles = changes.titles;

  res.status(200).json(course);

}

