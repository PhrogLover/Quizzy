import { animate } from 'dom-helpers';
import React from 'react';
import { Link } from 'react-router-dom';
import './dropdown.css';
// import { CSSTransistion } from 'react-transition-group';
function Dropdown() {

    // const [activeMenu,setActiveMenu] = useState('main');

    function DropdownItem(props){
        return(
            <div className = "menu-item">
                <div className="dropdown-icon"><i class= {props.icon}/></div>
                {props.children}
            </div>        
        )}
  return (
    <>
        <div className="dropMenu">
            {/* <CSSTransistion in={activeMenu === 'main'} unmountOnExit timeout={500} classNames="menu-primary"> */}
                <div className="menu">  
                    <DropdownItem icon ="fas fa-volume-up">
                        <div className="item-text">
                            Master Volume
                        </div>
                        <input type="range" min="1" max="100" class="slider" id="masterVolume"/>
                    </DropdownItem>
                    <DropdownItem icon="fas fa-music">
                        <div className="item-text">
                            Music Volume
                        </div>
                        <input type="range" min="1" max="100" class="slider" id="musicVolume"/>
                    </DropdownItem>
                    <DropdownItem icon ="fas fa-volume-up">
                        <div className="item-text">
                            SFX Volume
                        </div>
                        <input type="range" min="1" max="100" class="slider" id="sfxVolume"/>
                    </DropdownItem>
                    <DropdownItem icon = "fas fa-moon">
                        <div className="item-text">
                            Dark Theme
                        </div>
                        <label class="switch">
                            <input type="checkbox"/>
                            <span class="toggle round"></span>
                        </label>
                    </DropdownItem>
                    <DropdownItem icon ="fas fa-bug">
                        Report A Bug
                    </DropdownItem>
                    <Link to="/signout">
                        <DropdownItem icon="fas fa-sign-out-alt"> Sign Out</DropdownItem>
                    </Link>
                </div>
            {/* </CSSTransistion> */}
        </div>
    </>
  );
}

export default Dropdown;