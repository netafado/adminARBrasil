import {Auth} from "aws-amplify"
// Add the Firebase products that you want to use




  /**
   * Handle the error
   * @param {*} error
   */
const  _handleError =(error) => {
    // var errorCode = error.code;
    var errorMessage = error.message;
    return errorMessage;
}


export const getCurrentUser = () =>{
  return new Promise((resolve, reject) =>{
    Auth.currentAuthenticatedUser()
        .then(user => resolve(user), 
        error => reject(_handleError(error)
        ))
  })
}


export const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    Auth
      .signIn(email, password)
      .then(
        user => {
          resolve(user);
        },
        error => {
          reject(_handleError(error));
        }
      );
  });
};

export const logout = () => {
  return new Promise((resolve, reject) => {
    Auth
      .signOut()
      .then((data) => {
        console.log("lig out", data)
        resolve(true);
      })
      .catch(error => {
        reject(_handleError(error));
      });
  });
};


