export const SERVER_RESPONSE_CONSTANTS = {
  SERVER_ERROR_STATUS : 'SERVER ERRORS',
  SERVER_ERROR_CONTENT : 'Something went wrong ',
  SERVER_ERROR_CODE : 500,

  SERVER_SUCCESS_STATUS : 'SUCCESS',
  SERVER_SUCCESS_CONTENT : 'Your request has been successfully submitted ',
  SERVER_SUCCESS_CODE : 200,


}


export const CLIENT_RESPONSE_CONSTANTS = {
  CLIENT_ERROR_STATUS : 'CLIENT ERRORS',
  CLIENT_ERROR_CONTENT : 'Something went wrong in your request',
  CLIENT_ERROR_CODE : 400,


  // Utils Log
  CLIENT_UPLOAD_ERROR : 'Please check your upload request',
  CLIENT_REMOVE_PRODUCT : 'Please provide your id need to remove'

}


export const AUTHENTICATION_RESPONSE_CONSTANTS = {
  AUTHENTICATION_FAILED_CODE:404,
  NO_USER_WITH_EMAIL : 'User doesnt exist in our database',
  PASSWORD_NOT_MATCHING :'Wrong password',
  USER_INVALID : 'User Invalid'

}