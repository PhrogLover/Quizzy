import "./generalchatelement.css";

const GeneralChatElement = (message) => {
    message = message.message;
    return ( 
        <div className="general-chat-element">
            <h1 className="by">{ message.creator }</h1>
            <p className="text">{ message.text }</p>
        </div>
     );
}
 
export default GeneralChatElement;