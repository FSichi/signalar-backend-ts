import pkg from 'bcryptjs';
const { compareSync, compare, genSaltSync, hashSync } = pkg;

export const comparePassword = async ({ currentPassword, newPassword }) => {
    const passwordMatch = await compare(newPassword, currentPassword);
    return passwordMatch;
};

export const encryptPassword = (password) => {
    const salt = genSaltSync();
    return hashSync(password, salt);
};

export const checkValidPassword = ({ passwordProvided, passwordHashed }) => {
    const validPassword = compareSync(passwordProvided, passwordHashed);
    return validPassword;
}

export default {
    encryptPassword,
    comparePassword,
    checkValidPassword
};