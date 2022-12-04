var AUTH = 'AUTH',
{ signUp, signIn } = require('../api/index.js');

const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await signIn(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await signUp(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

module.exports = function () {
    signin;
    signup;
};
