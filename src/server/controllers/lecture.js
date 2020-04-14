import Lecture from '../models/lecture'

import {formatResponse, formatError} from '../api'

class LectureCtrl {
    /**
     * Get address details of the user
     * @param  {Object} req
     * @param  {Object} res
     * @return {JSON}
     */
    getLectureDetails (req, res) {
        let query = Lecture.find({})

        query.exec()
            .then(savedLecture => {
                res.json(formatResponse(savedLecture))
            })
            .catch(err => {
                res.status(400)
                res.json(formatError(err.message))
            })
    }
}

let lectureCtrl = new LectureCtrl()
export default lectureCtrl
