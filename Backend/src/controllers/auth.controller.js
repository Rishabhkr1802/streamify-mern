export function signup(req, res, next) {
    return console.log('Signup controller');
}

export function login(req, res, next) {
    const { email, password } = req.body;
    console.log(email)
    console.log(password)

    if(!email || !password) {
        return res.status(200).json({success: false, message: "Email & Password are required"})
    }
    return res.status(200).json({success: true, message: "Login successfully!!!"})
}

export function logout(req, res, next) {
    return console.log('Logout controller');
}