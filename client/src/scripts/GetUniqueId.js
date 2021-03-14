const uuid = require('uuid');

const GetUniqueId = () => {
    return uuid.v4();
}
 
export default GetUniqueId;