export function getAllUsers(req, res, next) {
    // return console.log('Test getAllUsers Function');
    return res.status(200).json({message: "User fetched Successfully", success: "true"})
}

export function getUSerById(req, res, next) {
    return console.log('Test getUSerById Function');
}