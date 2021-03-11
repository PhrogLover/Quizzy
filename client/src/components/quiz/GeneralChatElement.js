import "./generalchatelement.css";

const GeneralChatElement = (message) => {
    message = message.message;
    return ( 
        <div className="general-chat-element">
            <h1 className="by">{ message.creator }</h1>
            <h4 className="text-by">{ message.text }</h4>
        </div>
     );
}
 
export default GeneralChatElement;