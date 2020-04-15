import User from '../models/user'
import {formatResponse,formatError} from '../api'

class UserCtrl{
    /**
     * Get address details of the user
     * @param {Object} req 
     * @param {Object} res 
     */
    getUserAddresses(req,res){
        let query=User.findOne({})
        query.exec()
        .then(savedUser=>{
            res.json(formatResponse(savedUser))
        })
        .catch(err=>{
            res.status(400)
            res.json(formatError(err.message))
        })
    }

        /**
     * Set address details of the user
     * @param  {Object} req
     * @param  {Object} res
     * @return {JSON}
     */
    setUserAddresses (req, res) {
        let userId = req.body.userId
        let user

        const data = {
          location: req.body.location,
          university: req.body.university,
        }

        if (userId === '') {
            // create a new user if not already exists
            user = User(data).save()
        } else {
            // update existing user
            user = User.findOneAndUpdate({_id: userId}, data).exec()
        }

        user.then(savedUser => {
                res.json(formatResponse({
                    message: 'User details saved successfully'
                }))
            })
            .catch(err => {
                res.status(400)
                res.json(formatError(err.message))
            })
    }
}

let userCtrl = new UserCtrl()
export default userCtrl