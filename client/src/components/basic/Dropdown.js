// import React from 'react';
// import { Link } from 'react-router-dom';
// import './dropdown.css';
// // import { CSSTransistion } from 'react-transition-group';
// function Dropdown() {

//     // const [activeMenu,setActiveMenu] = useState('main');
//     const closeDropdown = () => setOpen(false);

//     function DropdownItem(props){
//         return(
//             <div className = "menu-item">
//                 <div className="dropdown-icon"><i className= {props.icon}/></div>
//                 {props.children}
//             </div>        
//         )}
//   return (
//     <>
//         <div className="dropMenu">
//             {/* <CSSTransistion in={activeMenu === 'main'} unmountOnExit timeout={500} classNames="menu-primary"> */}
//                 <div className="menu">  
//                     <DropdownItem icon ="fas fa-volume-up">
//                         <div className="item-text">
//                             Master Volume
//                         </div>
//                         <div className="dropdown-inputs">
//                             <input type="range" min="1" max="100" className="slider" id="masterVolume"/>
//                         </div>
//                     </DropdownItem>
//                     <DropdownItem icon="fas fa-music">
//                         <div className="item-text">
//                             Music Volume
//                         </div>
//                         <div className="dropdown-inputs">
//                             <input type="range" min="1" max="100" className="slider" id="musicVolume"/>
//                         </div>
//                     </DropdownItem>
//                     <DropdownItem icon ="fas fa-volume-up">
//                         <div className="item-text">
//                             SFX Volume
//                         </div>
//                         <div className="dropdown-inputs">
//                             <input type="range" min="1" max="100" className="slider" id="sfxVolume"/>
//                         </div>
//                     </DropdownItem>
//                     <DropdownItem icon = "fas fa-moon">
//                         <div className="item-text">
//                             Dark Theme
//                         </div>
//                         <div className="dropdown-inputs">
//                             <label className="switch">
//                                 <input type="checkbox"/>
//                                 <span className="toggle round"></span>
//                             </label>
//                         </div>
                        
//                     </DropdownItem>
//                     <DropdownItem icon ="fas fa-bug">
//                     <div className="item-text" onClick = {closeDropdown}>
//                         Report A Bug
//                     </div>
//                     </DropdownItem>
//                     <div className="item-text">
//                         <Link to="/signout">
//                             <DropdownItem icon="fas fa-sign-out-alt"> Sign Out</DropdownItem>
//                         </Link>
//                     </div>
//                 </div>
//             {/* </CSSTransistion> */}
//         </div>
//     </>
//   );
// }

// export default Dropdown;