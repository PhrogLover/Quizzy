import "./generalchatelement.css";

const GeneralChatElement = ({ message }) => {
    return ( 
        <div className="general-chat-element">
            <div className="text-body" >
                <span className="by" style = {{color: message.colour}}>{ message.creator }: </span>
                <span className="text-by">{ message.text }</span>
            </div>
        </div>
     );
}
 
export default GeneralChatElement;