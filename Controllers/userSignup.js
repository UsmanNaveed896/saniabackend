import bcryptjs from 'bcryptjs';
import Model from '../Models/Model';


const userSignUp = (req, res, next) => {
	const {  name,password, email } = req.body;


    // console.log(req.body);
         
    // console.log('password',password);
	bcryptjs.hash(password, 10).then((hashedpassword) => {
		// console.log(hashedpassword);
		const User = new Model.UserModel({
			name,
			password:hashedpassword,
			email,

			userType: 'user',
		});
		console.log(User);
		User.save()
			.then((SavedUser) => {
				console.log(SavedUser);
				return res.status(200).send({
					Message: 'Account Created Successfully.',
					
				});
			});
		})
			.catch((err) => {
				res.status(500);
				next(
					new Error(
						`Unable to Create User. Please Try later. ${err}`,
					),
				);
			});
	
};

export default userSignUp;
